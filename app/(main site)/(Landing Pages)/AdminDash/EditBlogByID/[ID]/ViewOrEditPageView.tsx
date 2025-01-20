"use client"

import { AdvancedEditIcon } from '@/app/(main site)/Components/ui/AdvancedEditIcon';
import { use, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { EditMarkdown } from '../../EditMarkdown'
import { BackIcon } from '@/app/(main site)/Components/ui/BackIcon';
import { EyeIcon } from '@/app/(main site)/Components/ui/EyeIcon';
import { SaveIcon } from '@/app/(main site)/Components/ui/SaveIcon';
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { updateMongoDBblogContent } from '@/public/utils/MongoDBfunctions';
import useTextArea from '@/app/(main site)/Components/ui/TextArea';
import Container from '@mui/material/Container';
import handlefetch_ai_data from '@/app/(main site)/(Landing Pages)/ai-article-generator/servercontroller'
import useLoading from '@/app/(main site)/Components/ui/Loading';
import useBasicToggle2 from '@/app/(main site)/Components/ui/BasicToggle2';

import useUserContentSettings from '@/app/(main site)/(Landing Pages)/AdminDash/MongoDbTester/useUserContentSettings';


const options = {
  spellChecker: false,  // Disable the spell checker (red highlights)
  autofocus: false, // Optional: Automatically focus the editor when it loads
  status: false, // Optional: Hide the status bar
  // toolbar: true , // Optional: Hide the toolbar
  // previewRender: (plainText) => {
  //   // Optional: Customize the Markdown preview rendering (if needed)
  //   return plainText;
  // },
  // Disabling syntax highlighting (if needed)
  mode: 'markdown',
  theme: 'base16-dark', // Optional: You can change the theme if you like
};
export function ViewOrEditPageView({ downloadedBlog, setValue, title, description,url, contentType, deployed, categoryType }: { downloadedBlog: string, setValue: string, title: string, description: string, url: string, contentType: string, deployed: boolean, categoryType: string }) {
  const [view, setView] = useState("view")
  const [key, setKey] = useState(Date.now());


  const [getTitle, setTitle, TitleTextBox] = useTextArea({ prompt: "Enter Your Title", rowNumber: 1 })
  const [getDescription, setDescription, DescriptionTextBox] = useTextArea({ prompt: "Enter Your Description", rowNumber: 2, })
  const [getURL, setURL, URLTextBox] = useTextArea({ prompt: "Enter Your URL", rowNumber: 1 })

const [CategorySelectELM, ContentSelectELM, selectedCategory, selectedContent, setCategoryELM, setContentELM] = useUserContentSettings()

  const [getContentType, setContentType, ContentTypeTextBox] = useTextArea({ prompt: "Enter Your Type", rowNumber: 1 })
  const [getCategoryType,setCategoryType , CategoryTypeTextBox] = useTextArea({ prompt: "Enter Your Category", rowNumber: 1 })


  const [toggled, setBasicToggle, BasicToggle] = useBasicToggle2({ leftText: 'Keep It Not Deployed', RightText: 'Deploy It' })
  


  const [setLoading, LoadingWrapper, LoadSuccess, LoadError] = useLoading()
  const [setLoading2, LoadingWrapper2, LoadSuccess2, LoadError2] = useLoading()
  const [setLoading3, LoadingWrapper3, LoadSuccess3, LoadError3] = useLoading()




  const router = useRouter();
  const pathname = usePathname();
  const ID = pathname.match(/\/([^\/]+)$/)[1]
  console.log(ID)
  console.log(title)
  console.log(description)

  const paramsEdit = (useSearchParams()).get('edit')
  const paramsSideBySide = (useSearchParams()).get('sidebyside')

  if (paramsSideBySide == 'true' && view != "sidebyside") {
    setView("sidebyside")
    console.log('hit sidebyside')
  }
  if (paramsEdit == 'true' && view != "edit") {
    setView("edit")
    console.log('hit edit')
  }
  if ((!paramsEdit || paramsEdit == 'false') && (view != "view" && view != "sidebyside")) {
    setView("view")
    console.log('hit view')
  }
  if ((!paramsSideBySide || paramsSideBySide == 'false') && (view != "view" && view != "edit")) {
    setView("view")
    console.log('hit view')
  }


  console.log('running')
  if (typeof window === "undefined") {
    return null; // or some fallback content
  }

  function changeView(view: 'view' | 'edit' | 'sidebyside') {
    console.log('this function was hit')
    console.log(pathname)
    if (view == 'edit') {
      router.push(`${pathname}?edit=true`, { scroll: false });
      setView("edit")
      
      
      /// prevent react batching these need to be set after the component mounts
      // setTimeout(() => {
      // setDescription(description)
      // setTitle(title)
      // }, 500)
    

    }
    if (view == 'view') {
      console.log('hit promo')
      router.push(`${pathname}?view=true`, { scroll: false });
      setView("view")
    }
    if (view == 'sidebyside') {
      router.push(`${pathname}?sidebyside=true`, { scroll: false });
      setView("sidebyside")
    }

  }



  const onChange = (value: string) => {
    setKey(Date.now());
    setValue(value);
     console.log(getDescription())


  }

  async function fetchAIData(command: string, callback: (result: string)=>void) {
    let result = await handlefetch_ai_data({
      selectedOption: 'openai o1-mini',
      textInput: command + downloadedBlog,
      multipleGenerationText: '',
      generationCount: 0
    })
    console.log(result)
    setLoading('off')
    setLoading2('off')
    setLoading3('off')
    callback(result)
  }


 useEffect(() => {
  console.log(title)
  console.log(description)
  console.log(categoryType)
  console.log(contentType)
  if (contentType == "No Category"){
    contentType = "uncategorized"
  }
  if(categoryType == "No Category"){
    categoryType = "uncategorized"
  }
  setDescription(description)
  setTitle(title)
  setURL(url)
  setContentELM(contentType)
  setCategoryELM(categoryType)
  setBasicToggle(deployed)
  // setMetaBoxKey((prev) => Date.now() +2)


 }, [view])

 console.log(getDescription())

  HighlightafterEveryRender()

  return (
    <>

      {view == "sidebyside" &&
        <div className="flex flex-row  bg-white justify-center ">
          {typeof downloadedBlog === 'string' && downloadedBlog.length > 0 && (
            <>
              <div className="flex flex-row ">
                <div className="flex flex-col ">
                  <SaveIcon onClick={() => updateMongoDBblogContent(ID, downloadedBlog)} />
                  <BackIcon onClick={() => changeView("view")} />
                </div>
                <EditMarkdown options={options} Content={downloadedBlog} onChange={onChange} />
              </div>
              <div
                key={key}
                className=" prose prose-sm lg:prose-xl prose-a:text-red-600 overflow-auto pr-2"
              >
                <ReactMarkdown>{downloadedBlog}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      }
      {view != "sidebyside" && <div className='bg-white p-9 flex flex-col flex-initial md:flex md:flex-row md:overflow-visible items-start justify-center overflow-y-hidden overflow-x-hidden '>
        {view == "view" && <AdvancedEditIcon onClick={() => changeView('edit')} />}
        {view == "edit" &&
          <div className="flex flex-col ">
            <EyeIcon onClick={() => { changeView("sidebyside") }} />
            <SaveIcon onClick={() => updateMongoDBblogContent(ID, downloadedBlog, getTitle(), getDescription(), getURL(), selectedContent, toggled, selectedCategory)} />
            <BackIcon onClick={() => { changeView("view") }} />
          </div>}

        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          {view == "view" && (downloadedBlog && downloadedBlog.length > 0) &&
            <div key={key}>
              <ReactMarkdown>{downloadedBlog}</ReactMarkdown>
            </div>
          }
          {view == "edit" &&
            <>
              <Container maxWidth="xl"  >
                <div className=' pl-9 prose prose-xl flex flex-row items-center justify-space-between md:flex md:flex-row md:overflow-visible  overflow-y-hidden overflow-x-hidden gap-4 '>
                  <div>
                    <p className='text-2xl font-bold w-32'> Title: </p>
                  </div>
                  <div className='w-full flex-1' >
                    <TitleTextBox />
                  </div>
                  <div>
                    <LoadingWrapper2>
                    <button className='btn text-white bg-pink-700'
                      onClick={() => {
                        setLoading2('on')
                        fetchAIData("Make an Seo Friendly Title based on this document", setTitle)}}
                    >Generate With AI</button>
                    </LoadingWrapper2>
                  </div>
                </div>
              </Container>
              <Container maxWidth="xl"  >
                <div className=' pl-9 prose prose-xl flex flex-row items-center justify-space-between md:flex md:flex-row md:overflow-visible  overflow-y-hidden overflow-x-hidden gap-4 '>
                  <div className="self-start">
                    <p className='text-2xl font-bold w-32 self-start'> Description: </p>
                  </div>
                  <div className='w-full flex-1'>
                    <DescriptionTextBox />
                  </div>
                  <div>
                  <LoadingWrapper>
                    <button className='btn text-white bg-pink-700'
                    onClick={() => {
                      setLoading3('on')
                      fetchAIData("Make an Seo Friendly Meta Description based on this document", setDescription)}}>Generate With AI</button>
                    </LoadingWrapper>
                  </div>
                </div>
              </Container>
              <Container maxWidth="xl"  >
                <div className=' pl-9 prose prose-xl flex flex-row items-center justify-space-between md:flex md:flex-row md:overflow-visible  overflow-y-hidden overflow-x-hidden gap-4 '>
                  <div className="self-start">
                    <p className='text-2xl font-bold w-32 self-start'> URL: </p>
                  </div>
                  <div className='w-full flex-1'>
                    <URLTextBox />
                  </div>
                  <div>
                  <LoadingWrapper3>
                    <button className='btn text-white bg-pink-700'
                    onClick={() => {
                      setLoading3('on') 
                      fetchAIData("Make one Seo Friendly URL based on this document and just give the url with best judgement and no explination", setURL)}}>Generate With AI</button>
                    </LoadingWrapper3>
                  </div>
                </div>
              </Container>
              <Container maxWidth="xl"  >
                <div className=' pl-9 prose prose-xl flex flex-row items-center justify-space-between md:flex md:flex-row md:overflow-visible  overflow-y-hidden overflow-x-hidden gap-4 '>
                  <div className="self-start">
                    <p className='text-2xl font-bold w-32 self-start'> Content Type: </p>
                  </div>
                  <div className='w-full'>
                    <ContentSelectELM />
                  </div>
                  <div>
                  </div>
                </div>
              </Container>

              <Container maxWidth="xl"  >
                <div className=' pl-9 prose prose-xl flex flex-row items-center justify-space-between md:flex md:flex-row md:overflow-visible  overflow-y-hidden overflow-x-hidden gap-4 '>
                  <div className="self-start">
                    <p className='text-2xl font-bold w-32 self-start'> Category: </p>
                  </div>
                  <div className='w-full '>
                    <CategorySelectELM /> 
                  </div>
                  <div>
                  </div>
                </div>
              </Container>
              <Container maxWidth="xl"  >
                <div className=' pl-9 prose prose-xl flex flex-row items-center justify-space-between md:flex md:flex-row md:overflow-visible  overflow-y-hidden overflow-x-hidden gap-4 '>
                  <div className="self-start">
                  </div>
                    <BasicToggle />
                  <div>
                  </div>
                </div>
              </Container>
              <EditMarkdown Content={downloadedBlog} onChange={onChange} />
            </>
          }
        </div>
      </div>}
    </>
  )
}
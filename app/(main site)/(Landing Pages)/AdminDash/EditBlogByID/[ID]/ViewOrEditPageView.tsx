"use client"

import { AdvancedEditIcon } from '@/app/(main site)/Components/ui/AdvancedEditIcon';
import { useEffect, useState } from 'react'
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
export function ViewOrEditPageView({ downloadedBlog, setValue }: { downloadedBlog: string, setValue: string }) {
  const [view, setView] = useState("view")
  const [key, setKey] = useState(Date.now());

  const [getTitle, setTitle, TitleTextBox] = useTextArea({ prompt: "Enter Your Title", rowNumber: 1 })
  const [getDescription, setDescription, DescriptionTextBox] = useTextArea({ prompt: "Enter Your Description", rowNumber: 2 })






  const router = useRouter();
  const pathname = usePathname();
  const ID = pathname.match(/\/([^\/]+)$/)[1]
  console.log(ID)

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

  }


  

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
              <EditMarkdown options={options} Content={downloadedBlog} onChange={onChange}  />
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
            <SaveIcon onClick={() => updateMongoDBblogContent(ID, downloadedBlog)} />
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
          <div className= 'px-9  flex-row  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden gap-20'>
          <p className='text-xl text-bold'>Title:</p> 
          <TitleTextBox />
          <button className='btn text-white bg-pink-700'>Generate With AI</button> 
          </div>
          </Container>
          <Container maxWidth="xl"  >
          <div className= 'px-9  flex-row  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden gap-5'>
          <p>Description:</p> 
          <DescriptionTextBox />
          <button className='btn text-white bg-pink-700'>Generate With AI</button> 
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
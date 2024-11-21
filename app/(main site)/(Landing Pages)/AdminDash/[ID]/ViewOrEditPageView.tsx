"use client"

import { AdvancedEditIcon } from '@/app/(main site)/Components/ui/AdvancedEditIcon';
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { EditMarkdown } from './EditMarkdown'
import { BackIcon } from '@/app/(main site)/Components/ui/BackIcon';
import { EyeIcon } from '@/app/(main site)/Components/ui/EyeIcon';
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';



export function ViewOrEditPageView({ downloadedBlog, setValue }: { downloadedBlog: string, setValue: string }) {
const [view, setView] = useState("view")
const [key, setKey] = useState(Date.now());
const router = useRouter();
const pathname = usePathname();

const paramsEdit = (useSearchParams()).get('edit')
const paramsSideBySide = (useSearchParams()).get('sidebyside')

if(paramsSideBySide == 'true' && view != "sidebyside"){
    setView("sidebyside")
    console.log('hit sidebyside')
}
if(paramsEdit == 'true' && view != "edit"){ 
    setView("edit") 
    console.log('hit edit')
} 
if((!paramsEdit || paramsEdit == 'false') && (view != "view" && view !=  "sidebyside")){ 
    setView("view") 
    console.log('hit view')
} 
if((!paramsSideBySide || paramsSideBySide == 'false') && (view != "view" && view !=  "edit")){ 
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
        if (view == 'edit'){
          router.push(`${pathname}?edit=true`,  { scroll: false });
        setView("edit")  
        }
        if (view == 'view'){
            console.log('hit promo')
            router.push(`${pathname}?view=true`,  { scroll: false });
          setView("view")  
          }
          if (view == 'sidebyside'){
            router.push(`${pathname}?sidebyside=true`,  { scroll: false });
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
                <div className=' flex flex-row bg-white justify-center  '>
                    {typeof downloadedBlog === 'string' && downloadedBlog.length > 0 &&
                        <>
                        <BackIcon onClick={() => {changeView("view")}}/>
                            <div  className="w-1/2 " >
                            <EditMarkdown Content={downloadedBlog}  onChange={onChange}/>
                            </div>
                            <div key={key} className="w-1/2 prose prose-sm lg:prose-xl prose-a:text-red-600">
                                <ReactMarkdown>{downloadedBlog}</ReactMarkdown>
                            </div>
                        </>
                    }
                </div>
        }
        {view != "sidebyside" && <div className='bg-white p-9 flex flex-col flex-initial md:flex md:flex-row md:overflow-visible items-start justify-center overflow-y-hidden overflow-x-hidden '>
            {view == "view" && <AdvancedEditIcon onClick={()=> changeView('edit')} />}
            {view == "edit" && 
        <div className="flex flex-col ">
        <EyeIcon onClick={() => {changeView("sidebyside")}}/>
        <BackIcon onClick={() => {changeView("view")}}/>
        </div>}
     
        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          {view == "view" && (downloadedBlog && downloadedBlog.length > 0) &&
            <div key={key}>
              <ReactMarkdown>{downloadedBlog}</ReactMarkdown>
            </div> 
          }
          {view == "edit" && <EditMarkdown Content={downloadedBlog} onChange={onChange}/>}
        </div>
      </div>}
      </>
    )
}
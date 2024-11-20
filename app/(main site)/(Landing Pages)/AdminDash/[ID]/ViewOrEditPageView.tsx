"use client"

import { AdvancedEditIcon } from '@/app/(main site)/Components/ui/AdvancedEditIcon';
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { EditMarkdown } from './EditMarkdown'
import { BackIcon } from '@/app/(main site)/Components/ui/BackIcon';
import { EyeIcon } from '@/app/(main site)/Components/ui/EyeIcon';
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'



export function ViewOrEditPageView({ downloadedBlog, setValue }: { downloadedBlog: string, setValue: string }) {
    const [view, setView] = useState("view")
    const [key, setKey] = useState(Date.now());


    function changeView() {
        setView("edit")
    }
    const onChange = (value: string) => {
        console.log('this function was hit')
        setKey(Date.now());
        setValue(value);
        
    }

    HighlightafterEveryRender()

    return (
<>

        {view=="sidebyside" &&
                <div className=' flex flex-row bg-white justify-center  '>
                    {typeof downloadedBlog === 'string' && downloadedBlog.length > 0 &&
                        <>
                            <div  className="w-1/2 " >
                            <EditMarkdown Content={downloadedBlog} setContent={setView("sidebyside")}  onChange={onChange}/>
                            </div>
                            <div key={key} className="w-1/2 prose prose-sm lg:prose-xl prose-a:text-red-600">
                                <ReactMarkdown>{downloadedBlog}</ReactMarkdown>
                            </div>
                        </>
                    }
                </div>
        }
        {view != "sidebyside" && <div className='bg-white p-9 flex flex-col flex-initial md:flex md:flex-row md:overflow-visible items-start justify-center overflow-y-hidden overflow-x-hidden '>
            {view == "view" && <AdvancedEditIcon onClick={changeView} />}
            {view == "edit" && 
        <div className="flex flex-col ">
        <EyeIcon onClick={() => {setView("sidebyside")}}/>
        <BackIcon onClick={() => {setView("view")}}/>
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
'use client'


///https://www.npmjs.com/package/react-simplemde-editor
// import  ReactMarkdown  from "react-markdown"
import ReactMarkdown from 'react-markdown';
import Container from '@mui/material/Container';
import { mongoDBDownloadAtom } from '../globalAdminDashAtoms'
import { atom, useAtom } from 'jotai'
import projectURLS from '@/projectSettings'
import { useEffect } from 'react'
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import dynamic from 'next/dynamic'



import '@/app/(main site)/Components/styles/prism.css'
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

//import params



export default function ArticleView() {

  const ID = '67239574d4cf31f65e1daa41'
  console.log(ID)


  const [downloadedBlog, setValue] = useAtom(mongoDBDownloadAtom)

  console.log(downloadedBlog)

  async function serverGetBlogs() {

    console.log('about to fetch serverBlogs')
    const res = await fetch(projectURLS().pythonMongoDBServer)
    console.log('we just got a res response')
    const data = await res.json()
    console.log(data)
    setValue(data.find((blog) => blog.id == ID).MarkdownContent)
    console.log(data)
  }

  useEffect(() => {

      serverGetBlogs()
    
  }, [])
  HighlightafterEveryRender()

  const onChange = (value: string) => {
    setValue(value);
  }

  return (
    <Container maxWidth="xl"   >
      <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          {typeof downloadedBlog === 'string' && downloadedBlog.length > 0 &&
          <>
           <ReactMarkdown>{downloadedBlog}</ReactMarkdown>
            <SimpleMDE value={downloadedBlog} onChange={onChange} />
          </>
           }
        </div>
      </div>
    </Container>)
}




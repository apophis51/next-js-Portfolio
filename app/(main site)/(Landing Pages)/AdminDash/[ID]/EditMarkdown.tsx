///https://www.npmjs.com/package/react-simplemde-editor


"use client";
// import  ReactMarkdown  from "react-markdown"
import ReactMarkdown from 'react-markdown';
import Container from '@mui/material/Container';
import { mongoDBDownloadAtom } from '../globalAdminDashAtoms'
import { atom, useAtom } from 'jotai'
import projectURLS from '@/projectSettings'
import { useEffect,useState } from 'react'
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'

import '@/app/(main site)/Components/styles/prism.css'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


//import params



export  function EditMarkdown({Content, setContent}) {

  // const ID = '67239574d4cf31f65e1daa41'
  // console.log(ID)


  const [editContent, setEditContent] = useState(Content)

  // console.log(downloadedBlog)

  // async function serverGetBlogs() {

  //   console.log('about to fetch serverBlogs')
  //   const res = await fetch(projectURLS().pythonMongoDBServer)
  //   console.log('we just got a res response')
  //   const data = await res.json()
  //   console.log(data)
  //   setValue(data.find((blog) => blog.id == ID).MarkdownContent)
  //   console.log(data)
  // }

  // useEffect(() => {

  //     serverGetBlogs()
    
  // }, [])
  HighlightafterEveryRender()

  const onChange = (value: string) => {
    setContent(value);
    setEditContent(value);
  }

  return (
    <Container maxWidth="xl"   >
      <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          {
          <>
            <SimpleMDE value={Content} onChange={onChange} />
          </>
           }
        </div>
      </div>
    </Container>)
}




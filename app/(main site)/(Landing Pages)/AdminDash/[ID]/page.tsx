"use client";
// import  ReactMarkdown  from "react-markdown"
import ReactMarkdown from 'react-markdown';
import Container from '@mui/material/Container';
import { mongoDBDownloadAtom } from '../globalAdminDashAtoms'
import { atom, useAtom } from 'jotai'
import projectURLS from '@/projectSettings'
import { useEffect } from 'react'
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'


import '@/app/(main site)/Components/styles/prism.css'


//import params



export default function ArticleView({
  params,
}: {
  params: Promise<{ ID: string }>
}) {

  const ID = (params).ID
  console.log(ID)


  const [downloadedBlog, setDownloadedBlogs] = useAtom(mongoDBDownloadAtom)

  console.log(downloadedBlog)

  async function serverGetBlogs() {

    console.log('about to fetch serverBlogs')
    const res = await fetch(projectURLS().pythonMongoDBServer)
    console.log('we just got a res response')
    const data = await res.json()
    console.log(data)
    setDownloadedBlogs(data)
    console.log(data)
  }

  useEffect(() => {
    console.log(downloadedBlog)
    if (downloadedBlog.length < 1) {
      serverGetBlogs()
    }
  }, [])
  HighlightafterEveryRender()


  return (
    <Container maxWidth="xl"   >
      <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          {downloadedBlog.length > 0 &&
            <ReactMarkdown>{downloadedBlog.find((blog) => blog.id == ID).MarkdownContent}</ReactMarkdown>
          }
        </div>
      </div>
    </Container>)
}




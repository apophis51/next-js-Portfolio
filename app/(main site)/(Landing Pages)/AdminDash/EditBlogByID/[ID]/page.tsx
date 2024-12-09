"use client";
import ReactMarkdown from 'react-markdown';
import Container from '@mui/material/Container';
import { mongoDBDownloadAtom } from '../../globalAdminDashAtoms'
import { atom, useAtom, useAtomValue } from 'jotai'
import projectURLS from '@/projectSettings'
import { useEffect, useState } from 'react'
import { ViewOrEditPageView } from './ViewOrEditPageView'
import React from 'react';

import '@/app/(main site)/Components/styles/prism.css'


export default function ArticleView({
  params,
}: {
  params: Promise<{ ID: string }>
}) {

  const ID = (React.use(params)).ID
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

    if (!downloadedBlog || downloadedBlog.length < 1) {
      serverGetBlogs()
    }
  }, [])

  const updateMarkdownContent = (newMarkdownContent, id=ID) => {
    setDownloadedBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? { ...blog, MarkdownContent: newMarkdownContent } // Update only MarkdownContent
          : blog // Leave other blogs unchanged
      )
    );
  };


  return (
    <Container maxWidth="xl"   >
      {(downloadedBlog && downloadedBlog.length > 0) &&
        <>
        {console.log(downloadedBlog.find((blog) => blog.id == ID))}
          <ViewOrEditPageView
          title = {downloadedBlog.find((blog) => blog.id == ID).Title}
          description = {downloadedBlog.find((blog) => blog.id == ID).Description || 'No Description Found'} 
          downloadedBlog={downloadedBlog.find((blog) => blog.id == ID).MarkdownContent} setValue={updateMarkdownContent}/>
        </>
      }
    </Container>)
}




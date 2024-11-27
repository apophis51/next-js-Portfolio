'use client'
//t
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import projectURLS from '@/projectSettings'
import ReactMarkdown from 'react-markdown';
import { deleteMongoDBblog } from '@/public/utils/MongoDBfunctions';
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import { atom, useAtom } from 'jotai'
import { articleAccumulatorAtom } from '@/app/(main site)/(Landing Pages)/ai-article-generator/page'
import { CloseButton } from '@/public/utils/CloseButton'
import Link from 'next/link'
import { mongoDBDownloadAtom } from './globalAdminDashAtoms'



interface Blog {
    id: string;
    Title: string;
    BlogType: string;
    MarkdownContent: string;
}


export default function BlogRenderConstructionBlogs() {

    console.log('attempting to render Horizontal Blogs')
    const [downloadedBlogs, setDownloadedBlogs] = useAtom(mongoDBDownloadAtom)

    const [articleAccumulator, setArticleAccumulator] = useAtom(articleAccumulatorAtom)
    const scrollContainerRef = useRef<HTMLDivElement>(null);


    async function serverGetBlogs() {
        console.log('about to fetch serverBlogs')
        const res = await fetch(projectURLS().pythonMongoDBServer)
        console.log('we just got a res response')
        const data = await res.json()
        setDownloadedBlogs(data)
        console.log(data)
    }


    // Function to scroll left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300, // Adjust the scroll distance as needed
                behavior: 'smooth'
            });
        }
    };
    // Function to scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300, // Adjust the scroll distance as needed
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        console.log('triggered')
        serverGetBlogs()
        if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            const middlePosition = (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
            scrollContainer.scrollLeft = middlePosition;
        }
    }, [articleAccumulator])


    return (
        <MainContentTemplate title={"My Construction Blogs"}>

            <div className="">
                {/* Scrollable Container */}
                <div className="flex justify-center items-center gap-5 md:gap-12">
                    <button
                        onClick={scrollLeft}
                        className="z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none h-[60px]"
                    >
                        &#8249; {/* Left arrow symbol */}
                    </button>
                    <div
                        ref={scrollContainerRef}
                        className='flex flex-row justify-between items-center gap-2 min-h-[70vh] min-w-[65vw] bg-green-400 overflow-x-auto px-4 ' >
                        {/* <p className='bg-white text-black  '>We Could Not Render Anything </p> */}
                        {downloadedBlogs && typeof downloadedBlogs != "string" && downloadedBlogs.filter((blog: Blog) => blog.BlogType === "Construction").map((blog: Blog) => (
                            <div key={blog.id} className="  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-5 min-w-[300px] min-h-[50vh] max-w-[50px] max-h-[50px] overflow-y-auto">
                                    <CloseButton callback={async function () {
                                        try {
                                            await deleteMongoDBblog(blog.id);
                                            serverGetBlogs();
                                        } catch (error) {
                                            console.error("Error deleting blog:", error);
                                            // Optionally handle the error in the UI
                                        }
                                    }} >
                                        <Link href={`/AdminDash/EditBlogByID/${blog.id}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Title is: {blog.Title}Type is: {blog.BlogType}</h5>
                                        </Link>
                                        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 prose prose-sm">
                                            <ReactMarkdown>{blog.MarkdownContent}</ReactMarkdown>
                                        </div>
                                    </CloseButton >
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        className="z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none h-[60px]"
                    >
                        &#8250; {/* Right arrow symbol */}
                    </button>
                </div>

            </div>
        </MainContentTemplate>
    )
}
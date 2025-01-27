'use client'

import React from 'react'
import { useEffect, useState, useRef } from 'react'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import projectURLS from '@/projectSettings'
import ReactMarkdown from 'react-markdown';
import { deleteMongoDBblog } from '@/public/utils/MongoDBfunctions';
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import { atom, useAtom } from 'jotai'
import { articleAccumulatorAtom, startConversationAtom } from '@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator'
import { CloseButton } from '@/public/utils/CloseButton'
import Link from 'next/link'
import { mongoDBDownloadAtom } from './globalAdminDashAtoms'
import useAdvancedSelect from '@/app/(main site)/Components/ui/AdvancedSelect'
import { getALLUserBlogs } from '@/app/(main site)/Components/db_services/mongo'



interface Blog {
    id: string;
    Title: string;
    BlogType: string;
    MarkdownContent: string;
    ContentType: string;
    Category: string;
    Deployed: boolean;
}


export default function ContentRenderUniversal2({ contentType, settings, user }: { contentType: string, settings: string[], user: string }) {
    console.log(contentType)
    console.log(settings)
    console.log('attempting to render Horizontal Blogs')
    const [downloadedBlogs, setDownloadedBlogs] = useAtom(mongoDBDownloadAtom)

    const [articleAccumulator, setArticleAccumulator] = useAtom(articleAccumulatorAtom)

    const { selectedOption: CategorySelectOutput, setSelectedOption, BasicSelect: CategorySelect } = useAdvancedSelect({ options: ["ALL CATEGORIES", ...settings], maintext: 'Select A Category', })

    const { selectedOption: DeployedOption, setSelectedOption: setDeployedOption, BasicSelect: DeploySelect } = useAdvancedSelect({ options: ["Deployed and Undeployed", "Deployed Only", "Undeployed"], maintext: 'Select Your View', })



    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [initialAiConversation, setInitialAiConversation] = useAtom(startConversationAtom)
    

    async function serverGetBlogs() {
        console.log('about to fetch serverBlogs')
        const res = await getALLUserBlogs(user)
        //const res = await fetch(projectURLS().pythonMongoDBServer)
        console.log('we just got a res response')
        // const data = await res.json()
        const data = res
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

    console.log('triggered')
    return (
        <MainContentTemplate title={`My ${contentType.replace(/^./, char => char.toUpperCase())} Content`}>
            <div className="mb-5 max-w-xs mx-auto"><CategorySelect /></div>
            <div className="mb-5 max-w-xs mx-auto"><DeploySelect /></div>
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
                        {downloadedBlogs && typeof downloadedBlogs != "string" && downloadedBlogs.filter((blog: Blog) => {


                            console.log(CategorySelectOutput)
                            console.log(contentType)
                            console.log(DeployedOption)
                            console.log(blog.Category)

                            if (CategorySelectOutput != "Select A Category" && CategorySelectOutput != "ALL CATEGORIES") {
                                if (DeployedOption == "Deployed and Undeployed" || DeployedOption == "Select Your View") {
                                    if (CategorySelectOutput == "Uncategorized") {
                                        return (blog.Category == "No Category" && blog.ContentType === contentType)
                                    }
                                    if (contentType = "all") {
                                        return (blog.Category == CategorySelectOutput)
                                    }
                                    return (blog.Category == CategorySelectOutput && blog.ContentType === contentType)
                                }
                                if (DeployedOption == "Deployed Only") {
                                    if (CategorySelectOutput == "Uncategorized") {
                                        return (blog.Category == "No Category" && blog.ContentType === contentType && blog.Deployed == true)
                                    }
                                    if (contentType = "all") {
                                        return (blog.Category == CategorySelectOutput && blog.Deployed == true)
                                    }
                                    return (blog.Category == CategorySelectOutput && blog.ContentType === contentType && blog.Deployed == true)
                                }
                                if (DeployedOption == "Undeployed") {
                                    if (CategorySelectOutput == "Uncategorized") {
                                        return (blog.Category == "No Category" && blog.ContentType === contentType && blog.Deployed == false)
                                    }
                                    if (contentType = "all") {
                                        return (blog.Category == CategorySelectOutput && blog.Deployed == false)
                                    }
                                    return (blog.Category == CategorySelectOutput && blog.ContentType === contentType && blog.Deployed == false)
                                }
                            }
                            else {
                                console.log(blog.ContentType)
                                console.log(contentType)
                                if (DeployedOption == "Deployed and Undeployed" || DeployedOption == "Select Your View") {
                                    if (contentType == "all") {
                                        return true
                                    }
                                    if (contentType == "uncategorized") {
                                        return (blog.ContentType === "No Content Type")
                                    }
                                    return (blog.ContentType === contentType)
                                }
                                if (DeployedOption == "Deployed Only") {
                                    if (contentType == "all") {
                                        return (blog.Deployed == true)  //edited
                                    }
                                    if (contentType == "uncategorized") {
                                        return (blog.ContentType === "No Content Type" && blog.Deployed == true)
                                    }
                                    return (blog.ContentType === contentType && blog.Deployed == true)
                                }
                                if (DeployedOption == "Undeployed") {
                                    if (contentType == "all") {
                                        return (blog.Deployed == false)  //edited
                                    }
                                    if (contentType == "uncategorized") {
                                        return (blog.ContentType === "No Content Type" && blog.Deployed == false)
                                    }
                                    return (blog.ContentType === contentType && blog.Deployed == false)
                                }
                            }
                        }
                        ).map((blog: Blog) => (
                            <div className="flex flex-col gap-2 justify-center items-center ">
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
                                <a href="#" className="w-full "><button className="btn w-full bg-purple-800 text-white" onClick ={() =>setInitialAiConversation([blog.MarkdownContent])}>Converse This Topic With AI</button></a>
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
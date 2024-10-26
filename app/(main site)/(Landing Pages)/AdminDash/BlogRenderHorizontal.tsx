'use client'
//t
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import projectURLS from '@/projectSettings'



export default function BlogRenderHorizontal() {

    console.log('attempting to render Horizontal Blogs')
    const [downloadedBlogs, setDownloadedBlogs] = useState([])
    const scrollContainerRef = useRef(null);


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
    }, [])


    return (
        <MainContentTemplate title={"My AI Blogs"}>
            <div className="relative ">
            {/* Left Arrow */}
            <button 
                onClick={scrollLeft} 
                className="absolute right-[55vw] z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
                &#8249; {/* Left arrow symbol */}
            </button>

            {/* Scrollable Container */}
            <div className="flex justify-center">
                <div
                    ref={scrollContainerRef}
                    className='flex flex-row justify-between items-center gap-2 min-h-[70vh] min-w-[70vw] bg-green-400 overflow-x-auto px-4 ' >
                    {/* <p className='bg-white text-black  '>We Could Not Render Anything </p> */}
                    {downloadedBlogs && downloadedBlogs.map((blog) => (
                        <div className=" flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-5 min-w-[20vw] min-h-[50vh]">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.Title}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.MarkdownContent}</p>
                            </div>
                        </div>
                    ))}
                </div>
              

            </div>
             {/* Right Arrow */}
             <button 
                onClick={scrollRight} 
                className="absolute left-[55vw] z-10 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
                &#8250; {/* Right arrow symbol */}
            </button>
        </div>
        </MainContentTemplate>
    )
}
"use client"
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import useAdvancedTextInput from "@/app/(main site)/Components/ui/AdvancedTextInput";
import useLoading from "@/app/(main site)/Components/ui/Loading2";
import { useState, useEffect } from "react";

import {findByBlogName} from "@/app/(main site)/Components/db_services/mongo"

export default function MongoDbTester() {
    const [setLoading, LoadingWrapper, LoadSuccess, LoadError] = useLoading()


    const [BlogTitleOutput, BlogTitleInput] = useAdvancedTextInput({ prompt: "Type In a Blog Title" })


    const [blogData, setBlogData] = useState('')

    async function getMongoBlogByTitle(title: string) {
        const metaData = await findByBlogName(title)
        const stringData = JSON.stringify(metaData)
        setBlogData(stringData)
        console.log(metaData)
    }


    return (
        <MainContentTemplate title="MongoDb Tester">
            <div className="flex flex-col justify-center items-center gap-5 w-full">

                <h2>Get Blog By Title</h2>
                <p>{blogData}</p>
                <BlogTitleInput />
                <LoadingWrapper callback={() => getMongoBlogByTitle(BlogTitleOutput.current)}>
                    <button className="btn text-white bg-blue-600">Search For Blog</button>
                </LoadingWrapper>
            </div>
        </MainContentTemplate>
    )

}
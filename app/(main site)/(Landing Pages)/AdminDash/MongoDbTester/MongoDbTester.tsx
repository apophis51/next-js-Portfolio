"use client"
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import useAdvancedTextInput from "@/app/(main site)/Components/ui/AdvancedTextInput";
import useLoading from "@/app/(main site)/Components/ui/Loading2";
import { useState} from "react";
import { findByBlogUrl, addNewContentType, getMainSettings, addNewCategory, } from "@/app/(main site)/Components/db_services/mongo"
import useUserContentSettings from '@/app/(main site)/(Landing Pages)/AdminDash/MongoDbTester/useUserContentSettings';


export default function MongoDbTester() {
    const [setLoading, LoadingWrapper, LoadSuccess, LoadError] = useLoading()
    const [setLoading2, LoadingWrapper2, LoadSuccess2, LoadError2] = useLoading()
    const [CategorySelectELM, ContentSelectELM, selectedCategory, selectedContent] = useUserContentSettings()
    const [BlogTitleOutput, BlogTitleInput] = useAdvancedTextInput({ prompt: "Type In a Blog Title" })
    const [contentTypeOutput, ContentTypeInput] = useAdvancedTextInput({ prompt: "Add a Content Type" })
    const [categoryOutput, CategoryInput] = useAdvancedTextInput({ prompt: "Add a Category" })
    const [blogData, setBlogData] = useState('')

    async function getMongoBlogByTitle(title: string) {
        const metaData = await findByBlogUrl(title)
        const stringData = JSON.stringify(metaData)
        setBlogData(stringData)
        console.log(metaData)
    }
    

    return (
        <MainContentTemplate title="MongoDb Tester">
            <div >
                <div className="odd:bg-slate-400">
                    <div className="flex flex-col justify-center items-center gap-5 w-full">
                        <h2>Current Category Types</h2>
                        <CategorySelectELM />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5 w-full">
                        <h2>Add A Category</h2>
                        <i>example: Programming || AI
                        </i>
                        <CategoryInput />
                        <LoadingWrapper2 callback={() => addNewCategory(categoryOutput.current)}>
                            <button className="btn text-white bg-blue-600">Add New Type</button>
                        </LoadingWrapper2>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <h2>Current Content Types</h2>
                    <ContentSelectELM />
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full bg-slate-400 ">
                    <h2>Add A Content Type</h2>
                    <i>example: Blog || Meta || Dropdown
                    </i>
                    <ContentTypeInput />
                    <LoadingWrapper2 callback={() => addNewContentType(contentTypeOutput.current)}>
                        <button className="btn text-white bg-blue-600">Add New Type</button>
                    </LoadingWrapper2>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <h2>Get Blog By DocURL</h2>
                    <i>example: essential-tools-techniques-for-vetting-subcontractors</i>
                    <p>{blogData}</p>
                    <BlogTitleInput />
                    <LoadingWrapper callback={() => getMongoBlogByTitle(BlogTitleOutput.current)}>
                        <button className="btn text-white bg-blue-600">Search For Blog</button>
                    </LoadingWrapper>
                </div>
            </div>
        </MainContentTemplate>
    )

}
'use client'

export const dynamic = 'force-dynamic'

import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"
import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/page"
import BlogRenderHorizontal from "./BlogRenderHorizontal"
import BlogRenderConstructionBlogs from "./BlogRenderConstrucitonBlogs";
import CreateANewBlog from "./CreateANewBlog/page";


export default function AdminDash() {

  
    return (
        <div className="flex flex-col gap-4">
            <div>
                <AIArticleGenerator />
            </div>
            <div>
                <Obsidian />
            </div>
            <div>
                <BlogRenderHorizontal />
            </div>
            <div>
                <BlogRenderConstructionBlogs /> 
            </div>
            <div>
                <CreateANewBlog /> 
            </div>
            <div>
                <Emails />
            </div>


        </div>
    );
}
'use client'

export const dynamic = 'force-dynamic'

import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"
import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/page"
import BlogRenderHorizontal from "./BlogRenderHorizontal"
import BlogRenderConstructionBlogs from "./BlogRenderConstrucitonBlogs";
import CreateANewBlog from "./CreateANewBlog/page";
import TabView from "./TabView";
import Container from '@mui/material/Container';


export default function AdminDash() {

  
    return (
        <Container maxWidth="xl">   
        <div className="flex flex-col gap-4 overflow-x-hidden">
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
            <div className="flex items-start justify-center">
                <TabView />
            </div>
            <div>
                <CreateANewBlog /> 
            </div>
            <div>
                <Emails />
            </div>


        </div>
        </Container>
    );
}
export const dynamic = 'force-dynamic'

import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"
import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import CreateANewBlog from "./CreateANewBlog/page";
import Container from '@mui/material/Container';
import ClerkTester from "@/app/(main site)/(Landing Pages)/AdminDash/ClerkTester/ClerkTester";
import MongoDbTester from "@/app/(main site)/(Landing Pages)/AdminDash/MongoDbTester/MongoDbTester";
import { ai_article_generator } from "../../PurchaseMenu/[products]/products";
import AdminTabView from "@/app/(main site)/(Landing Pages)/AdminDash/AdminTabView/page";
 

export default function AdminDash() {

    // console.log(contentRenders)
    return (
        <Container maxWidth="xl"  >
            <div className="flex flex-col gap-4 overflow-x-hidden relative ">


                <div className="">
                    <AIArticleGenerator titleName="MalcMind - AI Article Generator" />
                </div>
                <div>
                    <Obsidian />
                </div>
                {/* <div>
                    <BlogRenderConstructionBlogs />
                </div> */}
                <div className=" min-h-screen bg-white mb-28">
                    <AdminTabView />
                </div>
                <div className="mt-28 ">
                    <CreateANewBlog />
                </div>
                <div>
                    <ClerkTester />
                </div>
                <div>
                    <Emails />
                </div>
                <div className="">
                    <MongoDbTester />
                </div>

            </div>
        </Container>
    );
}

export const dynamic = 'force-dynamic'

import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"
import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import BlogRenderHorizontal from "./BlogRenderHorizontal"
import BlogRenderConstructionBlogs from "./BlogRenderConstrucitonBlogs";
import CreateANewBlog from "./CreateANewBlog/page";
import TabView from "../../Components/ui/TabView";
import TabView2 from "@/app/(main site)/Components/ui/TabView2";
import Container from '@mui/material/Container';
import ClerkTester from "@/app/(main site)/(Landing Pages)/AdminDash/ClerkTester/ClerkTester";


export default function AdminDash() {


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
                <BlogRenderHorizontal />
                </div>*/}
                <div>
                    <BlogRenderConstructionBlogs />
                </div>
                <div className="">
                    <div className=' w-full min-h-[100vh]  bg-red-400 grow'>
                    {/* <BlogRenderConstructionBlogs /> */}
                        <TabView TabContent={{ "All Blogs": <BlogRenderHorizontal />, Construction: <BlogRenderConstructionBlogs /> }} />
                    </div>
                </div>
                {/* <div> 
                    <TabView2 />
                </div> */}
                <div>
                    <CreateANewBlog />
                </div>
                <div>
                    <ClerkTester />
                </div>
                <div>
                    <Emails />
                </div>


            </div>
        </Container>
    );
}
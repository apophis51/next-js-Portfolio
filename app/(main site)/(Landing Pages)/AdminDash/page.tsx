
export const dynamic = 'force-dynamic'

import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"
import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import BlogRenderHorizontal from "./BlogRenderHorizontal"
import BlogRenderConstructionBlogs from "./BlogRenderConstrucitonBlogs";
import BlogRenderProgrammingnBlogs from "./BlogRenderProgrammingBlogs";
import BlogRenderDeployedBlogs from "./BlogRenderDeployedBlogs";
import BlogRenderUncategorizedBlogs from "./BlogRenderUnCategorizedBlogs";
import ContentRenderUniversal from "@/app/(main site)/(Landing Pages)/AdminDash/ContentRenderUniversal";
import ContentRenderUniversal2 from "@/app/(main site)/(Landing Pages)/AdminDash/ContentRenderUniveseral2";
import CreateANewBlog from "./CreateANewBlog/page";
import TabView from "../../Components/ui/TabView";
import Container from '@mui/material/Container';
import ClerkTester from "@/app/(main site)/(Landing Pages)/AdminDash/ClerkTester/ClerkTester";
import MongoDbTester from "@/app/(main site)/(Landing Pages)/AdminDash/MongoDbTester/MongoDbTester";
import { ai_article_generator } from "../../PurchaseMenu/[products]/products";


const experimentalMongo = {
    contentType: ["blog", "meta", "dropdown", "uncategorized"],
    category: ["ai", "girlx", "Programming", "Construction", "Uncategorized"]
}



const contentRenders = experimentalMongo.contentType.reduce((acc,contentType) => {
    acc[contentType] = <ContentRenderUniversal2 contentType={contentType} settings={[...experimentalMongo.category]} />
    return acc
}, {})


// const experimentalJson = {
//     Construction: <ContentRenderUniversal contentType="blog" category="Construction" />,
//     Meta: <ContentRenderUniversal contentType="meta" category="girlx" />
// }

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
                <div className=" min-h-screen bg-white">
                    <TabView TabContent={{ "All Blogs": <BlogRenderHorizontal />, Programming: <BlogRenderProgrammingnBlogs />, Deployed: <BlogRenderDeployedBlogs />, UnCategorized: <BlogRenderUncategorizedBlogs />, ...contentRenders }} />
                </div>
                <div className="mt-24">
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

export const dynamic = 'force-dynamic'

import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"
import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import ContentRenderUniversal2 from "@/app/(main site)/(Landing Pages)/AdminDash/ContentRenderUniveseral2";
import CreateANewBlog from "./CreateANewBlog/page";
import TabView from "../../Components/ui/TabView";
import Container from '@mui/material/Container';
import ClerkTester from "@/app/(main site)/(Landing Pages)/AdminDash/ClerkTester/ClerkTester";
import MongoDbTester from "@/app/(main site)/(Landing Pages)/AdminDash/MongoDbTester/MongoDbTester";
import { ai_article_generator } from "../../PurchaseMenu/[products]/products";


const experimentalMongo = {
    contentType: ["all","blog", "meta", "dropdown", "uncategorized"],
    category: ["ai", "girlx", "Programming", "Construction", "Uncategorized"]
}


// we used reduce instead of map so the output could be an object instead of an array
const contentRenders = experimentalMongo.contentType.reduce((acc,contentType) => {
    acc[contentType] = <ContentRenderUniversal2 contentType={contentType} settings={[...experimentalMongo.category]} />
    return acc
}, {})

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
                    <TabView TabContent={{ ...contentRenders }} />
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
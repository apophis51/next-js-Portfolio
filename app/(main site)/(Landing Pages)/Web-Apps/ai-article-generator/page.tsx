
export const dynamic = 'force-dynamic'

import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import BlogRenderHorizontal from "@/app/(main site)/(Landing Pages)/AdminDash/BlogRenderHorizontal"
import BlogRenderConstructionBlogs from "@/app/(main site)/(Landing Pages)/AdminDash/BlogRenderConstrucitonBlogs";
import CreateANewBlog from "@/app/(main site)/(Landing Pages)/AdminDash/CreateANewBlog/page";
import TabView from "@/app/(main site)/Components/ui/TabView";
import Container from '@mui/material/Container';


export default function AdminDash() {

  
    return (
        <Container maxWidth="xl"  >   
        <div className="flex flex-col gap-4 overflow-x-hidden">
            <div>
                <AIArticleGenerator />
            </div>
            <div className="">
              {/* <TabView TabContent= {{"All Blogs": <BlogRenderHorizontal />, Construction: <BlogRenderConstructionBlogs />}}/> */}
            </div>
            <div>
                {/* <CreateANewBlog />  */}
            </div>
        </div>
        </Container>
    );
}
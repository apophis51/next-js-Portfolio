
//export const dynamic = 'force-dynamic'

import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/AiArticleGenerator"
import Container from '@mui/material/Container';
import AdminTabView from "@/app/(main site)/(Landing Pages)/AdminDash/AdminTabView/page";
import Collasible from "@/app/(main site)/Components/ui/collapsible";
import { findByBlogUrlAndType } from "@/app/(main site)/Components/db_services/mongo";
import { APIGenerator } from "@/app/(main site)/(Landing Pages)/AdminDash/APIGenerator/APIGenerator";
import { Suspense } from "react";


export default async function AdminDash() {
    let dropdownData = await findByBlogUrlAndType("ai-article-generator", "dropdown")
    console.log(dropdownData)


    return (
        <div>
        <Container maxWidth="xl"  >
            <div className="flex flex-col gap-4 overflow-x-hidden relative">
                <div>
                    <AIArticleGenerator titleName="MalcMind - AI Article Generator"
                        AI_product_name="MalcMind AI"
                        hide_settings_button={true}
                    />
                </div>
                <div className=" min-h-screen bg-white mb-28">
                    <AdminTabView />
                </div>
                <div className="mt-36 ">
                    <APIGenerator />
                </div>
            </div>
        </Container>
         <Container maxWidth="xl">
            <Suspense fallback={<div className="text-black">Loading...</div>}>
         <div className="my-2 min-h-screen">
             <Collasible dropdownData={dropdownData} />
         </div>
         </Suspense>
     </Container>
     </div> 
    );
}
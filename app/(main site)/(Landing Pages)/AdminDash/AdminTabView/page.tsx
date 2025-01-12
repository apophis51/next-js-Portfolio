"use client"

import ContentRenderUniversal2 from "@/app/(main site)/(Landing Pages)/AdminDash/ContentRenderUniveseral2";
import TabView from "@/app/(main site)/Components/ui/TabView";

const experimentalMongo = {
    contentType: ["all", "blog", "meta", "dropdown", "uncategorized"],
    category: ["ai", "girlx", "Programming", "Construction", "Uncategorized"]
}


// we used reduce instead of map so the output could be an object instead of an array
const contentRenders = experimentalMongo.contentType.reduce((acc, contentType) => {
    acc[contentType] = <ContentRenderUniversal2 contentType={contentType} settings={[...experimentalMongo.category]} />
    return acc
}, {})


export default function AdminTabView() {
    return (
        <>
            <TabView TabContent={{ ...contentRenders }} />

        </>
    )
}
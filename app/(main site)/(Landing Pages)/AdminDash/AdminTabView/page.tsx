"use client";

import ContentRenderUniversal2 from "@/app/(main site)/(Landing Pages)/AdminDash/ContentRenderUniveseral2";
import TabView from "@/app/(main site)/Components/ui/TabView";
import useUserContentSettings from "@/app/(main site)/(Landing Pages)/AdminDash/MongoDbTester/useUserContentSettings";
import { getMainSettings } from "@/app/(main site)/Components/db_services/mongo";
import { getUserID } from "@/app/services/userServices";
import { useState, useEffect } from "react";
import { SignInButton } from "@clerk/nextjs";

// const experimentalMongo = {
//     contentType: ["all", "blog", "meta", "dropdown", "uncategorized"],
//     category: ["ai", "girlx", "Programming", "Construction", "Uncategorized"]
// }

// we used reduce instead of map so the output could be an object instead of an array
// const contentRenders = experimentalMongo.contentType.reduce((acc, contentType) => {
//     acc[contentType] = <ContentRenderUniversal2 contentType={contentType} settings={[...experimentalMongo.category]} />
//     return acc
// }, {})

// function getContentRenders(){
//     const contentRenders = experimentalMongo.contentType.reduce((acc, contentType) => {
//         acc[contentType] = <ContentRenderUniversal2 contentType={contentType} settings={[...experimentalMongo.category]} />
//         return acc
//     }, {})
//     return contentRenders
// }

type Settings = {
    contentType: string[];
    category: string[];
};

export default function AdminTabView() {
    const [
        CategorySelectELM,
        ContentSelectELM,
        selectedCategory,
        selectedContent,
    ] = useUserContentSettings();
    const [tabContent, setTabContent] = useState({});
    const [blur, setBlur] = useState("blur");

    async function getSettings() {
        const user = await getUserID();
        if (user) {
            setBlur("");
        } else {
            setBlur("blur");
        }
        const metaData = (await getMainSettings(user)) as Settings;
        console.log(metaData);

        // we used reduce instead of map so the output could be an object instead of an array
        const contentRenders = metaData.contentType.reduce((acc, contentType) => {
            acc[contentType] = (
                <ContentRenderUniversal2
                    contentType={contentType}
                    settings={[...metaData.category]}
                    user={user}
                />
            );
            return acc;
        }, {});
        setTabContent(contentRenders);

        return contentRenders;
    }

    useEffect(() => {
        const settings = getSettings();
    }, []);

    return (
        <div className="relative">
            {blur && (
                <div className=" absolute z-10 inset-0 flex flex-col items-center justify-start  w-full h-screen ">
                    <div className=" p-10 bg-white bg-opacity-90 rounded shadow-lg">
                        <div>
                            <p className="text-center text-4xl">
                                You Must Be Logged In To View This Content

                            </p>
                        </div>
                        <div className='flex items-center justify-center mt-10 '>
                            <SignInButton>
                                <button className="btn bg-red-400 text-white">Sign In</button>
                            </SignInButton>
                        </div>
                    </div>
                </div>
            )}
            <div className={blur}>
                {Object.keys(tabContent).length == 0 && (
                    <div className="flex items-center justify-center  h-screen ">
                        <div>
                            <p>
                                Loading
                                <span className="loading loading-bars loading-lg "></span>
                            </p>
                        </div>
                    </div>
                )}
                {Object.keys(tabContent).length && (
                    <TabView TabContent={{ ...tabContent }} />
                )}
            </div>
        </div>
    );
}

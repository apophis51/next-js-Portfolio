"use client"

import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate'
import BlogRenderConstructionBlogs from './BlogRenderConstrucitonBlogs'
import BlogRenderHorizontal from './BlogRenderHorizontal' 

export default function TabView() {
    return (
        <div role="tablist" className="tabs tabs-lifted w-[80%] bg-white">
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <BlogRenderConstructionBlogs />
            </div>

            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Tab 2"
                defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6  ">
                <BlogRenderHorizontal />
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                Tab content 3
            </div>
        </div>

    )
}
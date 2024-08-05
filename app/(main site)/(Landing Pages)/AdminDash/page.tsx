'use client'
import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"
import AIArticleGenerator from "@/app/(main site)/(Landing Pages)/ai-article-generator/page"


export default function AdminDash() {

    return (
        <div className="flex flex-col gap-4">
            <div>
                <AIArticleGenerator />
            </div>
            <div>
                <Obsidian />
            </div>
            <div>
                <Emails />
            </div>


        </div>
    );
}
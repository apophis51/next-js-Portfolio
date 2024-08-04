'use client'
import Emails from "./Emails";
import Obsidian from "@/app/(main site)/(Tooling Pages)/Obsidian/page"



export default function AdminDash() {

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Obsidian />
            </div>
            <div>
                <Emails />
            </div>


        </div>
    );
}
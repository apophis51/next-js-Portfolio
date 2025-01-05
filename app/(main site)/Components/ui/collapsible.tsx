import ReactMarkdown from "react-markdown";

export default function Collasible({dropdownData}:any) {
    return (
        <>{dropdownData.map((dropdownData: any) =>
            <div className="bg-base-200 collapse collapse-arrow mb-4">
                <input type="checkbox" className="peer" />
                <div
                    className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content text-center">
                    {dropdownData.Title}
                </div>
                <div
                    className="collapse-content text-primary-content peer-checked:bg-white peer-checked:text-black">
                    <div className="prose mx-auto py-24"><ReactMarkdown>{dropdownData.MarkdownContent}</ReactMarkdown></div>
                </div>
            </div>)}

        </>
    )
}
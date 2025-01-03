


export default function Collasible() {
    return (
        <>
            <div className="bg-base-200 collapse collapse-arrow mb-4">
                <input type="checkbox" className="peer" />
                <div
                    className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    Click me to show/hide content
                </div>
                <div
                    className="collapse-content text-primary-content peer-checked:bg-white peer-checked:text-black">
                    <p>hello</p>
                </div>
            </div>

            <div className="bg-base-200 collapse collapse-arrow ">
                <input type="checkbox" className="peer" />
                <div
                    className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    Click me to show/hide content
                </div>
                <div
                    className="collapse-content text-primary-content peer-checked:bg-white peer-checked:text-black">
                    <p>hello</p>
                </div>
            </div>
        </>
    )
}
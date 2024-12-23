import { ReactNode } from "react";

export default function TabView({ TabContent }: { TabContent: { [key: string]: ReactNode } }) {
    return (

        <div role="tablist" className="tabs tabs-lifted  bg-blue-500  max-w-[vw]">

            {Object.entries(TabContent).map(([key, value],index) => {
                //console.log(index)
                return(
                <>
                    <input
                        key= {key}
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label={key}
                        defaultChecked = {index === 0}
                        />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box max-w-[vw]">
                        <div className="absolute inset-x-0">{value}</div>
                    </div>
                </>)})
            }

        </div>

    )
}
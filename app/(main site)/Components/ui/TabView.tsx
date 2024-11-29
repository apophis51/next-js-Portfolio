import { ReactNode } from "react";

export default function TabView({ TabContent }: { TabContent: { [key: string]: ReactNode } }) {
    return (

        <div role="tablist" className="tabs tabs-lifted  bg-white">

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
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6  ">
                        {value}
                    </div>
                </>)})
            }

        </div>

    )
}
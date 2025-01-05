import { ReactNode } from "react";

export default function TabView({ TabContent }: { TabContent: { [key: string]: ReactNode } }) {
    return (
        <div className="">
            <div className=" bg-gradient-to-tr from-purple-400 to-blue-900  text-white text-center  text-bold py-11">
                <p className="text-5xl  ">Content Explorer</p>
            </div>
            <div role="tablist" className="tabs tabs-lifted tabs-lg  bg-purple-400">

                {Object.entries(TabContent).map(([key, value], index) => {
                    //console.log(index)
                    return (
                        <>
                            <input
                                key={key}
                                type="radio"
                                name="my_tabs_2"
                                role="tab"
                                className="tab [--tab-bg:purple] [--tab-border-color:orange] [--tab-color:white]"
                                aria-label={key}
                                defaultChecked={index === 0}
                            />
                            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box ">
                                <div className="absolute inset-x-0 ">{value}</div>
                            </div>
                        </>)
                })
                }

            </div>
        </div>

    )
}
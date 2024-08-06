'use client'
import { useState } from "react";

let dummyAssignees = ["Jack", "Emily", "Jon", "TBD"];
let dummyVettingSubmissions = [

    {
        Client: "Malcolm",
        Page: "Open",
        Urgent: "Yes",
        Completed: "Yes",
        Assignee: "Jack",
    },
    {
        Client: "Reycon",
        Page: "Open",
        Urgent: "Yes",
        Completed: "No",
        Assignee: "Emily",
    },
    {
        Client: "Pilkington",
        Page: "Open",
        Urgent: "No",
        Completed: "Yes",
        Assignee: "Jon",
    },
    {
        Client: "Legacy",
        Page: "Closed",
        Urgent: "Yes",
        Completed: "Yes",
        Assignee: "Jon",
    },
    {
        Client: "Blake",
        Page: "Open",
        Urgent: "No",
        Completed: "No",
        Assignee: "TBD",
    },
    {
        Client: "Bernardo",
        Page: "Open",
        Urgent: "Yes",
        Completed: "No",
        Assignee: "TBD",
    },
    {
        Client: "Mahmod",
        Page: "Open",
        Urgent: "No",
        Completed: "No",
        Assignee: "TBD",
    },
    {
        Client: "David",
        Page: "Open",
        Urgent: "No",
        Completed: "No",
        Assignee: "TBD",
    },
    {
        Client: "Ivy",
        Page: "Open",
        Urgent: "No",
        Completed: "No",
        Assignee: "TBD",
    },
]

console.log('hit')
export default function VettingSubmissionFeed() {
    const [vettingSubmissions, setVettingSubmissions] = useState(dummyVettingSubmissions)
    const [submissionsToggled, setSubmissionsToggled] = useState(false)

    function handleClientSort(Column: string) {
        if (submissionsToggled) {
            setSubmissionsToggled(false)
            dummyVettingSubmissions.sort((a, b) => {
                if (a[Column] < b[Column]) {
                    return -1;
                }
                if (a[Column] > b[Column]) {
                    return 1;
                }
                return 0;
            })
        }
        else {
            setSubmissionsToggled(true)
            dummyVettingSubmissions.sort((a, b) => {
                if (a[Column] < b[Column]) {
                    return 1;
                }
                if (a[Column] > b[Column]) {
                    return -1;
                }
                return 0;
            })

        }

        console.log(dummyVettingSubmissions)
        setVettingSubmissions(dummyVettingSubmissions)
    }

    return (
        <div className="ml-[14%] mr-[14%]">
            <div className="flex flex-col gap-4 justify-between items-center bg-white p-7">
                <h1 className=" text-3xl text-center p-5 font-bold">Vetting Submission Feed</h1>

                <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />

                <div className='flex flex-row gap-5 justify-between items-center w-[700px]'>


                    <div className='flex justify-center items-center gap-1 w-[150px]'>
                        <p className="text-center" >Client</p>
                        <button onClick={() => handleClientSort('Client')} className='bg-orange-200 rounded-lg btn btn-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-4 w-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </button>
                    </div>

                    <div className='flex items-center gap-1 w-[100px]'>
                        <p className=" text-center">Page</p>
                        <button onClick={() => handleClientSort('Page')} className='bg-orange-200 rounded-lg btn btn-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-4 w-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </button>
                    </div>

                    <div className='flex items-center gap-1'>
                        <p className=" text-center">Urgent</p>
                        <button onClick={() => handleClientSort('Urgent')} className='bg-orange-200 rounded-lg btn btn-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-4 w-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </button>
                    </div>

                    <div className='flex items-center gap-1'>
                        <p className=" text-center">Completed</p>
                        <button onClick={() => handleClientSort('Completed')} className='bg-orange-200 rounded-lg btn btn-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-4 w-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </button>
                    </div>


                    <div className='flex items-center gap-1'>
                        <p className=" text-center w-[80px]">Assignee</p>
                        <button onClick={() => handleClientSort('Assignee')} className='bg-orange-200 rounded-lg btn btn-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-4 w-4 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </button>
                    </div>

                </div>
                {vettingSubmissions.map((sub, index) => (

                    <div className='flex flex-row gap-15 justify-between items-center w-[700px]' key={index}>
                        <p className="btn w-[150px] bg-orange-200">{sub.Client}</p>
                        <p className="btn w-[100px] bg-orange-200">{sub.Page}</p>
                        <p className="btn bg-orange-200">{sub.Urgent}</p>
                        {/* <p className="btn bg-orange-200">{sub.Completed}</p> */}
                        <input type="checkbox" defaultChecked
                            className="checkbox checkbox-lg " />
                        <div className='flex items-center bg-orange-200 btn'>
                            <p className=" w-[80px] ">{sub.Assignee}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                            </svg></div>
                    </div>
                ))}
            </div>
        </div >
    )
}
'use client'
//inspired by https://daisyui.com/components/table/   first example

import { prisma } from '@/lib/prisma';
import getDataBaseResults from "./server"
import { useEffect , useState} from 'react';



export default function adminDash() {
    const [emailResults, setEmailResults] = useState(null)


    useEffect(() => {
        (async () => setEmailResults(await getDataBaseResults() ))()
    }, [])

    return (
            <div className=''>
                <div className='bg-white '>
                    <h1>Admin Dashboard</h1>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {emailResults && emailResults.map((email) => (
                                    <tr>
                                        <th>{email.id}</th>
                                        <td>{email.name}</td>
                                        <td>{email.email}</td>
                                        <td>{email.message}</td>
                                    </tr>

                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}
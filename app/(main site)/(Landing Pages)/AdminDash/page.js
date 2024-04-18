//inspired by https://daisyui.com/components/table/   first example

import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import { prisma } from '@/lib/prisma';
import { get } from 'http';


async function getDataBaseResults() {
    const result = await prisma.recievedEmails.findMany()
    console.log(result)
    console.log('triggered')
    return result
}


export default async function adminDash() {
    let emailResults = await getDataBaseResults()
    return (
        <Container maxWidth="xl"  >
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
                                {emailResults.map((email) => (
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
        </Container>
    )
}
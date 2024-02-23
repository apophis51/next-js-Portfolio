// 'use client'

import { getServerSession } from 'next-auth'
import {redirect} from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

// import { useSession } from 'next-auth/react'
export default async function Dashboard() {
//     const { status} = useSession({
//     required: true,
//     onUnauthenticated() {
//         console.log('not loged in')
//     }
// })
//     if (status === 'loading') {
//         return <div className='bg-white'>loading or unathenticated</div>
//     }


const session = await getServerSession(authOptions)

if (!session) {
    redirect('/authentication/auth/signin')
}

//  console.log('cool', session, 'cool')
    return <div className="bg-white">Super Secret Page</div>
}
'use client'
//url code smell

// import { headers } from 'next/headers'
// import { useSearchParams } from 'next/navigation'

import {useEffect, useState} from 'react'
import { useAuth, useUser ,useSession} from "@clerk/nextjs";
import envUtils from './envUtils'

 
let emailAddress = 'placeholder'
let cool = 'cool'
export default function AuthorizeExtention(params){
    // const headersList = headers()
    const [myWebSocket, setMyWebSocket] = useState(null)
    emailAddress = useUser().user?.primaryEmailAddress?.emailAddress
    let connectingUser = params.searchParams.id
    if (emailAddress){
        console.log(emailAddress)
        envUtils().then((adminAuth) =>
        myWebSocket.send(JSON.stringify({ 
            type: 'Admin', 
            data: {adminAuth: adminAuth, emailAddress: emailAddress, id: connectingUser}}))
        )
    }
    console.log(connectingUser)
    // console.log(headersList)
    // headersList.forEach((item) => (console.log(item)))
    // console.log(headersList.get('access-control-request-method'))
    // const referer = headersList.get('referer')

    useEffect(() => {
        // const ws = new WebSocket('ws://localhost:3532');
        const ws = new WebSocket('ws://localhost:3532');
        setMyWebSocket(ws)
        console.log(cool)
        console.log(emailAddress)
        ws.onopen = () => {
            // ws.send(JSON.stringify({ type: 'hello', data: emailAddress }));
        };
        ws.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            console.log(newData)
        };
        return () => {
            ws.close();
        };
    }, []);



    return (
            <div className='bg-white'>
                <h1>Authorize</h1>
                <p>Authorize this app to access your data</p>
                {/* <p>Referer is: {referer}</p> */}
            </div>
    )
}
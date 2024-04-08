'use client'
//possible vulnerability because we import our env variable
//url code smell

// import { headers } from 'next/headers'
// import { useSearchParams } from 'next/navigation'

import {useEffect, useState} from 'react'
import { useAuth, useUser ,useSession} from "@clerk/nextjs";
import * as envUtils from './envUtils'
import Container from '@mui/material/Container';

let emailAddress = 'placeholder' 
export default function AuthorizeExtention(params){
    // const headersList = headers()
    const [myWebSocket, setMyWebSocket] = useState(null)
    // const [emailAddress, setUserEmail] = useState(null)
    emailAddress = useUser().user?.primaryEmailAddress?.emailAddress
    let connectingUser = params.searchParams.id

    function handleAuthorize(){
        if (emailAddress){
            console.log('we are now authorizing:', emailAddress)

            // envUtils.getenv().then((adminAuth) => //possible vulnerability to import our env variable like that
            // myWebSocket.send(JSON.stringify({ 
            //     type: 'Admin', 
            //     data: {adminAuth: adminAuth, emailAddress: emailAddress, id: connectingUser}}))
            // )
            envUtils.sendWebSocketMessage(emailAddress, connectingUser)
    
        }
    }
 
    console.log(connectingUser)
    // console.log(headersList)
    // headersList.forEach((item) => (console.log(item)))
    // console.log(headersList.get('access-control-request-method'))
    // const referer = headersList.get('referer')


    useEffect(() => {
        // const ws = new WebSocket('ws://localhost:3532');
        // setMyWebSocket(ws)
        // console.log(emailAddress)
        // ws.onopen = () => {
        //     // ws.send(JSON.stringify({ type: 'hello', data: emailAddress }));
        // };
        // ws.onmessage = (event) => {
        //     const newData = JSON.parse(event.data);
        //     console.log(newData)
        // };
        // return () => {
        //     ws.close();
        // };
    }, []);



    return (
        <Container maxWidth="xl">
            <div className='bg-white'>
                <h1>Authorize</h1>
                {emailAddress &&
                <div>
                    <button className='btn' onClick={handleAuthorize}>Authorize this app to access your data</button>
                    <p>Logged in as: {emailAddress}</p>
                </div>
                }
                {!emailAddress &&
                    <p>You Must Be LoggedIn to Authorize the Extention</p>}
                {/* <p>Referer is: {referer}</p> */}
            </div>
            </Container>
    )
}
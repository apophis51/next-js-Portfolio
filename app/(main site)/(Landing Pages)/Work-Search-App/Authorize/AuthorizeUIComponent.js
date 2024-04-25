'use client'
import { useEffect, useState } from 'react'
import { useAuth, useUser, useSession } from "@clerk/nextjs";
import * as envUtils from './envUtils'



let emailAddress = 'placeholder'

export default function AuthorizeUIComponent({ originURL, connectingUser }) {
    // const [count, setCount] = useState(0);
    const [loginStatus, setLoginStatus] = useState('unknown');
    const [authorized, setAuthorized] = useState(false)

    emailAddress = useUser().user?.primaryEmailAddress?.emailAddress

    async function handleAuthorize() {
        if (emailAddress) {
            setAuthorized('processing')
            console.log('we are now authorizing:', emailAddress)

            // envUtils.getenv().then((adminAuth) => //possible vulnerability to import our env variable like that
            // myWebSocket.send(JSON.stringify({ 
            //     type: 'Admin', 
            //     data: {adminAuth: adminAuth, emailAddress: emailAddress, id: connectingUser}}))
            // )
            let registerStatus = await envUtils.sendWebSocketMessage(emailAddress, connectingUser)
            console.log(registerStatus)
            if (registerStatus == 'signUp Successful') {
                setAuthorized(true)
            }
            else {
                setAuthorized(registerStatus)

            }
        }
    }

    useEffect(() => {

        setLoginStatus('loggedIn')

        // const interval = setInterval(() => {
        //     loginStatus = document.body.textContent.toLowerCase().includes('logout') || document.body.textContent.toLowerCase().includes('logout');

        //     console.log('loginStatus:', loginStatus)
        //     setCount(prevCount => prevCount + 1);
        //   }, 1000);

        //   // Cleanup function to clear the interval when the component unmounts
        //   return () => clearInterval(interval);

    }, [])
    return (
        <div className='bg-white prose-xl flex flex-col items-center justify-center p-10'>
            <h1>Authorize This App to Use Your Job Data</h1>
            {(authorized==false || authorized=='failed') && emailAddress &&
                <div className='flex flex-col items-center justify-center'>
                    <button className='btn btn-lg btn-warning' onClick={handleAuthorize}>Authorize Now</button>
                    <p>Email: {emailAddress}</p>
                </div>
            }
            {authorized==true && 
            <div className='flex flex-col items-center justify-center'>
            <p>🎉 You Have Successfully Authorized the App</p>
                    <button className="btn btn-sm btn-success"><a href={originURL}>Return to Site</a></button>
                    </div>
            }
              {authorized=='failed' && 
            <div className='flex flex-col items-center justify-center'>
            <p>🚫 Authorization Failed</p>
                    </div>
            }
            {authorized=='processing' && <p>🌀Processing... </p>}
            {loginStatus == 'unknown' && <p>🌀 Loading User Information... </p>}
            {loginStatus != 'unknown' && !emailAddress &&
                <p>You Must Be LoggedIn to Authorize the Extention</p>}
            {/* <p>Referer is: {referer}</p> */}
        </div>
    )
}
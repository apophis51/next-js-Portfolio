//code smell i need to make my websocket test better it never works when you retry

'use client'
import { useEffect, useState } from 'react'
import { useAuth, useUser, useSession } from "@clerk/nextjs";
import * as envUtils from './envUtils'



let emailAddress = 'placeholder'
let clerkID = 'placeholder'
export default function AuthorizeUIComponent({ originURL, connectingUser }) {
    // const [count, setCount] = useState(0);
    const [loginStatus, setLoginStatus] = useState('unknown');
    const [authorized, setAuthorized] = useState(false)

    emailAddress = useUser().user?.primaryEmailAddress?.emailAddress
    clerkID = useUser().user?.id

    async function handleAuthorize() {
        if (emailAddress) {
            setAuthorized('processing')
            console.log('we are getting ready to authorize:', emailAddress)
            console.log('the clerk id is', clerkID)

            // envUtils.getenv().then((adminAuth) => //possible vulnerability to import our env variable like that
            // myWebSocket.send(JSON.stringify({ 
            //     type: 'Admin', 
            //     data: {adminAuth: adminAuth, emailAddress: emailAddress, id: connectingUser}}))
            // )
            
            /*
            function to see if websocket is present
            **/
            async function connectWebSocket(emailAddress, connectingUser, clerkID, timeout = 3000) {  // timeout in milliseconds
                // This function returns a promise that rejects after a timeout
                const timeoutPromise = new Promise((_, reject) => {
                    const id = setTimeout(() => {
                        clearTimeout(id);
                        reject(new Error("Connection timeout"));
                    }, timeout);
                });

                try {
                    // Race the timeout against the sendWebSocketMessage function
                    let connect = await Promise.race([
                        envUtils.sendWebSocketMessage(emailAddress, connectingUser, clerkID),
                        timeoutPromise
                    ]);

                    // If sendWebSocketMessage completes first, the result will be here
                    console.log('Connection successful:', connect);
                    return connect;
                } catch (error) {
                    // If the timeout wins the race or there is another error, it will be caught here
                    console.error('Failed to connect:', error);
                    throw error;  // You can also handle the error as per your app's requirements
                }
            }

            // let registerStatus = await envUtils.sendWebSocketMessage(emailAddress, connectingUser)
            // console.log(registerStatus)
            let registerStatus = 'failed'
            try{
                let tryToRegister = await connectWebSocket(emailAddress, connectingUser, clerkID)
                registerStatus = tryToRegister
            }
            catch(error){
                console.error('Failed to connect:', error);
            }
            
            if (registerStatus == 'signUp Successful') {
                setAuthorized(true)
            }
            else {
                setAuthorized('failed')

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
            {(authorized == false || authorized == 'failed') && emailAddress &&
                <div className='flex flex-col items-center justify-center'>
                    <button className='btn btn-lg btn-warning' onClick={handleAuthorize}>Authorize Now</button>
                    <p>Email: {emailAddress}</p>
                </div>
            }
            {authorized == true &&
                <div className='flex flex-col items-center justify-center'>
                    <p>🎉 You Have Successfully Authorized the App</p>
                    <button className="btn btn-sm btn-success"><a href={originURL}>Return to Site</a></button>
                </div>
            }
            {authorized == 'failed' &&
                <div className='flex flex-col items-center justify-center'>
                    <p>🚫 Authorization Failed</p>
                </div>
            }
            {authorized == 'processing' && <p>🌀Processing... </p>}
            {loginStatus == 'unknown' && <p>🌀 Loading User Information... </p>}
            {loginStatus != 'unknown' && !emailAddress &&
                <p>You Must Be LoggedIn to Authorize the Extention</p>}
            {/* <p>Referer is: {referer}</p> */}
        </div>
    )
}
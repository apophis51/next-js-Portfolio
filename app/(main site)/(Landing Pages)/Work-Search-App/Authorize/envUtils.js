
"use server"
import projectSettings from '@/projectSettings'
import { headers } from 'next/headers'
import projectURLS from '@/projectSettings'


export async function getHeaders() {
    console.log(headers())
    let originURL = headers().get('referer')
    console.log(originURL)
    return originURL
}


function connectToWebSocket(adminCode, emailAddress, connectingUser, clerkID) 
    {
        return new Promise((resolve, reject) => {

    const WebSocket = require('ws');

    const ws = new WebSocket(projectSettings().envUtilsWebSocket);

    ws.on('open', function open() {
        console.log('Connected to WebSocket server');
        ws.send(JSON.stringify({
            type: 'Admin',
            data: { adminAuth: adminCode, emailAddress: emailAddress, id: connectingUser, clerkID: clerkID }
        }))
    });

    ws.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        console.log(newData)
        let appRegistration = newData.cool
        if (appRegistration) {
            console.log('cool')
            let userAllowedJson = (async function () {
                console.log('fetching')
                let urlData = await fetch(projectURLS().WWWuserMap, { cache: 'no-store' })
                console.log(urlData)
                let userAllowedJson = await urlData.json()
                console.log(userAllowedJson)
                console.log(connectingUser)
                let email = userAllowedJson[connectingUser]
                console.log(userAllowedJson['36af6b9051b92f4b3c7cc4155ab76cf01801eff4ba7d64ddf3c90350bff34d1f'])
                console.log(email)
                if (email){
                    resolve("signUp Successful")
                    // success()
                }
                else{
                    resolve('failed')
                    // reject(new Error("Message timeout"))
                }   

                // return userAllowedJson
            })()
        }

    };

})
}

export async function sendWebSocketMessage(emailAddress, connectingUser, clerkID) {
    
    
    let adminCode = process.env.ChromeExtentionWebSocketAdmin
    let registerSignup = connectToWebSocket(adminCode, emailAddress, connectingUser, clerkID)
    console.log(await registerSignup)
    
    return registerSignup

}

// export async function getenv(){
//     console.log('route hit')
//     // await checkUser()
//     return(process.env.ChromeExtentionWebSocketAdmin)
// }

// async function checkUser() { //we need to add a try catch block to this to prevent the internal server errror
//         console.log('route hit')
//         const { auth, currentUser } = await import('@clerk/nextjs')
//         //  const { userId, getToken, orgRole } = auth();
//         console.log('route hit')
//         console.log(auth())
//         console.log(auth().sessionClaims?.primaryEmail)
//         let userEmail = await currentUser()
//         if (userEmail){
//         console.log(userEmail.emailAddresses[0].emailAddress)
//         return userEmail.emailAddresses[0].emailAddress
//         }
//         else{
//             return null
//         }
//     }
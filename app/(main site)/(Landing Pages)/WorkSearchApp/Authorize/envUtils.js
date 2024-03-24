
"use server"
import projectSettings from '@/projectSettings'


function connectToWebSocket(adminCode, emailAddress, connectingUser) {
    const WebSocket = require('ws');

    const ws = new WebSocket(projectSettings().envUtilsWebSocket);

    ws.on('open', function open() {
        console.log('Connected to WebSocket server');
        ws.send(JSON.stringify({ 
            type: 'Admin', 
            data: {adminAuth: adminCode, emailAddress: emailAddress, id: connectingUser}}))
    });   

}

export async function sendWebSocketMessage(emailAddress, connectingUser) {
    let adminCode = process.env.ChromeExtentionWebSocketAdmin
    connectToWebSocket(adminCode, emailAddress, connectingUser)
    console.log(emailAddress, connectingUser)
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
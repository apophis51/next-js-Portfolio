
// // TCP Client
// const net = require('net');

// const client = new net.Socket();

// const PORT = 3001;
// const HOST = 'localhost';
// try {
// // Connect to the server
// client.connect(PORT, HOST, () => {
//   console.log('Connected to server');

//   // Send data to the server
//   client.write('Hello, Mate!');
// });
// }
// catch(err) {
//   console.log(err);
// }

// // Handle data received from the server
// client.on('data', data => {
//   console.log(`Received from server: ${data}`);
// });

// // Handle server disconnection
// client.on('close', () => {
//   console.log('Connection closed');
// });


import SocketUi from './SocketUI'

let returnData = 'fill';


async function socketSession() {
    return new Promise((resolve, reject) => {
      const io = require('socket.io-client');
      const socket = io('https://filereadtest-production.up.railway.app/');
  
      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        socket.emit('message', 'Hello from backend!');
      });
  
      socket.on('message', (data) => {
        console.log('Message from server:', data);
        socket.disconnect();
        resolve(data); // Resolve the promise with the received data
      });
  
      socket.on('error', (error) => {
        console.error('Socket.IO error:', error);
        reject(error); // Reject the promise on error
      });
  
      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
      });
    });
  }



export default async function sockett() {

    async function socketHandler() {
        'use server'
        try {
            const returnData = await socketSession();
            console.log('cool', returnData);
          } catch (error) {
            console.error('An error occurred:', error);
          }
          return returnData
        }
    return(
        <div className="bg-white">
            <SocketUi socketHandler={socketHandler}/>
        </div>
    )
}
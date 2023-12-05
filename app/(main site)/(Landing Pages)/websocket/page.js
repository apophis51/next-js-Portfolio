
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

function socketSession (){
const io = require('socket.io-client');

// Replace 'http://localhost:3000' with the actual URL of your Socket.IO server
// const socket = io('http://localhost:5000');
const socket = io('https://filereadtest-production.up.railway.app/');


// Listen for the 'connect' event, which is emitted when the connection is established
socket.on('connect', () => {
  console.log('Connected to Socket.IO server');

  // Emit a 'message' event to the server
  socket.emit('message', 'Hello from backend!');
});

// Listen for the 'message' event from the server
socket.on('message', (data) => {
  console.log('Message from server:', data);

  socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
  });

  // Close the connection after receiving a message (optional)
  socket.disconnect();
});

// Listen for the 'disconnect' event, which is emitted when the connection is closed
socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});
}

async function socketHandler() {
    'use server'
    console.log('this has been tripped')
    await socketSession();

}

export default async function sockett() {
    return(
        <div className="bg-white">
            <SocketUi socketHandler={socketHandler}/>
        </div>
    )
}
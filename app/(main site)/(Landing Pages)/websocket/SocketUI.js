

'use client'

import { useEffect, useState } from 'react';

const messageTotal = ["test message1", "test message2"]



export default function SocketUI({socketHandler, messageTotal}) {
const [connectsocket, setConnectsocket] = useState('null');
const[update, setUpdate] = useState('cool')


const io = require('socket.io-client');
const socket = io('http://localhost:5000');
// const socket = io('https://filereadtest-production.up.railway.app/');


socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
  socket.emit("terminal", "ls")
  socket.emit('message', 'Hello from backend!');
});
socket.on('terminal', (data) => {
  messageTotal.push(data)
})

socket.on('money', (data) => {
  messageTotal.push(data)
  console.log(messageTotal)
})

socket.on('message', (data) => {
  console.log('Message from server:', data);
  socket.disconnect();
  let results = data
  console.log(data)
  messageTotal.push(results)
  console.log('messageTotal', messageTotal)
});

socket.on('error', (error) => {
  console.error('Socket.IO error:', error);
  reject(error); // Reject the promise on error
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});


async function internalHandler() {
    console.log('this has ben tripped')
    console.log(messageTotal)
    setConnectsocket(messageTotal);
}

function updateHandler() {
    console.log('this has ben tripped')

    setUpdate('jkj')
    setConnectsocket(messageTotal);
    console.log(messageTotal)

}

useEffect(() => {
    console.log('this has ben tripped')
    setConnectsocket(messageTotal);
    console.log(messageTotal)
}
, [update])

return(
    <div className='bg-white'>
        <p>Would You like to Connect to the Socket?</p>
        <div>
        {messageTotal.map((item) => ( <p>{item}</p>))}
        </div>
        <p>{connectsocket}</p>
        <button onClick={internalHandler}>Connect</button>
        <button onClick={updateHandler}>Upate</button>

        {/* <button onClick={() => setConnectsocket(true)}>Connect</button> */}
    </div>
)

}
'use client'
import React, { useEffect, useState,useRef } from 'react';
import TerminalComponent from './TerminalComponent.js';

import Chat from './Chat.js'; 

import { usePathname } from 'next/navigation'


const App = () => {
  let pathname = usePathname()
  console.log(pathname)
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([{ message: '$ Enter Starts The Terminal Session' }]);

  //user chat
  const[chatMessages, setChatMessages] = useState([]);
  const inputRef = useRef(null);


  function chatHandler(data) {
    console.log(data)
    socket.send(JSON.stringify({ type: 'chatMessage', data: data }));
  }
  //end user chat

  function childHandler(data) {
    console.log(data)
    socket.send(JSON.stringify({ type: 'terminalEvent', data: data }));
  }

  useEffect(() => {
    // Create a WebSocket connection

    // const newSocket = new WebSocket('ws://localhost:3001');
     const newSocket = new WebSocket('wss://filereadtest-production.up.railway.app');
    // Set up event listeners for the WebSocket
    newSocket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    // inputRef.current.focus();

    newSocket.addEventListener('message', (event) => {
   

      console.log('WebSocket message received:', event);
      const message = JSON.parse(event.data);

      //chat message logic
      const duplicateMessage = JSON.parse(event.data);
      try{
        // inputRef.current.focus();

    if (message.message.type.includes('chatMessage')) {
         console.log('fuck yeah nigga')
         setChatMessages((prevMessage) => [...prevMessage, message.message.data])
         console.log(inputRef.current)
         

     }}
     catch{

      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message]);
     }
    });
    newSocket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });
    // Save the WebSocket instance in the state
    setSocket(newSocket);
    // Clean up the WebSocket connection on component unmount
    return () => {
      newSocket.close();
    };
  }, []);
  // const sendMessage = () => {
  //   // Send a message to the WebSocket server
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     console.log('Sending regular message');
  //     socket.send(JSON.stringify({ type: 'message', message: newMessage }));
  //     setNewMessage('');
  //   }
  // };
  return (
    <div data-Section='terminal Wraper' className='mt-5 shadow-[0px_0px_10px_3px_rgba(255,255,255,0.2)]'>
      <div data-Section='chat display' className="bg-white border mb-10" >
        {pathname.includes('/FiringRange') && <Chat  webSocketMessage={chatMessages} chatHandler={chatHandler} inputRef={inputRef}/>}
        </div>
      <h1 className='bg-slate-500 text-white h-8 flex items-center border p-1'><b>{">_ Terminal - By MalcMind"}</b></h1>
      <div data-Section='terminal display' className="bg-white border" >
        <TerminalComponent webSocketMessage={messages} childHandler={childHandler} />
      </div>
    </div>
  );
};

export default App;
'use client'
import React, { useEffect, useState } from 'react';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Create a WebSocket connection
    // const newSocket = new WebSocket('ws://localhost:3001');
   const newSocket = new WebSocket('wss://filereadtest-production.up.railway.app');


    // Set up event listeners for the WebSocket
    newSocket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    newSocket.addEventListener('message', (event) => {
      // Handle incoming messages
      console.log('WebSocket message received:', event);
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
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

  const sendMessage = () => {
    // Send a message to the WebSocket server
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log('we are transmitting')
      socket.send(JSON.stringify({ message: newMessage }));
      setNewMessage('');
    }
  }; 

  return (
    <div className = "bg-white">
      <h1>React WebSocket Client</h1>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.message}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;

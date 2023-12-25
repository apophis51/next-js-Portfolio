

'use client'

import {useState, useRef} from 'react';


export default function Chat({webSocketMessage, chatHandler, inputRef}){
    const [userName, setUserName] = useState('Anonymous')
    const[newName, setNewName] = useState('Set Your Name...')
    const [inputMessage, setInputMessage] = useState('');


    function handleSend(){
        
        chatHandler(`${userName}:      ${inputMessage}`)
        setInputMessage('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {// Prevent the default behavior (e.g., submitting a form)
            handleSend(e.target.value)
          setInputMessage('')
        }
      };

    const nameChange = (e) => {
        if (e.key === 'Enter'){
        setUserName(newName) 
        setNewName(`Name updated!`)

    }
 

    }


    return (
        <div className=''>
        <h1 className='bg-yellow-400'><b>Chat</b></h1>
          <div style={{ minHeight: '200px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            {webSocketMessage.map((message, index) => (
                <div className='chat chat-start'>
              <p className='chat-bubble' key={index}>{message}</p>
                </div>
            ))}
          </div>
          <input
            id = 'chat-input'
            type="text"
            value={inputMessage}
            ref = {inputRef}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            

          />
          <button className='btn' onClick={handleSend}>Send</button>
            <input
                className='ml-20'
                type="text"
                value={newName}
                onClick={() => setNewName('')}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown = {nameChange}
                placeholder="Type your name..."
            />
            <button className='btn' onClick={() => setUserName(newName)}>Set Name</button>
          
        </div>
      );
    };

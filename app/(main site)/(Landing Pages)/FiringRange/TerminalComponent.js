'use client'
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
// import '../websocket/test'
import 'xterm/css/xterm.css';


export default function TerminalComponent({webSocketMessage, childHandler}) {
  const terminalRef = useRef(null);


  const handleEnterKeyPress = (userInput) => {
    console.log('User input:', userInput.trim());
    childHandler(userInput);;
  };

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
    });
    console.log('webSocketMessage', webSocketMessage)
    // terminal.write(webSocketMessage);

    webSocketMessage.map((message, index) => (
      terminal.write(message.message)
    ))
    terminal.open(terminalRef.current);
    terminal.focus();

    let userInput = '';

    terminal.onData((data) => {
      // Capture user input
      userInput += data;
      
      // Write the data to the terminal
      terminal.write(data);

      // Check for Enter key (ASCII code 13)
      if (data.charCodeAt(0) === 13) {
        // Handle Enter key
        handleEnterKeyPress(userInput);

        // Clear user input
        userInput = '';

        // Move to a new line in the terminal
        terminal.writeln('');
      }
    });

    return () => {
      terminal.dispose();
    };
  }, [webSocketMessage]);

  return <div ref={terminalRef} />;
}



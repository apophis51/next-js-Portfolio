'use client'
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
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

    // webSocketMessage.map((message, index) => (
    //   terminal.write(message.message)
    // ))
    webSocketMessage.map((message, index, array) => {
      // if (index === array.length - 1) {
        // This is the last element
        terminal.write(message.message);
      // }
      return null; // You need to return something from the map function
    });


    // if (webSocketMessage && webSocketMessage.length > 0) {

    // terminal.write(webSocketMessage[webSocketMessage.length - 1])
    
    terminal.open(terminalRef.current);
    terminal.focus();

    let userInput = '';
    // let cursor = terminal.buffer.active.cursorX;
  
    let positionalChange = []
    terminal.onKey(e => {
      console.log(e.domEvent.keyCode)
      // Check if the pressed key is the Backspace key
      if (e.domEvent.keyCode == 8) {
        console.log('backspace')
          console.log('backspace')
          // Get the current cursor position
          let cursor = terminal.buffer.active.cursorX;

          console.log(cursor)
  console.log(positionalChange)
          // Check if the cursor is not at the beginning of the line
         if (cursor > positionalChange[0]) {
              // Move the cursor back by one position
              terminal.write('\b');
  
              // Clear the character at the current cursor position
              terminal.write(' ');
  

              // Move the cursor back again
              terminal.write('\b');
           }
        }});


    terminal.onData((data) => {
      // Capture user input
      userInput += data;
      //get cursor position
      positionalChange.push(terminal.buffer.active.cursorX);
      console.log(positionalChange)
      // Write the data to the terminal
      terminal.write(data);

      // Check for Enter key (ASCII code 13)
      if (data.charCodeAt(0) === 13) {
        // Handle Enter key
        handleEnterKeyPress(userInput);
       


        // Clear user input
        userInput = '';

        // Move to a new line in the terminal
        // terminal.writeln('');
      }
      
    });

    return () => {
      terminal.dispose();
    };
  }, [webSocketMessage]);

  return <div ref={terminalRef} />;
}



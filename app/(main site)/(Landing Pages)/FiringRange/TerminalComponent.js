'use client'
import React, { useEffect, useRef,useState} from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';


// function idHolder(value){
// let idHolder = null
// console.log(idHolder)
// return function(){
// idHolder = value
// return idHolder
// }
// }

let isActive = [null]

export default function TerminalComponent({webSocketMessage, childHandler}) {


  const terminalIdRef = useRef(`terminal_${Math.random().toString(36).substr(2, 9)}`);
    const terminalRef = useRef(null);
    const isInitialized = useRef(0)
    // const isActive = useRef([])
    const idHolder = useRef(null)

 console.log(terminalIdRef)
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

    console.log(isInitialized)
    // if (terminalRef.current.id == idHolder.current || isInitialized.current < 3) {
console.log(isActive[isActive.length - 1])
    // if (terminalRef.current.id == isActive.current[0] || isInitialized.current < 3) {
      if (terminalRef.current.id == isActive[isActive.length - 1] || isInitialized.current < 3) {

console.log('triggered', terminalRef.current.id)
    webSocketMessage.map((message, index, array) => {
      // if (index === array.length - 1) {
        // This is the last element
        terminal.write(message.message);
      // }
      isInitialized.current++
      return null; // You need to return something from the map function
    });
    }
  
    // if (webSocketMessage && webSocketMessage.length > 0) {

    // terminal.write(webSocketMessage[webSocketMessage.length - 1])

    terminal.open(terminalRef.current);

      if (terminalRef.current.id == idHolder.current) {
console.log('triggered', terminalRef.current.id)
    terminal.focus();
    
    console.log(idHolder.current)
    }
    
    let userInput = '';
    // let cursor = terminal.buffer.active.cursorX;
    console.log(idHolder.current)

    let positionalChange = []
    terminal.onKey(e => {
      if (terminalRef.current.id == isActive[isActive.length - 1] || isInitialized.current < 3) {
   
      console.log(e.domEvent.keyCode)
      const { domEvent } = e;
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
        }
        

        //Check if Ctrl+C is pressed
        if (domEvent.ctrlKey && domEvent.keyCode === 67) {
          console.log('Ctrl+C pressed');
          handleEnterKeyPress('\x03')
        }
        if (domEvent.ctrlKey && domEvent.keyCode === 88) {
          console.log('Ctrl+C pressed');
          handleEnterKeyPress('\x18')
        }
      }
      });

    console.log(terminalRef.current.id)
    console.log(idHolder)

    
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

  const handleMouseOut = () => {
    // idHolder.current = null
  }

  const handleClick = () => {
    // Set terminalRef to the clicked div's ref]
    console.log('clicked',terminalRef.current.id)
    idHolder.current = terminalRef.current.id
    isActive.push(terminalRef.current.id)

    // isActive.current.push(terminalRef.current.id)
    console.log(isActive)
    // terminalRef.current = terminalRef.current;
  };

  return <div ref={terminalRef} id={terminalIdRef.current} onClick={handleClick} onMouseOut={handleMouseOut}/>;
}



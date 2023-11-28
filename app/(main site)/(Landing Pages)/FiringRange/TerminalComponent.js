'use client'
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

export default function TerminalComponent() {
  const terminalRef = useRef(null);

  const handleEnterKeyPress = (userInput) => {
    console.log('User input:', userInput.trim());
    // Add your custom logic here based on the user input
  };

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
    });

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
  }, []);

  return <div ref={terminalRef} />;
}


// import { useRef, useEffect,useState } from 'react';
// import { Terminal } from 'xterm';
// import 'xterm/css/xterm.css';

// export default function TerminalComponent() {
//   const [userInput, setUserInput] = useState('');
//   const terminalRef = useRef(null);

//   const handleEnterKeyPress = () => {
//     console.log('User input:', userInput);
//     console.log('Cool:', [userInput]);

//     // Reset userInput after handling Enter key
//     setUserInput('');
//   };

//   useEffect(() => {
//     const terminal = new Terminal({
//       cursorBlink: true,
//     });

//     terminal.open(terminalRef.current);
//     terminal.focus();

//     terminal.onKey((e) => {
//       setUserInput((prevInput) => prevInput + e.key);

//       if (e.domEvent.keyCode === 13) {
//         // Call your custom function when Enter is pressed
//         handleEnterKeyPress();

//         // Move to a new line in the terminal
//         terminal.writeln('');
//       } else {
//         // Write the key to the terminal for non-Enter keys
//         terminal.write(e.key);
//       }
//     });

//     return () => {
//       terminal.dispose();
//     };
//   }, []); // Empty dependency array to run the effect only once when we added User Input to this line variable will save but not render

//   return <div ref={terminalRef} />;
// }

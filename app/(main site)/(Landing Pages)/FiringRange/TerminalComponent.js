'use client'

import { useRef, useEffect,useState } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'; // Import the xterm.css for styling









export default function TerminalComponent() {

    const [userInput, setUserInput] = useState('');

  const terminalRef = useRef('null');

  const handleEnterKeyPress = () => {
    console.log(userInput);
  };

  console.log(userInput)

//   console.log(userInput)
  
  useEffect(() => {
    // Create a new terminal instance
    const terminal = new Terminal({
        cursorBlink: true
    });

    // Attach the terminal to the DOM element
    terminal.open(terminalRef.current);
    terminal.write('cd .. ')
    terminal.write('cd .. ')
    terminal.writeln('cd .. ')
    terminal.writeln('ls')
    terminal.focus();

      terminal.onKey((e) => {
        // Check if the pressed key is Enter (keyCode 13)
       
            setUserInput((prevInput) => prevInput + e.key);
            // Write the key to the terminal
            terminal.write(e.key);
            if (e.domEvent.keyCode === 13) {
                console.log(userInput)
                // Call your custom function when Enter is pressed
                handleEnterKeyPress(userInput);
              }
        
      });

    // You can perform additional configurations or attach event listeners here

    // Cleanup function to dispose of the terminal when the component unmounts
    return () => {
      terminal.dispose();
    };
  }, []); // Empty dependency array to run the effect only once

  return <div ref={terminalRef} />;
};


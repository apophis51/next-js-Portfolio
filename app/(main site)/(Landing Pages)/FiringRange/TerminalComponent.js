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
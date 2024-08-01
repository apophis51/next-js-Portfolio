'use client'
// import {useState,useEffect,useRef, useLayoutEffect} from 'react';
// import {useState,useEffect,useRef, useLayoutEffect} from 'react';
import Prism from "prismjs";
import { useState,useEffect } from "react";
import './prism.css'
import 'prismjs/components/prism-python';// Import the Python language definition

export default function CodeHighlighting() {
  const [javaScript, setJavaScript] = useState('console.log("This is JavaScript!")')
  const [javaCode, setJavaCode] = useState(`<pre><code class="language-javascript">${javaScript}</code></pre>`)
  const pythonCode = 'print("This is Python!")'

  const handleChange = (event) => {
    setJavaScript(event.target.textContent);
    setJavaCode(`<pre><code class="language-javascript">${javaScript}</code></pre>`)
  };

  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism 
    };
    highlight(); // <--- call the async function
  }, [javaCode]);

  return (
    <div>
      <pre><code 
      className="language-javascript"
      contentEditable={true}
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: javaCode }} />
      </pre>
      <pre><code className="language-python">{pythonCode}</code></pre>
    </div>)
}

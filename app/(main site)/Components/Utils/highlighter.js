'use client'

import Prism from "prismjs";
import { useEffect } from "react";
import 'prismjs/components/prism-jsx';// Import the JSX language definition
import 'prismjs/components/prism-markdown';// Import the Markdown language definition
import 'prismjs/components/prism-python';// Import the Python language definition


export default function Highlighter() {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism 
    };
    highlight(); // <--- call the async function
  }, []); // <--- run when post updates
}

export function HighlightafterEveryRender() {
  useEffect(() => {

    const highlight =  () => {
       Prism.highlightAll(); // <--- prepare Prism
    };
    highlight();
    // return () => {

    //   window.Prism = null
    // };

  });
}
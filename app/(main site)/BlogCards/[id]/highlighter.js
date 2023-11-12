'use client'

import Prism from "prismjs";
import { useEffect } from "react";

export default function Highlighter() {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism 
    };
    highlight(); // <--- call the async function
  }, []); // <--- run when post updates
}
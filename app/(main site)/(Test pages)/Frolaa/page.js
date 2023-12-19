'use client'
import { useState, useRef } from "react";


export default function CodeHighlighting() {

  const [buttonText, setButtonText] = useState('Customize Me')
  const [computedStyles, setComputedStyles] = useState('Look at this style')

  const pythonCode = 'print("This is Python!")'
  const handleChange = (event) => {
    setButtonText(event.target.innerText);
    console.log(event.target.style)
    // setComputedStyles(JSON.stringify(event.target.style))
    setComputedStyles(JSON.stringify(window.getComputedStyle(event.target).background))

    // const tagName = event.target.tagName; // Gets the HTML tag name of the element
    // const id = event.target.id; // Gets the id attribute of the element
    // const value = event.target.value; //

  };
  console.log(buttonText)

  return (
    <div className = "bg-white min-h-full">
        <button
        
        ><p onBlur={handleChange}
                contentEditable="true"
        >{buttonText}</p></button>
      <div className ="bg-black text-white"> 
        <p 
        >this is the output</p>
        <p onClick={handleChange}>{computedStyles}</p>
        
        </div>
    </div>)
}
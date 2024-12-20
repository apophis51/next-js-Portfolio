import { get } from 'http';
import {  useRef } from 'react';



export default function useTextArea({ prompt, rowNumber = 2 }: { prompt: string, rowNumber?: number }): [() => string | undefined, (value: string) => void, React.FC] {


    const textAreaRef = useRef<HTMLInputElement>(null); // Ref to access the textarea DOM element
    
    function getValue(){
        console.log(textAreaRef.current?.value)
        return textAreaRef.current?.value
    }

    function setValue(changeRequest:string){
        console.log(changeRequest)
        console.log(!!textAreaRef)
        console.log(!!textAreaRef.current)
        console.log(!!(textAreaRef && textAreaRef.current))
        // if ( textAreaRef.current) {

        if (textAreaRef && textAreaRef.current) {
            console.log(changeRequest)
             textAreaRef.current.value = changeRequest
             handleInput()
        }
       
    }


    const handleInput = () => {
        const textArea = textAreaRef.current;
        if (textArea) {
          textArea.style.height = "auto"; // Reset height to auto to shrink if needed
          textArea.style.height = `${textArea.scrollHeight}px`; // Adjust height to match content
        }
      };


  

    function TextAreaInput() {
        return (
                <textarea
                   
                    id="auto-resize-textarea"
                    ref={textAreaRef}
                    // value={text}
                    // onChange={handleTextChange}
                    onChange={handleInput}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 resize-none" // Disable manual resizing
                    placeholder={prompt}
                    rows= {rowNumber}
                    style={{ overflow: "hidden" }} // Prevent scrollbars
                />
        );
    }

    return [getValue, setValue, TextAreaInput];
}

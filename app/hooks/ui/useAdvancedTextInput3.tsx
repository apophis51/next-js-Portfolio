'use client'
import { useState, useRef, useEffect } from 'react';

/**
 * Represents a reference string that holds the current value.
 */
type referenceString = {
    /** The current value of the reference string. */
    current: string;
};


/**
 * Text Input Component
 * 
 * Generates a Text Input React Component that allows the user to input text.
 * 
 * @example
 * ```jsx
 * default function Home() {
 * let prompt = "Enter Your AI Prompt.."
 * //propmpt is the placeholder for the text input
 * const [articleName, BasicArticleName] = useAdvancedTextInput3({ prompt: prompt })
 * 
 * function handler(){
 * console.log(articleName()) // this is the information from the text input
 * }
 * 
 * return(
      * <BasicArticleName />)
      * 
 }
 *```
 */
export default function useAdvancedTextInput3({ prompt }: { prompt: string }): [() => string | undefined, React.FC] {
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref to manage input focus

    function getValue(){
        console.log(inputRef.current?.value)
        return inputRef.current?.value
    }

   console.log('render')
   

    function BasicTextInput() {
        console.log('render')
        return (
            <div className="flex items-center justify-center">
                <input
                    ref={inputRef} // Attach the ref to the input element
                   
                    type="text"
                    placeholder={prompt}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
        );
    }

    return [getValue, BasicTextInput];
}

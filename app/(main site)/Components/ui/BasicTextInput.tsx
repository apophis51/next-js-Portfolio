"use client"
import { useState, useEffect, ChangeEvent, FC, useRef } from 'react'



//let textOutput = ['']

type referenceString = {
    current: string
}
export default function useBasicTextInput({prompt}: {prompt: string}): [ referenceString, React.FC ] {
    // const [selectedOption, setSelectedOption] = useState(options[0]);
    const [output, setOutput] = useState('');
    const textOutput = useRef<string>('') //we made it a useRef because defining this outside the function was causing racing conditions


    
    function BasicTextInput() {
        return (
            <div className='flex items-center justify-center'>
                <input onChange={(evt) => {
                    textOutput.current = evt.target.value
                    console.log(textOutput.current)
                    }} type="text" placeholder={prompt} className="input input-bordered w-full max-w-xs" />
            </div>
        );
    }

    return [ textOutput,BasicTextInput ]
}
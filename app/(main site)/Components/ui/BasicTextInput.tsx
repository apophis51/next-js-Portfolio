"use client"
import { useState, useEffect, ChangeEvent, FC } from 'react'



let textOutput = ['']
export default function useBasicTextInput({prompt}: {prompt: string}): [ string[], React.FC ] {
    // const [selectedOption, setSelectedOption] = useState(options[0]);
    const [output, setOutput] = useState('');


    
    function BasicTextInput() {
        return (
            <div className='flex items-center justify-center'>
                <input onChange={(evt) => {
                    textOutput[0] = evt.target.value
                    console.log(textOutput[0])
                    }} type="text" placeholder={prompt} className="input input-bordered w-full max-w-xs" />
            </div>
        );
    }

    return [ textOutput,BasicTextInput ]
}
"use client"
import { useState, useEffect, ChangeEvent, FC } from 'react'




export default function useBasicSelect({options, maintext}:{options: string[] | number[], maintext: string}): [ string | number, React.FC ] {
    // const [selectedOption, setSelectedOption] = useState(options[0]);
    const [selectedOption, setSelectedOption] = useState('options[0]');
    const [displayedText, setDisplayedText] = useState(maintext)


    function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
        setSelectedOption(evt.target.value);
        setDisplayedText(evt.target.value )
        console.log(selectedOption)
    }
    function BasicSelect() {
        return (
            <div className='flex items-center justify-center'>
                <select className="select select-bordered w-full max-w-xs" 
                value={displayedText}
                onChange={(evt: ChangeEvent<HTMLSelectElement>) => handleChange(evt)}>
                    <option disabled >{maintext}</option>
                    {options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
            </div>
        );
    }

    return [ selectedOption,BasicSelect ]
}
"use client"
import { useState, useEffect, ChangeEvent, FC, Dispatch, SetStateAction } from 'react'




export default function useAdvancedSelect({options, maintext, savedOption, saverCallBack}:{options: string[] | number[], maintext: string, savedOption?: string, saverCallBack?: (modelValue: string) => Promise<any>}):{  selectedOption: string | number, setSelectedOption: Dispatch<SetStateAction<string>>, BasicSelect: React.FC}
{
    const [selectedOption, setSelectedOption] = useState(savedOption || maintext);

    console.log({savedOption, maintext})
    async function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
        console.log('triggered')
        setSelectedOption(evt.target.value);
        if (saverCallBack) {
            console.log(evt.target.value)
            await saverCallBack(evt.target.value)
        }
    }
    function BasicSelect() {
        return (
            <div className='flex items-center justify-center'>
                <select className="select select-bordered w-full max-w-xs" 
                value={selectedOption}
                onChange={(evt: ChangeEvent<HTMLSelectElement>) => handleChange(evt)}>
                    <option disabled >{maintext}</option>
                    {options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
            </div>
        );
    }

    return {selectedOption,setSelectedOption,BasicSelect }
}

// The .tsx files are your source files that should not be directly imported by consumers. They are meant for development and compilation into JavaScript. The consumers should not import these files directly unless they are also working in a TypeScript environment and have access to the source code for their own use, which is uncommon for packaged libraries.

'use client'
import  ReactMarkdown  from "react-markdown"
import useBasicSelect from '@/app/(main site)/Components/ui/BasicSelect'
import useBasicTextInput from "@/app/(main site)/Components/ui/BasicTextInput"
import { useState, useEffect } from 'react'
import handlefetch_ai_data from '@/app/(main site)/(Landing Pages)/ai-article-generator/servercontroller'
import {HighlightafterEveryRender} from '@/app/(main site)/Components/Utils/highlighter'



let javacode =  " ```javaScript \n \
(() => {console.log('hello world') \n \
  })() \n```\n"

// export default function ClientPage({handlefetch_ai_data}: any) {
    export default function ClientPage() {

const [selectedOption, BasicSelect] = useBasicSelect({options:['openai', 'gemini', 'lamma3'],maintext:'Select AI Model'}) 
const [textInput, BasicTextInput] = useBasicTextInput({prompt: "Enter Your AI Prompt.."})
const [textInput2, BasicTextInput2] = useBasicTextInput({prompt: "Only Input This for Multiple Generations..."})
const [ai_result, setAi_result] = useState('');

console.log(selectedOption)

async function handleClick() {
   console.log(selectedOption, textInput, textInput2 )
   let result =await handlefetch_ai_data({selectedOption: selectedOption, textInput: textInput.current, multipleGenerationText: textInput2.current, generationCount: 3}) 
   //let result = await fetch_ai_data(selectedOption, textInput[0]).then(result => result.singleGeneration())
    setAi_result(result)
    console.log(result)

  
}

HighlightafterEveryRender();

    return (
        <div className='flex flex-col gap-1 items-center justify-center'>
            <BasicSelect/>
            <BasicTextInput />
            <BasicTextInput2 />

            <button className='btn' onClick={handleClick}>Generate Article</button>
            {/* <button onClick={() => {handleChangeSource}} className='btn'>Change Source</button> */}
            <ReactMarkdown >{ai_result}</ReactMarkdown>
            <ReactMarkdown >{javacode}</ReactMarkdown>
        </div> 
    )
}
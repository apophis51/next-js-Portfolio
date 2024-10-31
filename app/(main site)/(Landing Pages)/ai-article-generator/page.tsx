'use client'
import ReactMarkdown from "react-markdown"
// import useBasicSelect from '@/app/(main site)/Components/ui/BasicSelect'  
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import  {uploadMongoDBblog} from "@/public/utils/MongoDBfunctions"

import {useBasicSelect, useBasicToggle , useBasicTextInput} from 'malcolm_ui_react'

 
// import useBasicTextInput from "@/app/(main site)/Components/ui/BasicTextInput"
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import React,{ useEffect, useState, useRef} from 'react'
import handlefetch_ai_data from '@/app/(main site)/(Landing Pages)/ai-article-generator/servercontroller'
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import '@/app/(main site)/Components/styles/prism.css'



let javacode = " ```javaScript \n \
(() => {console.log('hello world') \n \
  })() \n```\n"

// export default function ClientPage({handlefetch_ai_data}: any) {
export default function AIArticleGenerator() {

    const [selectedOption, BasicSelect] = useBasicSelect({ options: ['openai', 'gemini', 'lamma3'], maintext: 'Select AI Model' })
    const [textInput, BasicTextInput] = useBasicTextInput({ prompt: "Enter Your AI Prompt.." })
    const [SelectedChapters, BasicSelect_Chapter] = useBasicSelect({ options: [1, 2, 3, 4, 5], maintext: 'Select Chapter Amount' })
    const [toggled, BasicToggle] = useBasicToggle({ leftText: 'Multiple Articles', RightText: 'One Article' })
    const [textInput2, BasicSelect_ArticleNumber] = useBasicTextInput({ prompt: "Only Input This for Multiple Generations..." })
    const [ai_result, setAi_result] = useState(['Your Result Will Appear Here']);
    const [toggleErase, BasicToggleErase] = useBasicToggle({ leftText: 'Reset Text', RightText: 'Keep Adding' })
    const [toggleTextContext, BasicToggleContext] = useBasicToggle({ leftText: 'Use Text Context', RightText: 'Dont Use Text Context' })

    //Save Article UI
    const [articleName, BasicArticleName] = useBasicTextInput({ prompt: "Enter Article Name" })
    const [articleType, BasicArticleType] = useBasicTextInput({ prompt: "Enter Article Type" })


    const prevValues = useRef({ toggled, SelectedChapters, selectedOption, textInput, textInput2, ai_result });
useEffect(() => {
    console.log('render triggered by change in dependency')
    if (prevValues.current.SelectedChapters !== SelectedChapters) {
        console.log('render triggered by change in SelectedChapters', prevValues.current.SelectedChapters, "->", SelectedChapters)
    }
    if (prevValues.current.toggled !== toggled) {
        console.log('render triggered by change in toggled', prevValues.current.toggled, "->", toggled)
    }
    if (prevValues.current.selectedOption !== selectedOption) {
        console.log('render triggered by change in selectedOption', prevValues.current.selectedOption, "->", selectedOption)
    }
    if (prevValues.current.textInput !== textInput) {
        console.log('render triggered by change in textInput', prevValues.current.textInput, "->", textInput)
    }
    if (prevValues.current.textInput2 !== textInput2) {
        console.log('render triggered by change in textInput2', prevValues.current.textInput2, "->", textInput2)
    }
    if (prevValues.current.ai_result !== ai_result) {
        console.log('render triggered by change in ai_result', prevValues.current.ai_result, "->", ai_result)
        }
}, [toggled, SelectedChapters, selectedOption, textInput, textInput2, ai_result])


    async function submit_to_mongoDB() {
        console.log('submit_to_mongoDB triggered')
        console.log(articleName.current, articleType.current)
        let markdownContent = ai_result.join('\n')
        uploadMongoDBblog(articleName.current, articleType.current, markdownContent)
    }

    async function handleClick() {
        console.log(selectedOption, textInput, SelectedChapters, textInput2, toggled)
        let result = null
        if(toggleTextContext) {
            result = await handlefetch_ai_data({ selectedOption: selectedOption, textInput: textInput.current, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })
             //let result = await fetch_ai_data(selectedOption, textInput[0]).then(result => result.singleGeneration())
             //save value into ai_result
        }
        if(!toggleTextContext) {
            result = await handlefetch_ai_data({ selectedOption: selectedOption, textInput: (ai_result + textInput.current), multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })
        }
       
        if (toggleErase) {
        setAi_result((prevResults) => {
           if(prevResults[0] === 'Your Result Will Appear Here') {
               return [result]
           }
           return [...prevResults, result]
        })
        } else {
        setAi_result([result])
        }
        console.log(result)


    }
   HighlightafterEveryRender()


    return (
        <MainContentTemplate  title="MalcMind - AI Article Generator">

        <div className='flex flex-col gap-1 items-center justify-center'>
            <BasicSelect />
            <BasicTextInput />
            <BasicToggle />
            <BasicToggleErase />
            <BasicToggleContext />
            {toggled && 
            <div>
            <BasicSelect_Chapter />
            <BasicSelect_ArticleNumber />
            </div>}
            <button className='btn' onClick={handleClick}>Generate Article</button>
            {ai_result.map((ai_result) =>{
                return(
                <>
                <ReactMarkdown >{ai_result}</ReactMarkdown> 
                </>)
            })}
            <BasicArticleName />
            <BasicArticleType />
            <button className='btn bg-green-600 text-white' onClick={submit_to_mongoDB}>Save Article to MongoDb</button>
            <ReactMarkdown >{javacode}</ReactMarkdown>
        </div>
        </MainContentTemplate>

    )
}


// If you suspect unnecessary re-renders, wrap your functional component with React.memo to prevent re-renders when props don’t change:

// js
// Copy code
// const MyComponent = React.memo((props) => {
//   return <div>{props.someValue}</div>;
// });
'use client'
import ReactMarkdown from "react-markdown"
import useBasicSelect from '@/app/(main site)/Components/ui/BasicSelect'
import useBasicTextInput from "@/app/(main site)/Components/ui/BasicTextInput"
import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import { useState} from 'react'
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
    const [ai_result, setAi_result] = useState('');



console.log(toggled)
    async function handleClick() {
        console.log(selectedOption, textInput, SelectedChapters, textInput2, toggled)
        let result = await handlefetch_ai_data({ selectedOption: selectedOption, textInput: textInput.current, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })
        //let result = await fetch_ai_data(selectedOption, textInput[0]).then(result => result.singleGeneration())
        setAi_result(result)
        console.log(result)


    }
   HighlightafterEveryRender()


    return (
        <MainContentTemplate  title="MalcMind - AI Article Generator">

        <div className='flex flex-col gap-1 items-center justify-center'>
            <BasicSelect />
            <BasicTextInput />
            <BasicToggle />
            {toggled && 
            <div>
            <BasicSelect_Chapter />
            <BasicSelect_ArticleNumber />
            </div>}
            <button className='btn' onClick={handleClick}>Generate Article</button>
            <ReactMarkdown >{ai_result}</ReactMarkdown> 
            <ReactMarkdown >{javacode}</ReactMarkdown>
        </div>
        </MainContentTemplate>

    )
}
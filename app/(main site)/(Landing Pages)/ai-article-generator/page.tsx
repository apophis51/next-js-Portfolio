'use client'
import ReactMarkdown from "react-markdown"
// import useBasicSelect from '@/app/(main site)/Components/ui/BasicSelect'  
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import { addMongoDBblog } from "@/public/utils/MongoDBfunctions"

// import { useBasicSelect, useBasicToggle, useBasicTextInput } from 'malcolm_ui_react'
import { useBasicSelect, useBasicToggle, useAdvancedTextInput} from 'malcolm_ui_react'
import  useTextArea  from '@/app/(main site)/Components/ui/TextArea'



// import useAdvancedTextInput from "@/app/(main site)/Components/ui/AdvancedTextInput"
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import React, { useEffect, useState, useRef } from 'react'
import handlefetch_ai_data from '@/app/(main site)/(Landing Pages)/ai-article-generator/servercontroller'
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import '@/app/(main site)/Components/styles/prism.css'
import { atom, useAtom } from 'jotai'
import { Modal } from "@/public/utils/Modal"
import { SubmitToMongoDB } from '@/app/(main site)/(Landing Pages)/ai-article-generator/SubmitToMongoDB'
import { CloseButton } from '@/public/utils/CloseButton'

///Make a jotai atom
export const articleAccumulatorAtom = atom(0)


let javacode = " ```javaScript \n \
(() => {console.log('hello world') \n \
  })() \n```\n"



// export default function ClientPage({handlefetch_ai_data}: any) {
export default function AIArticleGenerator() {

    const [selectedOption, BasicSelect] = useBasicSelect({ options: ['openai o1-mini', 'openai gpt-4o-mini','gemini gemini-1.5-flash', 'llama-3.1-70b-versatile', 'uncensored chat ai'], maintext: 'Select AI Model' })
    const [getAiText, setAiText, AiTextBox] = useTextArea({ prompt: "Enter Your AI Prompt.." })


    const [SelectedChapters, BasicSelect_Chapter] = useBasicSelect({ options: [1, 2, 3, 4, 5], maintext: 'Select Chapter Amount' })
    const [toggled, BasicToggle] = useBasicToggle({ leftText: 'Multiple Articles', RightText: 'One Article' })
    const [textInput2, BasicSelect_ArticleNumber] = useAdvancedTextInput({ prompt: "Only Input This for Multiple Generations..." })
    const [ai_result, setAi_result] = useState(['Your Result Will Appear Here']);
    const [toggleErase, BasicToggleErase] = useBasicToggle({ leftText: 'Reset Text', RightText: 'Keep Adding' })
    const [toggleTextContext, BasicToggleContext] = useBasicToggle({ leftText: 'Use Text Context', RightText: 'Dont Use Text Context' })
    const [articleAccumulator, setArticleAccumulator] = useAtom(articleAccumulatorAtom)
    

    //Save Article UI
    const [prompt, setPrompt] = useState("Enter Article Name" )
    const [typePrompt, setTypePrompt] = useState("Enter Article Type" )
    const [articleName, BasicArticleName] = useAdvancedTextInput({ prompt: prompt})
    const [articleType, BasicArticleType] =   useAdvancedTextInput({ prompt: typePrompt })


    const modalRef = useRef<HTMLDialogElement>(null)


     console.log(articleName.current)
    async function submit_to_mongoDB() {
        console.log(articleName.current)
        if (!articleName.current) {
            console.log(articleName)
            setPrompt( "please enter the a Name" )

        }
        if (!articleType.current) {
            setTypePrompt("please enter a Type" )

        }
   
        if (articleName.current && articleType.current) {
        console.log('submit_to_mongoDB triggered')
        console.log(articleName.current, articleType.current)
        let markdownContent = ai_result.join('\n')
        await addMongoDBblog(articleName.current, articleType.current, markdownContent)
        setArticleAccumulator((prev) => prev + 1)
        modalRef.current?.close()
        }
    }

    async function handleClick() {
        console.log(selectedOption, SelectedChapters, textInput2, toggled)
        let result = null
        if (toggleTextContext) {
            
            result = await handlefetch_ai_data({ selectedOption: selectedOption, textInput: getAiText() as string, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })
            //let result = await fetch_ai_data(selectedOption, textInput[0]).then(result => result.singleGeneration())
            //save value into ai_result
        }
        if (!toggleTextContext) {
            console.log('hit')
            let cool = { selectedOption: selectedOption, textInput: getAiText() as string, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number }
            console.log(cool)
            result = await handlefetch_ai_data({ selectedOption: selectedOption, textInput: (ai_result + getAiText()), multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })

        }

        if (toggleErase) {
            setAi_result((prevResults) => {
                if (prevResults[0] === 'Your Result Will Appear Here') {
                    return [result]
                }
                return [...prevResults, result]
            })
        } else {
            setAi_result([result])
        }
        console.log(result)
        setAiText('') 



    }
    HighlightafterEveryRender()

   

    return (
        <MainContentTemplate title="MalcMind - AI Article Generator">

            <div className='flex flex-col gap-1 items-center justify-center'>
                <BasicSelect />
                <div className="w-full flex items-center justify-center m-4">
                <AiTextBox />
                </div>
                {/* <textarea className="textarea textarea-bordered" placeholder="Type Your Text Here"></textarea> */}
                {/* <BasicTextInput /> */}
                <BasicToggle />
                <BasicToggleErase />
                <BasicToggleContext />
                {toggled &&
                    <div>
                        <BasicSelect_Chapter />
                        <BasicSelect_ArticleNumber />
                    </div>}
                <button className='btn' onClick={handleClick}>Generate Article</button>
                <div className="max-w-full">
                {ai_result.map((ai_result) => {
                    return (
                        <div className="p-10">
                        <CloseButton>
                            <ReactMarkdown >{ai_result}</ReactMarkdown>
                        </CloseButton>
                        </div>)
                })}
                </div>
                <Modal ref = {modalRef}>
                    <BasicArticleName />
                    <BasicArticleType />
                    <SubmitToMongoDB submit_to_mongoDB={submit_to_mongoDB}      />
                </Modal>
                
                {/* <ReactMarkdown >{javacode}</ReactMarkdown> */}
                <AiTextBox />
                <button className='btn' onClick={handleClick}>Generate Article</button>


            </div>
        </MainContentTemplate>

    )
}

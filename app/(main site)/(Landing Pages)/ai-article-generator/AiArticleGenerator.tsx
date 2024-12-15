'use client'
import ReactMarkdown from "react-markdown"
import useBasicSelect from '@/app/(main site)/Components/ui/BasicSelect'
import useAdvancedSelect from '@/app/(main site)/Components/ui/AdvancedSelect'
import useBasicToggle2 from '@/app/(main site)/Components/ui/BasicToggle2'
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import { addMongoDBblog } from "@/public/utils/MongoDBfunctions"

// import { useBasicSelect, useBasicToggle, useBasicTextInput } from 'malcolm_ui_react'
import { useBasicToggle, useAdvancedTextInput } from 'malcolm_ui_react'

import useTextArea from '@/app/(main site)/Components/ui/TextArea'



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
import { getGenericMetaData, createNewMetaData, deleteUserMetaData } from "@/app/(main site)/Components/Utils/authMetaData"

///Make a jotai atom
export const articleAccumulatorAtom = atom(0)


let javacode = " ```javaScript \n \
(() => {console.log('hello world') \n \
  })() \n```\n"

// const savedSettings = {
//     preferedAIModel: 'openai o1-mini'
// }




export default function AIArticleGenerator() {

  
    // const [AISelectOutput, AISelect] = useBasicSelect({ options: ['openai o1-mini', 'openai gpt-4o-mini', 'gemini gemini-1.5-flash', 'llama-3.1-70b-versatile', 'uncensored chat ai'], maintext: 'Select AI Model' })

    const {selectedOption: AISelectOutput,setSelectedOption, BasicSelect: AISelect} = useAdvancedSelect({ options: ['openai o1-mini', 'openai gpt-4o-mini', 'gemini gemini-1.5-flash', 'llama-3.1-70b-versatile', 'uncensored chat ai'], maintext: 'Select AI Model', saverCallBack: (modelValue:string) =>  createNewMetaData('preferedAIModel', modelValue)  })
    const [getAiText, setAiText, AiTextBox] = useTextArea({ prompt: "Enter Your AI Prompt.." })


    const [SelectedChapters, BasicSelect_Chapter] = useBasicSelect({ options: [1, 2, 3, 4, 5], maintext: 'Select Chapter Amount' })
    const [toggled, BasicToggle] = useBasicToggle({ leftText: 'Multiple Articles', RightText: 'One Article' })
    const [textInput2, BasicSelect_ArticleNumber] = useAdvancedTextInput({ prompt: "Only Input This for Multiple Generations..." })
    const [ai_result, setAi_result] = useState(['Your Result Will Appear Here']);
    const [toggleErase, BasicToggleErase] = useBasicToggle({ leftText: 'Reset Text', RightText: 'Keep Adding' })
    const [toggleTextContext, setToggleTextContext,BasicToggleContext] = useBasicToggle2({ leftText: 'Use Text Context', RightText: 'Dont Use Text Context', saverCallBack: (modelValue:boolean ) =>  createNewMetaData('AI_Context_Settings', modelValue) })
    const [articleAccumulator, setArticleAccumulator] = useAtom(articleAccumulatorAtom)


    //Save Article UI
    const [prompt, setPrompt] = useState("Enter Article Name")
    const [typePrompt, setTypePrompt] = useState("Enter Article Type")
    const [articleName, BasicArticleName] = useAdvancedTextInput({ prompt: prompt })
    const [articleType, BasicArticleType] = useAdvancedTextInput({ prompt: typePrompt })


    const modalRef = useRef<HTMLDialogElement>(null)



 
    console.log(articleName.current)
    async function submit_to_mongoDB() {
        console.log(articleName.current)
        if (!articleName.current) {
            console.log(articleName)
            setPrompt("please enter the a Name")

        }
        if (!articleType.current) {
            setTypePrompt("please enter a Type")

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
        console.log(AISelectOutput, SelectedChapters, textInput2, toggled)
        let result = null
        if (toggleTextContext) {

            result = await handlefetch_ai_data({ selectedOption: AISelectOutput, textInput: getAiText() as string, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })

        }
        if (!toggleTextContext) {
            let cool = { selectedOption: AISelectOutput, textInput: getAiText() as string, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number }
            result = await handlefetch_ai_data({ selectedOption: AISelectOutput, textInput: (ai_result + getAiText()), multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })

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

    async function getUserData() {
        let myData = await getGenericMetaData()
        console.log(!!myData.preferedAIModel)
        if(myData.preferedAIModel){
            setSelectedOption(myData.preferedAIModel)
        }
        if(myData.AI_Context_Settings == false){
            console.log(myData.AI_Context_Settings)
            setToggleTextContext(myData.AI_Context_Settings)
        }
    }
    

    //retrieve user settings
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <MainContentTemplate title="MalcMind - AI Article Generator">
            <>
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
            <div className='flex flex-col gap-1 items-center justify-center'>
                <AISelect />
                
                <div className="w-full flex flex-col items-center justify-center m-4">
                    <AiTextBox />
                    <button className='btn mt-4' onClick={handleClick}>Generate Article</button>

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
             
                <Modal ref={modalRef}>
                    <BasicArticleName />
                    <BasicArticleType />
                    <SubmitToMongoDB submit_to_mongoDB={submit_to_mongoDB} />
                </Modal>

                {/* <ReactMarkdown >{javacode}</ReactMarkdown> */}
            </div>
            </>
        </MainContentTemplate>

    )
}

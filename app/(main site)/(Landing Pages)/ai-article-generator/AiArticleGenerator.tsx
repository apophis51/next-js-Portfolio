'use client'
import ReactMarkdown from "react-markdown"
import useBasicSelect from '@/app/(main site)/Components/ui/BasicSelect'
import useAdvancedSelect from '@/app/(main site)/Components/ui/AdvancedSelect'
import useBasicToggle2 from '@/app/(main site)/Components/ui/BasicToggle2'
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import { addMongoDBblog } from "@/public/utils/MongoDBfunctions"
import useLoading from "@/app/(main site)/Components/ui/Loading2";

// import { useBasicSelect, useBasicToggle, useBasicTextInput } from 'malcolm_ui_react'
import { useBasicToggle, useAdvancedTextInput } from 'malcolm_ui_react'

import useTextArea from '@/app/(main site)/Components/ui/TextArea'
import Link from 'next/link'



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
import { getGenericMetaData, createNewMetaData, deleteUserMetaData, getUserID } from "@/app/(main site)/Components/Utils/authMetaData"

import { SettingsIcon } from "@/app/(main site)/Components/ui/SettingsIcon"
import { SaveIcon } from "@/app/(main site)/Components/ui/SaveIcon2"
import { Modal2 } from "../../Components/ui/modal2"

import Image from "next/image"


///Make a jotai atom
export const articleAccumulatorAtom = atom(0)


let javacode = " ```javaScript \n \
(() => {console.log('hello world') \n \
  })() \n```\n"

// const savedSettings = {
//     preferedAIModel: 'openai o1-mini'
// }



export default function AIArticleGenerator({ titleName, AI_product_name, imageSRC, imgTagline, setting_CloseButton = false, hide_settings_and_save_button = false, AI_Select_Setting = true, AI_Bot_Setting, show_user_text=false, purchaseLink="/PurchaseMenu/ai-article-generator" }: { titleName: string, AI_product_name: string, imageSRC: string, imgTagline: string, setting_CloseButton?: boolean, hide_settings_and_save_button?: boolean, AI_Select_Setting?: boolean, AI_Bot_Setting?: string, show_user_text?: boolean, purchaseLink?: string }) {

    const [setLoading, LoadingWrapper, LoadSuccess, LoadError] = useLoading()

    // const [AISelectOutput, AISelect] = useBasicSelect({ options: ['openai o1-mini', 'openai gpt-4o-mini', 'gemini gemini-1.5-flash', 'llama-3.1-70b-versatile', 'uncensored chat ai'], maintext: 'Select AI Model' })
    const [userID, setUserID] = useState('')

    const { selectedOption: AISelectOutput, setSelectedOption, BasicSelect: AISelect } = useAdvancedSelect({ options: ['openai o1-mini', 'openai gpt-4o-mini', 'gemini gemini-1.5-flash', 'llama-3.1-70b-versatile', 'uncensored chat ai'], maintext: 'Select AI Model', saverCallBack: async (modelValue: string) => await createNewMetaData('preferedAIModel', modelValue, userID) })

    const [getAiText, setAiText, AiTextBox] = useTextArea({ prompt: "Enter Your AI Prompt.." })


    const [SelectedChapters, BasicSelect_Chapter] = useBasicSelect({ options: [1, 2, 3, 4, 5], maintext: 'Select Chapter Amount' })
    const [textInput2, BasicSelect_ArticleNumber] = useAdvancedTextInput({ prompt: "Only Input This for Multiple Generations..." })
    const [ai_result, setAi_result] = useState(['Your Result Will Appear Here']);


    const [toggled, setBasicToggle, BasicToggle] = useBasicToggle2({ leftText: 'Multiple Articles', RightText: 'One Article', saverCallBack: (modelValue: boolean) => createNewMetaData('AI_Multiple_Articles', modelValue, userID) })

    const [toggleErase, setToggleErase, BasicToggleErase] = useBasicToggle2({ leftText: 'Reset Text', RightText: 'Keep Adding', saverCallBack: (modelValue: boolean) => createNewMetaData('AI_Reset_Settings', modelValue, userID) })
    const [toggleTextContext, setToggleTextContext, BasicToggleContext] = useBasicToggle2({ leftText: 'Dont Use Text Context', RightText: 'Use Text Context', saverCallBack: (modelValue: boolean) => createNewMetaData('AI_Context_Settings', modelValue, userID) })
    const [articleAccumulator, setArticleAccumulator] = useAtom(articleAccumulatorAtom)


    const [ipRequestRemaining, setIpRequestRemaining] = useState(0);


    //Save Article UI
    const [prompt, setPrompt] = useState("Enter Article Name")
    const [typePrompt, setTypePrompt] = useState("Enter Article Type")
    const [articleName, BasicArticleName] = useAdvancedTextInput({ prompt: prompt })
    const [articleType, BasicArticleType] = useAdvancedTextInput({ prompt: typePrompt })


    const modalRef = useRef<HTMLDialogElement>(null)
    const settingsRef = useRef<HTMLDialogElement>(null)
    const purchaseRef = useRef<HTMLDialogElement>(null)


    async function submit_to_mongoDB() {
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
        let userText = getAiText()
        if (!toggleTextContext) {

            result = await handlefetch_ai_data({ selectedOption: AISelectOutput, textInput: getAiText() as string, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })

        }
        if (toggleTextContext) {
            let cool = { selectedOption: AISelectOutput, textInput: getAiText() as string, multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number }
            result = await handlefetch_ai_data({ selectedOption: AISelectOutput, textInput: (ai_result + getAiText()), multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })

        }

        if (toggleErase) {
            console.log('hit promo')

            setAi_result((prevResults) => {
                if (show_user_text && prevResults[0] === 'Your Result Will Appear Here') {
                    return ([ "User:" + " " + userText, "Assistant:" + " " + result])

                }
                if (prevResults[0] === 'Your Result Will Appear Here') {
                    return [result]
                }
                if (show_user_text) {
                    return ([...prevResults, "User:" + " " + userText, "Assistant:" + " " + result])
                }
                return [...prevResults, result]
            })
        } else {
            setAi_result([result])

        }
        console.log(show_user_text)
        console.log(result)
        if (!userID) fetchData("https://fastapi-mongo-production.up.railway.app/requests/increment")
        if (userID) {
            let metadata = await getGenericMetaData()
            let newCreditCount = metadata['AI Article Generator'].TotalCredits - 1
            let alteredMetadata = { ...metadata['AI Article Generator'], TotalCredits: newCreditCount }
            console.log(alteredMetadata)
            await createNewMetaData('AI Article Generator', alteredMetadata, userID)
            setIpRequestRemaining(newCreditCount)
        }
        setAiText('')



    }
    HighlightafterEveryRender()

    async function getUserData() {
        let myData = await getGenericMetaData()
        console.log(!!myData.preferedAIModel)
        if (myData.preferedAIModel) {
            setSelectedOption(myData.preferedAIModel)
        }
        if (myData.AI_Context_Settings == false) {
            console.log(myData.AI_Context_Settings)
            setToggleTextContext(myData.AI_Context_Settings)
        }
        if (myData.AI_Reset_Settings == false) {
            setToggleErase(myData.AI_Reset_Settings)
        }
        if (myData.AI_Multiple_Articles == false) {
            setBasicToggle(myData.AI_Multiple_Articles)
        }
        if (myData['AI Article Generator'].TotalCredits) {
            console.log(myData.AI_Credits_remaining)
            setIpRequestRemaining(myData['AI Article Generator'].TotalCredits)
        }
        if (!myData['AI Article Generator'].TotalCredits) {
            //createNewMetaData('AI_Credits_Remaining', 12)
            //setIpRequestRemaining(12)
        }
    }

    console.log(ipRequestRemaining)



    const fetchData = async (url: string) => {
        try {
            // Get the IP address from ipify
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();

            // Fetch the request count for the IP address
            const requestResponse = await fetch(`${url}/${ipData.ip}`);
            const requestData = await requestResponse.json();
            console.log(requestData);

            // Set the request count
            setIpRequestRemaining(12 - requestData.request_count);

        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    //retrieve user settings
    useEffect(() => {
        (async () => {
            let user = await getUserID()
            if (user == null) {
                fetchData("https://fastapi-mongo-production.up.railway.app/requests/no-increment");
            }
            console.log(user)
            if (user) {
                getUserData()
                setUserID(user)
            }
            if (AI_Bot_Setting) {
                setSelectedOption(AI_Bot_Setting)
            }

        })();
    }, [])

    return (
        <div>
            <div className='pb-4'>
                <Link href={purchaseLink} ><button className='btn bg-pink-700 text-white w-full'>Buy {AI_product_name} Chat Now! - Christmas Discount</button></Link>
            </div>
            <MainContentTemplate title={titleName}>
                <>
                    <div className='flex flex-col gap-1 items-center justify-center'>
                        {imageSRC && <Image
                            src={imageSRC}
                            width={500}
                            height={300}
                        />}
                        {imgTagline && <p className="italic text-gray-600 mt-2 text-center">
                            {imgTagline}
                        </p>}
                        <div className="max-w-full">
                            {!setting_CloseButton && ai_result.map((ai_result) => {
                                return (
                                    <div className="p-10">
                                        <CloseButton>
                                            <ReactMarkdown >{ai_result}</ReactMarkdown>
                                        </CloseButton>
                                    </div>)
                            })}
                            {setting_CloseButton && ai_result.map((ai_result) => {
                                return (
                                    <div className="p-10">
                                        <ReactMarkdown >{ai_result}</ReactMarkdown>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 items-center justify-center'>
                        {AI_Select_Setting && <AISelect />}

                        <div className="w-full flex flex-col items-center justify-center m-4">
                            <AiTextBox />
                        </div>
                        {/* <textarea className="textarea textarea-bordered" placeholder="Type Your Text Here"></textarea> */}
                        {/* <BasicTextInput /> */}
                        <div className="flex flex-row justify-center items-center h-[50px] w-[70px] gap-8">
                            {!hide_settings_and_save_button && <div className="w-full h-full ">
                                <Modal ref={settingsRef} modalTitle="Settings" buttonText="Settings" CustomButton={SettingsIcon}>
                                    <BasicToggle />
                                    <BasicToggleErase />
                                    <BasicToggleContext />
                                    {toggled &&
                                        <div>
                                            <BasicSelect_Chapter />
                                            <BasicSelect_ArticleNumber />
                                        </div>}
                                </Modal>
                            </div>}

                            <div className="flex  justify-center items-center ">
                                <div className="flex-none">
                                    <LoadingWrapper callback={handleClick}>
                                        <button className='btn '>Generate Article</button>
                                    </LoadingWrapper>
                                </div>
                            </div>

                            {!hide_settings_and_save_button && <div className="w-full h-full ">
                                <Modal ref={modalRef} modalTitle="Please Enter An ArticleName And Title To Save" buttonText="Save Article" CustomButton={SaveIcon}>
                                    <BasicArticleName />
                                    <BasicArticleType />
                                    <SubmitToMongoDB submit_to_mongoDB={submit_to_mongoDB} />
                                </Modal>
                            </div>}


                        </div>
                        <div className=" mt-12"><p className="italic  text-red-600">You have <span className="text-yellow-700">{ipRequestRemaining}</span> Chats Remaining</p></div>


                        {/* <ReactMarkdown >{javacode}</ReactMarkdown> */}
                        {ipRequestRemaining <= 0 &&
                            <>
                                <Modal2 ref={purchaseRef} modalTitle="You Have Reached AI Credit Limit">
                                    {/* {userID == '' &&
                                        <>
                                            <p className='text-center'>Loading Personalized Link</p><p className="text-center"><span className="loading loading-ring loading-lg"></span>
                                            </p>
                                        </>
                                    } */}
                                    {/* {userID != '' && <Link href={`/PurchaseMenu/ai-article-generator`} ><button className='btn bg-pink-700 text-white w-full'>Buy More AI Credits Now!</button></Link>} */}
                                    {<Link href={purchaseLink} ><button className='btn bg-pink-700 text-white w-full'>Buy More AI Credits Now!</button></Link>}
                                </Modal2>
                            </>}
                    </div>
                </>
            </MainContentTemplate>
        </div>
    )
}

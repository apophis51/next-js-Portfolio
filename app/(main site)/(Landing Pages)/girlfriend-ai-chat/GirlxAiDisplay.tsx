'use client'
import ReactMarkdown from "react-markdown"
// import useBasicSelect from '@/app/(main site)/Components/ui/BasicSelect'  
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import { addMongoDBblog } from "@/public/utils/MongoDBfunctions"

// import { useBasicSelect, useBasicToggle, useBasicTextInput } from 'malcolm_ui_react'
import { useBasicSelect, useBasicToggle, useAdvancedTextInput } from 'malcolm_ui_react'
import useTextArea from '@/app/(main site)/(Landing Pages)/ai-article-generator/TextArea'
import useLoading from '@/app/(main site)/Components/ui/Loading';



// import useAdvancedTextInput from "@/app/(main site)/Components/ui/AdvancedTextInput"
// import useBasicToggle from "@/app/(main site)/Components/ui/BasicToggle"
import React, { useEffect, useState, useRef } from 'react'
import handlefetch_ai_data from '@/app/(main site)/(Landing Pages)/ai-article-generator/servercontroller'
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import '@/app/(main site)/Components/styles/prism.css'
import { atom, useAtom } from 'jotai'
import { Modal } from "@/public/utils/Modal"
import { SubmitToMongoDB } from '@/app/(main site)/(Landing Pages)/ai-article-generator/SubmitToMongoDB'
import { CloseButton } from '@/public/utils/CloseButton'
import Image from "next/image"
import Link from "next/link"

///Make a jotai atom
export const articleAccumulatorAtom = atom(0)


let javacode = " ```javaScript \n \
(() => {console.log('hello world') \n \
  })() \n```\n"

let ipData = null

// export default function ClientPage({handlefetch_ai_data}: any) {
export default function AIArticleGenerator() {

    const [getAiText, setAiText, AiTextBox] = useTextArea({ prompt: "Enter Your Chat Prompt.." })


    const [SelectedChapters, BasicSelect_Chapter] = useBasicSelect({ options: [1, 2, 3, 4, 5], maintext: 'Select Chapter Amount' })
    const [textInput2, BasicSelect_ArticleNumber] = useAdvancedTextInput({ prompt: "Only Input This for Multiple Generations..." })
    const [ai_result, setAi_result] = useState(['Your Result Will Appear Here']);
    const [articleAccumulator, setArticleAccumulator] = useAtom(articleAccumulatorAtom)


    //Save Article UI
    const [prompt, setPrompt] = useState("Enter Article Name")
    const [typePrompt, setTypePrompt] = useState("Enter Article Type")
    const [articleName, BasicArticleName] = useAdvancedTextInput({ prompt: prompt })
    const [articleType, BasicArticleType] = useAdvancedTextInput({ prompt: typePrompt })
    const [setLoading, LoadingWrapper, LoadSuccess, LoadError] = useLoading()

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
        setLoading("on")
        console.log(SelectedChapters, textInput2,)
        let result = null

        result = await handlefetch_ai_data({ selectedOption: 'uncensored chat ai', textInput: (ai_result + getAiText()), multipleGenerationText: textInput2.current, generationCount: SelectedChapters as number })
        await fetch(`https://fastapi-mongo-production.up.railway.app/requests/${ipData.ip}`)
        setAiText('')
        setAi_result((prevResults) => {
            if (prevResults[0] === 'Your Result Will Appear Here') {
                return [result]
            }
            return [...prevResults, result]
        })
        console.log(result)
        setLoading("off")


    }
    const [ipRequestRemaining, setIpRequestRemaining] = useState('');

    const fetchData = async () => {
        try {
            // Get the IP address from ipify
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            ipData = await ipResponse.json();

            // Fetch the request count for the IP address
            const requestResponse = await fetch(`https://fastapi-mongo-production.up.railway.app/requests/${ipData.ip}`);
            const requestData = await requestResponse.json();

            // Set the request count
            setIpRequestRemaining(12 - requestData.request_count);

        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    function sellProduct() {
        submit_to_mongoDB()
    }



    console.log(parseInt(ipRequestRemaining))
    useEffect(() => {


        fetchData();
    }, []);
    return (
        <div className="min-h-[1000px]">
            <MainContentTemplate title="GirlxAi Uncensored Chat">

                <div className='flex flex-col gap-1 items-center justify-center'>
                    <Image
                        src="/girl.jpg"
                        width={500}
                        height={300}
                    />
                    <p className="italic text-gray-600 mt-2 text-center">
                        &iexcl;Hola! I'm the horniest girl you'll ever meet. tehe
                    </p>
                    <div className="max-w-full">
                        {ai_result.map((ai_result) => {
                            return (
                                <div className="p-10">
                                    <ReactMarkdown >{ai_result}</ReactMarkdown>
                                </div>)
                        })}
                    </div>
                    <Modal ref={modalRef}>
                        <BasicArticleName />
                        <BasicArticleType />
                        <SubmitToMongoDB submit_to_mongoDB={submit_to_mongoDB} />
                    </Modal>
                   
                        {!ipRequestRemaining && <div className="flex justify-center items-center space-x-2">
                            <p className="block">Loading</p>
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                        }
                        {ipRequestRemaining && (ipRequestRemaining > -12) && <>
                            <LoadingWrapper>
                            <div className="w-full flex items-center justify-center m-4">
                                <AiTextBox />
                            </div>
                            
                            <button className='btn' onClick={handleClick}>Submit</button>
                            </LoadingWrapper>
                            <p className="italic  mt-2 text-red-600">You have <span className="text-yellow-700">{ipRequestRemaining}</span> Chats Remaining</p>
                        </>
                        }
                        {ipRequestRemaining < -12 &&
                            <>
                                <dialog id="my_modal_2" className="modal" open>
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Your out of credits please buy more :(</h3>
                                        <Link href='/girlfriend-ai-chat/purchase' ><button className='btn bg-pink-700 text-white w-full'>Buy GirlxAI Chat Now! - Black Friday Discount</button></Link>

                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>Close</button>
                                    </form>
                                </dialog>
                            </>
                        }
                    

                </div>
            </MainContentTemplate>
        </div>
    )
}

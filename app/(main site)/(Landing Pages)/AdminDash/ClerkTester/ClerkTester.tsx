"use client"
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import useAdvancedTextInput from "@/app/(main site)/Components/ui/AdvancedTextInput";
import useLoading from "@/app/(main site)/Components/ui/Loading2";
import { getGenericMetaData, get_generic_meta_data_with_user_id, createNewMetaData, deleteUserMetaData } from "@/app/services/userServices"
import { useState, useEffect } from "react";

export default function ClerkTester() {
    const [setLoading, LoadingWrapper, LoadSuccess, LoadError] = useLoading()
    const [setLoading2, LoadingWrapper2, LoadSuccess2, LoadError2] = useLoading()
    const [setLoading3, LoadingWrapper3, LoadSuccess3, LoadError3] = useLoading()
    const [setLoading4, LoadingWrapper4, LoadSuccess4, LoadError4] = useLoading()

    const [clerkIdOutput, ClerkIdInput] = useAdvancedTextInput({ prompt: "Type In a Clerk ID" })
    const [objToDeleteOutput, ObjToDeleteInput] = useAdvancedTextInput({ prompt: "Type In a Clerk Object" })


    const [showClerkUserByID, setClerkUserByID] = useState('')
    const [showCurrentClerkUser, setCurrentClerkUser] = useState('')

    async function ClerkTester() {
        const metaData = await getGenericMetaData()
        const stringData = JSON.stringify(metaData)
        setCurrentClerkUser(stringData)
        console.log(metaData)
    }

    async function getClerkUserById(userID: string) {
        console.log(userID)
        const metaData = await get_generic_meta_data_with_user_id(userID)
        const stringData = JSON.stringify(metaData)
        setClerkUserByID(stringData)
        console.log(metaData)
    }

    async function test() {
        let TotalTokens = (await getGenericMetaData())["Test Product"]?.TotalCredits

        if (!TotalTokens) {
            TotalTokens = 0
        }
        console.log(TotalTokens)


        let productName = "Test Product"
        let metadata = {
            productName: productName,
            exipire: 30,
            credits: 2000,
            userId: "useasdasdasd3FwtQQLFadssMjf"
        }
        let alteredmetadata = {...metadata, TotalCredits: TotalTokens + metadata.credits}
        await createNewMetaData(metadata.productName, alteredmetadata, metadata.userId)
    }


    return (
        <MainContentTemplate title="ClerkTester">
            <div className="flex flex-col justify-center items-center gap-5 w-full">

                <h2>Get Clerk User By ID</h2>
                <p>{showClerkUserByID}</p>
                <ClerkIdInput />
                <LoadingWrapper2 callback={() => getClerkUserById(clerkIdOutput.current)}>
                    <button className="btn text-white bg-blue-600">Retrieve Stored Data</button>
                </LoadingWrapper2>

                <h2>Get Current ClerkUser</h2>
                <p>{showCurrentClerkUser}</p>
                {/* <LoadingWrapper callback={() => ClerkTester(clerkIdOutput.current)}> */}
                <LoadingWrapper callback={ClerkTester}>
                    <button className="btn text-white bg-blue-600">Retrieve Stored Data</button>
                </LoadingWrapper>

                <h2>Delete Current Clerk Object</h2>
                <ObjToDeleteInput />
                <LoadingWrapper3 callback={() => deleteUserMetaData(objToDeleteOutput.current)}>
                    <button className="btn text-white bg-blue-600">Delete Stored Data</button>
                </LoadingWrapper3>

                <h2>Test Stripe Subroutine</h2>
                <LoadingWrapper4 callback={() => test()}>
                    <button className="btn text-white bg-blue-600">Test</button>
                </LoadingWrapper4>


            </div>
        </MainContentTemplate>
    )

}
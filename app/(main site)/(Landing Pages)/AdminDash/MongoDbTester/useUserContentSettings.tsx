"use client"

import { useState, useEffect } from 'react'
import useAdvancedSelect from '@/app/(main site)/Components/ui/AdvancedSelect'
import { getUserID } from "@/app/(main site)/Components/Utils/authMetaData"
import { getMainSettings } from "@/app/(main site)/Components/db_services/mongo"
import {FC, Dispatch, SetStateAction} from 'react'


export default function useUserContentSettings():[FC, FC, string | number, string | number, Dispatch<SetStateAction<string>>, Dispatch<SetStateAction<string>>] {

    const [category, setCategory] = useState([])
    const [contentType, setContentType] = useState([])


    const { BasicSelect: CategorySelectELM, selectedOption: selectedCategory, setSelectedOption: setCategoryELM } = useAdvancedSelect({ options: category, maintext: 'Select A Category' })
    const { selectedOption: selectedContent, setSelectedOption: setContentELM, BasicSelect: ContentSelectELM } = useAdvancedSelect({ options: contentType, maintext: 'Select A Content Type' })



    async function getContent(){
        let user = await getUserID() as string
        const metaData = await getMainSettings(user)
        const stringData = JSON.stringify(metaData)
        setContentType([...metaData.contentType])
        setCategory([...metaData.category])
        console.log(metaData.contentType)
    }

    useEffect(() => {
        getContent()
    }, [])

    return (
        [CategorySelectELM, ContentSelectELM, selectedCategory, selectedContent, setCategoryELM, setContentELM]
    )
}
"use server"

import { fetch_ai_data } from '@/app/(main site)/Components/Utils/fetch_ai_data';



export default async function handlefetch_ai_data(selectedOption: string, textInput: string) {
    'use server'
    return (await fetch_ai_data(selectedOption, textInput).then(result => result.singleGeneration()))
  } 

"use server"

import { fetch_ai_data } from '@/app/(main site)/Components/Utils/fetch_ai_data';



export default async function handlefetch_ai_data({selectedOption, textInput, multipleGenerationText, generationCount}: {selectedOption: string, textInput: string, multipleGenerationText?: string, generationCount?: number}) {
    'use server'
    if (multipleGenerationText && generationCount) {
        return (await fetch_ai_data(selectedOption, textInput).multipleGenerations(multipleGenerationText, 5))
    }
    return (await fetch_ai_data(selectedOption, textInput).singleGeneration())
  } 

 

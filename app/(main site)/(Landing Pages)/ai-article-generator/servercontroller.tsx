"use server"

import { fetch_ai_data } from '@/app/(main site)/Components/Utils/fetch_ai_data';



export default async function handlefetch_ai_data({selectedOption, textInput, multipleGenerationText, generationCount}: {selectedOption: string | number, textInput: string, multipleGenerationText?: string, generationCount?: number}) {
    'use server'
    if (multipleGenerationText && generationCount) {
        
        return (await fetch_ai_data(selectedOption as string, textInput).multipleGenerations(multipleGenerationText, generationCount))
    }
    return (await fetch_ai_data(selectedOption as string, textInput).singleGeneration())
  } 

 

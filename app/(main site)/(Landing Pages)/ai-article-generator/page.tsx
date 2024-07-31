
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import * as markdownUtils from '@/app/globalUtils/markdownUtils'
import { TableOfContentsGenerator } from '@/app/globalComponents/TableOfContentsGenerator'
import '@/app/(main site)/Components/styles/prism.css'
import { fetch_ai_data } from '@/app/(main site)/Components/Utils/fetch_ai_data';
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';
import ClientPage from '@/app/(main site)/(Landing Pages)/ai-article-generator/ClientPage'

export default async function Page() {
  //let ai_result = ( aawait fetch_ai_data('lamma3', 'teach me functional programming in javascript ').singleGeneration())
   //let ai_result = (await fetch_ai_data('gemini', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3));
  //let ai_result = ( await fetch_ai_data('lamma3', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3))
  //let ai_result = ( await fetch_ai_data('openai', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3))
  async function handlefetch_ai_data(selectedOption: string, textInput: string) {
    'use server'
    console.log('hit')
    let result =await fetch_ai_data(selectedOption, textInput).then(result => result.singleGeneration())
    //  result = await result.singleGeneration()
    console.log(result)
    return result
  } 

let ai_result = '' 

  return (

    <MainContentTemplate title="MalcMind - AI Article Generator">
      <ClientPage handlefetch_ai_data={handlefetch_ai_data}/>
    </MainContentTemplate>)
}


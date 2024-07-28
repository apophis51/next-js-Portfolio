
import dynamic from 'next/dynamic'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'
import * as markdownUtils from '@/app/globalUtils/markdownUtils'
import { TableOfContentsGenerator } from '@/app/globalComponents/TableOfContentsGenerator'
import '@/app/(main site)/Components/styles/prism.css'
import { fetch_ai_data } from '@/app/(main site)/Components/Utils/fetch_ai_data';
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';


export default async function Page() {
  //let ai_result = ( await fetch_ai_data('lamma3', 'teach me functional programming in javascript ').singleGeneration())
   //let ai_result = (await fetch_ai_data('gemini', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3));
  // let ai_result = ( await fetch_ai_data('lamma3', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3))
  //let ai_result = ( await fetch_ai_data('openai', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3))

let ai_result = 'sldkf' 

  return (
    <MainContentTemplate title="MalcMind - AI Article Generator">
          <MDXRemote
            source={ai_result}
          />
    </MainContentTemplate>)
}


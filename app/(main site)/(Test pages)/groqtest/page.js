import Container from '@mui/material/Container';
import Highlighter from '@/app/(main site)/Components/Utils/highlighter'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'
import * as markdownUtils from '@/app/globalUtils/markdownUtils'
import { TableOfContentsGenerator } from '@/app/globalComponents/TableOfContentsGenerator'
import '@/app/(main site)/Components/styles/prism.css'
import { fetch_ai_data } from '@/app/(main site)/Components/Utils/fetch_ai_data';


export default async function Page() {
  //let ai_result = ( await fetch_ai_data('lamma3', 'teach me functional programming in javascript ').singleGeneration())
   let ai_result = ( await fetch_ai_data('gemini', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3))
  // let ai_result = ( await fetch_ai_data('lamma3', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3))
  //let ai_result = ( await fetch_ai_data('openai', 'teach me factory functions in 3 chapters').multipleGenerations('now give me the next chapter', 3))



  return (
    <Container maxWidth="xl"  >
      <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          <MDXRemote
            source={ai_result}
          />
          <Highlighter />
        </div>
      </div>


    </Container>)
}


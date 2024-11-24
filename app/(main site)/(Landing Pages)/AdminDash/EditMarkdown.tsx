///https://www.npmjs.com/package/react-simplemde-editor


"use client";
import Container from '@mui/material/Container';
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import '@/app/(main site)/Components/styles/prism.css'


export function EditMarkdown({ Content, onChange, options }) {


  HighlightafterEveryRender()


  return (
    <Container maxWidth="xl"   >
      <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600 grow'>
          {
            <>
              <SimpleMDE options = {options} value={Content} onChange={onChange} />
            </>
          }
        </div>
      </div>
    </Container>)
}




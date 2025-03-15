'use server'

import { headers } from "next/headers";
import {getOneContent} from '@/app/(main site)/Components/db_services/mongo'

export async function generateMetadata() {  

    const header = await headers()
    const xurl = header.get('x-url');
    const path =  xurl?.split('/').pop()

    if (path != undefined) {
    
    const data = await getOneContent(path,"meta")
     
    return {
      title: data.Title,
      description: data.Description 
    }};  
  }

  export default async function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        {children}
      </>
    )
  }
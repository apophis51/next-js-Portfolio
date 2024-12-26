'use server'
//'use client'
//import dynamic from "next/dynamic";
import CreateANewBlo from "./CreateANewBlog"
//const CreateANewBlo = dynamic(() => import("./CreateANewBlog"), { ssr: false });
import { headers } from 'next/headers'


// export const dynamic = 'force-dynamic'


export default async function CreateANewBlog({searchParams}) {
// const headersList = await headers() //prevents ssr
 //const referer = headersList.get('referer') 
const filters = (await searchParams)
  return (

    <>
      <CreateANewBlo />
    </>


  )
}

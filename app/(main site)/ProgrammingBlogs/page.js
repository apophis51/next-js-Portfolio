'use server'
import Script from 'next/script';
import Container from '@mui/material/Container';
import Hero from '../Components/Hero'
// import './blog.css'
// import './prism.css'
import '@/app/(main site)/Components/styles/prism.css'
import BlogCollection from './BlogCollection'
// import { useSearchParams } from 'next/navigation'
import { headers } from 'next/headers'
import {strapi_blogs_Data, mongoDB_Blogs_Adapter} from '@/app/(main site)/Components/db_services/fetchBlogData'

async function getData() {
  //const data = await mongoDB_Blogs_Adapter()///new
  const data = await strapi_blogs_Data()
  return data
}


export default async function Page(props) {
  const searchParams = await props.searchParams;
  const headersList = await headers()
  const referer = headersList.get('referer')

  const data = await getData()
  let contentNeeded = 'Programming Blogs'
  console.log('these are the search params', searchParams)

  if (Object.keys(searchParams).length) {
    contentNeeded = searchParams.filter
    console.log(searchParams.filter)
  }


  return (<div className='overflow-y-hidden overflow-x-hidden'><Container maxWidth="xl">
    <Script src='./prism.js'
      strategy='afterInteractive' />
    <Hero contentNeeded={contentNeeded} />
    <div className="prose-sm prose-a:no-underline prose-h1:text-blue-500  flex justify-center items-center">
      <BlogCollection data={data} />
    </div>
  </Container>
  </div>)
}
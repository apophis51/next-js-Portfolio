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
import projectUrls from '@/projectSettings'

async function getData() {
  // const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/')
  const res = await fetch(projectUrls().blogsURL)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
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
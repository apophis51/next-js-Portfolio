import Script from 'next/script';
import Container from '@mui/material/Container';
import Hero from '../Components/Hero'
import './blog.css'
import './prism.css'
import BlogCollection from './BlogCollection'
import { useSearchParams } from 'next/navigation'


async function getData() {
  // const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/')
  const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=60')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


export default async function Page({ searchParams }) {
  const data = await getData()
  let contentNeeded = 'Programming Blogs'

  if (Object.keys(searchParams).length) {
    contentNeeded = searchParams.filter
    console.log(searchParams.filter)
  }


  return (<div><Container maxWidth="xl">
    <Script src='./prism.js'
      strategy='afterInteractive' />
    <Hero contentNeeded={contentNeeded} />
    <div className="prose max-w-none prose-sm prose-a:no-underline prose-h1:text-blue-500">
      <BlogCollection data={data} />
    </div>
  </Container>
  </div>)


}
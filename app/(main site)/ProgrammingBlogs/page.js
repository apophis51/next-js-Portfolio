          
import Script from 'next/script';
import Container from '@mui/material/Container';
import Hero from '../Components/Hero'
import './blog.css'
import './prism.css'
import BlogCollection from './BlogCollection'


 
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

  
  export default async function Page() {
    const data = await getData()
   
    return (<div><Container maxWidth="xl">
      <Script src = './prism.js'
      strategy='afterInteractive' />
      <Hero contentNeeded = {"Programming Blogs"} />
      <BlogCollection data={data}/>
      </Container>
      </div>)


  }
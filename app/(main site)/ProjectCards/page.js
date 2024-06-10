          
import ReactMarkdown from 'react-markdown'
import Script from 'next/script';
import Link from 'next/link'
import Container from '@mui/material/Container';
import Card from './Card'
import ProgrammingBlogs from '../ProgrammingBlogs/page.js'
// import About from '@/app/(main site)/About/[[...Location]]/page'  
import ContactForm from '@/app/(main site)/Components/ContactForm'

 
async function getData() {
    const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/projects?populate=*')
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


    
    return (
 
    <div  >
    {/* <About/> */}
      {/* <h1 class = "text-4xl h-20 lg:pr-52 mt-0" style = {{backgroundColor: "#311b92",textAlign: "center",color:"white"}}>My Projects</h1> */}
    <section className = "flex flex-wrap justify-evenly gap-5 bg-blue-900  pt-20 pb-10">
      <Script src = './prism.js'
      strategy='befInteractive' />
    
      
        {data.data.map((item) => (
        <images >
          <Card className = "overflow"
                blogTitle = {item.attributes.Title} 
                blogImage = {item.attributes.Projectphoto.data.attributes.formats.medium.url}
                blogStack = {item.attributes.StackTech}
                blogWebsite = {item.attributes.Website}
                // blogContent = {<ReactMarkdown>{item.attributes.Description.slice(0,150)+'...'}</ReactMarkdown>}
                blogContent = {item.attributes.Description}
                

          />
        </images>))}
      
      </section>
      <ContactForm/>
      </div>

  
      )


  }
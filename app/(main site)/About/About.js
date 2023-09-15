
import  ReactMarkdown  from "react-markdown"
import Link from 'next/link'
import Script from 'next/script';
import about from './about.css'
import ContactForm from '../ContactForm/page'


 
async function getPost(params) {
  const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/')
  const data = await res.json()
 
  return data
}

 
export default async function About({ params }) {
  const data = await getPost(params)
    return (
      <div>
    <div style ={{padding:'20px'}} className='linedpaper' >

        <ReactMarkdown>{data.data[9].attributes.Content}</ReactMarkdown>
        <ReactMarkdown>{data.data[8].attributes.Content}</ReactMarkdown>
    </div>
    <ContactForm/>
    </div>)
    
//   return <PostLayout post={post} />
}
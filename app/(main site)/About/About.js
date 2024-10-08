
import ReactMarkdown from "react-markdown"
import Link from 'next/link'
import Script from 'next/script';
import './about.css'
import ContactForm from '@/app/(main site)/Components/ContactForm'



async function getPost(params) {
  const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/')
  const data = await res.json()

  return data
}



export default async function About({ params }) {
  const data = await getPost(params)


  const renderLink = (props) => (
    <a style={{ color: 'red' }} {...props}>
      {props.children}
    </a>
  );

  const components = {
    a: renderLink,
  };


  return (

    <div className=''>
      {/* <div style ={{padding:'20px'}} className='bg-white prose max-w-none' > */}

      <div style={{ padding: '20px' }} className='bg-white prose-xl overflow-y-hidden overflow-x-hidden ' >

        <ReactMarkdown>{data.data.filter((item) => item.attributes.Title == "TECHNICAL SKILLS")[0].attributes.Content}</ReactMarkdown>
        <ReactMarkdown components={components}>{data.data.filter((item) => item.attributes.Title == "About")[0].attributes.Content}</ReactMarkdown>
      </div>
      <ContactForm />
    </div>)
}
import  ReactMarkdown  from "react-markdown"
import Link from 'next/link'
import prism from '../prism.css'
import Script from 'next/script';
import Container from '@mui/material/Container';

 


// export async function generateStaticParams() {
//   return [{ id: '1' }, { id: '2' }]
// }
 
async function generateStaticParams(params) {
  const res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/${params.id}`)
  const post = await res.json()
 
  return post
}
 
export default async function Post({ params }) {
  const post = await generateStaticParams(params)
    return (
              <Container maxWidth="xl"  >

    <div className = 'bg-white'>
      <Script src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
      strategy="lazyOnload" />
        <ReactMarkdown>{post.data.attributes.Content}</ReactMarkdown>
    </div>
    </Container>)
//   return <PostLayout post={post} />
}




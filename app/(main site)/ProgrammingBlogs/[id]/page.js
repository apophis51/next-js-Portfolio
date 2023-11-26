

import  ReactMarkdown  from "react-markdown"
import Link from 'next/link'
import Script from 'next/script';
import Container from '@mui/material/Container';
import Highlighter from './highlighter'

 //https://www.calvintorra.com/blog/add-prism-js-code-highlighting-to-next-js
 //https://www.dawsoncodes.com/posts/2/syntax-highlighting-with-prism-and-nextjs


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

  const renderLink = (props) => (
    <a style={{ color: 'red' }} {...props}>
      {props.children}
    </a>
  );

  const components = {
    a: renderLink,
  };


    return (
              <Container maxWidth="xl"  >
    <div className = 'bg-white'>
    {/* <link rel="stylesheet" href="prism.css" /> */}

      {/* <Script src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
      strategy="afterInteractive" /> */}
        <ReactMarkdown components={components}>{post.data.attributes.Content}</ReactMarkdown>
        <Highlighter />
    </div>
    </Container>)
//   return <PostLayout post={post} />
}




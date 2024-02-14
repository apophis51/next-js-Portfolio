

// import  ReactMarkdown  from "react-markdown"
import Container from '@mui/material/Container';
import Highlighter from './highlighter'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'

import '../prism.css'
// import '../blog.css'

const App = dynamic(() => import('../../(Landing Pages)/FiringRange/App'))



 //https://www.calvintorra.com/blog/add-prism-js-code-highlighting-to-next-js
 //https://www.dawsoncodes.com/posts/2/syntax-highlighting-with-prism-and-nextjs

 
// async function generateStaticParams(params) {
//   const res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/${params.id}`)
//   const post = await res.json()
//   console.log(post)
 
//   return post
// }

// export function generateStaticParams() {
//   return [{ id: '/ProgrammingBlogs/editing-65ch-max-width-with-tailwind-css-prose---reactmarkdown-styling' }, { id: '/ProgrammingBlogs/dynamically-render-react-components-into-your-reactmarkdown' }, { id: '/ProgrammingBlogs/what-is-the-reactmarkdown-difference-between-escapehtml-and-rehype-raw?' }]
// }
 

async function fgenerateStaticParams(params) {
  console.time('internal speed')
  let res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=60`)
  let post = await res.json()
  let blogID = ''
  console.log('testred', res)
  console.log('testred', post)
  console.log('TestRed', params.id)
  console.log('TestRed', post.data)

  for (let x of post.data){
    console.log('testBlue', x.attributes.Title.toLowerCase().split(' ').join('-'))
    if (x.attributes.Title.toLowerCase().split(' ').join('-').includes(params.id)){
      blogID = x.id
      console.log('TestRed',blogID)
    }
  }
   res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/${blogID}`)
    post = await res.json()
    console.timeEnd('internal speed')
  return post
}
 
export default async function Post({ params }) {
  const headersList = headers()
  const referer = headersList.get('referer')

  console.time('fgenerateStaticParams Execution Speed')
  const post = await fgenerateStaticParams(params)
  console.timeEnd('fgenerateStaticParams Execution Speed')

  const renderLink = (props) => (
    <a style={{ color: 'red' }} {...props}>
      {props.children}
    </a>
  );

  const swapLink = (props) => {
    const { children } = props;
  
    // Check if the content of the paragraph contains the string '{{terminal}}'
    const hasTerminalPlaceholder = children.includes('{{terminal}}');
  
    if (hasTerminalPlaceholder) {
      // If true, render your custom terminal component
      // return <YourTerminalComponent />;
      return <p><App /></p>
    }
  
    // If false, render the default paragraph
    return <p>{children}</p>;
  };

  const components = {
    a: renderLink,
    p: swapLink,
  };
  console.log('TestRed' , post.data)

  const MDXcomponents = { App }

    return (
              <Container maxWidth="xl"  >
    <div className = 'bg-white p-9 md:flex flex-col items-center justify-center'>
    {/* <link rel="stylesheet" href="prism.css" /> */}
      {/* <Script src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
      strategy="afterInteractive" /> */}
      {/* <div className='prose  prose-sm max-w-none flex flex-col items-center justify-center'> */}
      <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
        {/* <ReactMarkdown components={components}>{post.data.attributes.Content}</ReactMarkdown> */}
        <MDXRemote
        components={MDXcomponents}
      source={post.data.attributes.Content}
    />

        <Highlighter />
        </div>
    </div>
    </Container>)
//   return <PostLayout post={post} />
}




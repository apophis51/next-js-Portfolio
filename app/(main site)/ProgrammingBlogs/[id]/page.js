

import  ReactMarkdown  from "react-markdown"
import Container from '@mui/material/Container';
import Highlighter from './highlighter'
import dynamic from 'next/dynamic'

import '../prism.css'
import '../blog.css'

const App = dynamic(() => import('../../(Landing Pages)/FiringRange/App'))



 //https://www.calvintorra.com/blog/add-prism-js-code-highlighting-to-next-js
 //https://www.dawsoncodes.com/posts/2/syntax-highlighting-with-prism-and-nextjs

 
// async function generateStaticParams(params) {
//   const res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/${params.id}`)
//   const post = await res.json()
//   console.log(post)
 
//   return post
// }

async function generateStaticParams(params) {
  let res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=60`)
  let post = await res.json()
  let blogID = ''
  console.log('testred', res)
  console.log('testred', post)
  console.log('TestRed', params.id)

  for (let x of post.data){
    console.log('testBlue', x.attributes.Title)
    if (x.attributes.Title.toLowerCase().split(' ').join('-').includes(params.id)){
      blogID = x.id
      console.log('TestRed',blogID)
    }
  }
   res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/${blogID}`)
    post = await res.json()
  return post
}
 
export default async function Post({ params }) {
  console.time('generateStaticParams Execution Speed')
  const post = await generateStaticParams(params)
  console.timeEnd('generateStaticParams Execution Speed')

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


    return (
              <Container maxWidth="xl"  >
    <div className = 'bg-white p-9'>
    {/* <link rel="stylesheet" href="prism.css" /> */}

      {/* <Script src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
      strategy="afterInteractive" /> */}
      <div className='prose  prose-sm max-w-none'>
        {/* Our ReactMarkdown is generating content from our strapi CMS data object */}
        <ReactMarkdown components={components}>{post.data.attributes.Content}</ReactMarkdown>
        <Highlighter />
        </div>
    </div>
    </Container>)
//   return <PostLayout post={post} />
}






import  ReactMarkdown  from "react-markdown"
import Container from '@mui/material/Container';
import Highlighter from './highlighter'
import '../prism.css'
import '../blog.css'



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
  for (let x of post.data){
    if (x.attributes.Title.toLowerCase().split(' ').join('-').includes(params.id)){
      blogID = x.id
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

  const components = {
    a: renderLink,
  };


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




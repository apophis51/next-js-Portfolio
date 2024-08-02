

// import  ReactMarkdown  from "react-markdown"
import Container from '@mui/material/Container';
import Highlighter from '@/app/(main site)/Components/Utils/highlighter'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'
import * as markdownUtils from '@/app/globalUtils/markdownUtils'
import { TableOfContentsGenerator } from '@/app/globalComponents/TableOfContentsGenerator'


//import '../prism.css'
import '@/app/(main site)/Components/styles/prism.css'
// import 'prism.css'
// import '../blog.css'

const App = dynamic(() => import('@/app/(main site)/(Landing Pages)/FiringRange/App'))



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


async function fetchBlog(params) {
  let res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=8000`)
  let post = await res.json()
  let blogID = ''

  for (let x of post.data) {
    if (x.attributes.Title.toLowerCase().replace(/,/g, '').split(' ').join('-').includes(params.id)) {
      blogID = x.id
    }
  }
  res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/${blogID}`)
  post = await res.json()
  return post
}

export default async function Post({ params }) {
  const headersList = headers()
  const referer = headersList.get('referer')

  console.time('fetchBlog Execution Speed')
  const post = await fetchBlog(params)
  console.timeEnd('fetchBlog Execution Speed')

  const markdownTOCData = markdownUtils.processMarkdown(post.data.attributes.Content)
  console.log(markdownTOCData[0].link)
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

  const MDXcomponents = {
    App, h1: (props) => {
      // Generate an 'id' attribute based on the heading text
      const headingText = props.children ? props.children.toString() : '';
      const id = headingText.toLowerCase().replace(/[^a-z\s]/g, '').trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      console.log(id)
      //const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');  //depricated 8/22/2024
      return (
        <h1 {...props} id={id} >
          {props.children}
        </h1>
      );
    }, h2: (props) => {
      // Generate an 'id' attribute based on the heading text
      const headingText = props.children ? props.children.toString() : '';
      let id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      /* if check was here because it wont work when its in the format 4. **Some heading text** */ 
      if(Array.isArray(props.children))
        {
          (props.children).forEach((child) => {
            try{
            const headingText = child.props.children
            console.log(child.props.children)
            id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            console.log(id)
             }
             catch{}
          })
          console.log('we got one')
        }  
      return (
        <h2 {...props} id={id} >
          {props.children}
        </h2>
      );
    }, h3: (props) => {
      // Generate an 'id' attribute based on the heading text
      console.log(props.children)
      const headingText = props.children ? props.children.toString() : '';
      let id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'); 

      /* if check was here because it wont work when its in the format 4. **Some heading text** */ 
      if(Array.isArray(props.children))
        {
          (props.children).forEach((child) => {
            try{
            const headingText = child.props.children
            console.log(child.props.children)
            id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            console.log(id)
             }
             catch{}
          })
          console.log('we got one')
        }
      return (
        <h3 {...props} id={id} >
          {props.children}
        </h3>
      );
    },  h4: (props) => {
      // Generate an 'id' attribute based on the heading text
      console.log(props.children)
      const headingText = props.children ? props.children.toString() : '';
      let id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'); 

      /* if check was here because it wont work when its in the format 4. **Some heading text** */ 
      if(Array.isArray(props.children))
        {
          (props.children).forEach((child) => {
            try{
            const headingText = child.props.children
            console.log(child.props.children)
            id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
            console.log(id)
             }
             catch{}
          })
          console.log('we got one')
        }
      return (
        <h3 {...props} id={id} >
          {props.children}
        </h3>
      );
    },pre: (props) => {
      // Generate an 'id' attribute based on the heading text
      return (
        <div className='text-sm'>
        <pre {...props}   >
          {props.children}
        </pre>
        </div>
      );
    }, img: (props) => {
      // Generate an 'id' attribute based on the heading text
      return (
        <div class="flex justify-center items-center">
        <img {...props}   >
          {props.children}
        </img>
        </div>
      );
    },
  }

  return (
    <Container maxWidth="xl"  >
            {/* <div className='bg-white p-9 md:flex flex-col items-center justify-center'> */}
            {/* <div className='bg-white p-9 md:flex-col flex items-center justify-evenly overflow-y-hidden overflow-x-hidden'> */}

      <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
        {/* <link rel="stylesheet" href="prism.css" /> */}
        {/* <Script src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
      strategy="afterInteractive" /> */}
        {/* <div className='prose  prose-sm max-w-none flex flex-col items-center justify-center'> */}
        {/* <div className='self-start max-w-0 invisible basis-0'>  <TableOfContentsGenerator markdownTOCData={markdownTOCData} /></div> */}

        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          {/* <ReactMarkdown components={components}>{post.data.attributes.Content}</ReactMarkdown> */}
          <MDXRemote
            components={MDXcomponents}
            source={post.data.attributes.Content}
          />

          <Highlighter />
        </div>
        <div className='self-start pt-6 sticky top-0'>  <TableOfContentsGenerator markdownTOCData={markdownTOCData} /></div>

        {/* <p><a href={markdownTOCData[0].link}>{markdownTOCData[0].text}</a></p> */}
      </div>


    </Container>)
  //   return <PostLayout post={post} />
}




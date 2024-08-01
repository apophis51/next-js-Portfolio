

// import  ReactMarkdown  from "react-markdown"
import Container from '@mui/material/Container';
import Highlighter from '@/app/(main site)/Components/Utils/highlighter'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { MDXRemote } from 'next-mdx-remote/rsc'
import * as markdownUtils from '@/app/globalUtils/markdownUtils'
import { TableOfContentsGenerator } from '@/app/globalComponents/TableOfContentsGenerator'
import { parseFrontmatter } from '@/app/(main site)/Components/Utils/parseFrontmatter'
import {Metadata} from 'next'


import '@/app/(main site)/Components/styles/prism.css'

const App = dynamic(() => import('@/app/(main site)/(Landing Pages)/FiringRange/App'))



async function fgenerateStaticParams(params) {
  let res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=8000`)
  let post = await res.json()
  let blogID = ''
  console.log(params.id)

  for (let x of post.data) {
    if (x.attributes.Title.toLowerCase().replace(/,/g, '').split(' ').join('-').includes(params.id)) {
      blogID = x.id
    }
  }
  res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs/${blogID}`)
  post = await res.json()
  return post
}

export async function generateMetadata({ params}) {
  // read route params
  const post = await fgenerateStaticParams(params)
  console.log(post)
  const frontMatter = parseFrontmatter(post.data.attributes.Content).frontmatter
  return {
    title: frontMatter.title,
    description: frontMatter.description
  }
}
 

export default async function Post({ params }) {
  
  
  const headersList = headers()
  const referer = headersList.get('referer')

  console.time('fgenerateStaticParams Execution Speed')
  const post = await fgenerateStaticParams(params)
  const blogContent = parseFrontmatter(post.data.attributes.Content).content
  console.timeEnd('fgenerateStaticParams Execution Speed')

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
      const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h1 {...props} id={id} >
          {props.children}
        </h1>
      );
    }, h2: (props) => {
      // Generate an 'id' attribute based on the heading text
      const headingText = props.children ? props.children.toString() : '';
      const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h2 {...props} id={id} >
          {props.children}
        </h2>
      );
    }, h3: (props) => {
      // Generate an 'id' attribute based on the heading text
      const headingText = props.children ? props.children.toString() : '';
      const id = headingText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h3 {...props} id={id} >
          {props.children}
        </h3>
      );
    }, pre: (props) => {
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
        <div className="flex justify-center items-center">
          <img {...props}   >
            {props.children}
          </img>
        </div>
      );
    },
  }

  return (
    <Container maxWidth="xl"  >
      <div className='bg-white p-9  flex-col  md:flex md:flex-row md:overflow-visible items-center justify-evenly overflow-y-hidden overflow-x-hidden'>
        <div className='prose prose-sm lg:prose-xl prose-a:text-red-600'>
          <MDXRemote
            components={MDXcomponents}
            // source={post.data.attributes.Content}
            source={blogContent}
          />
          <Highlighter />
        </div>
        <div className='self-start pt-6 sticky top-0'>  <TableOfContentsGenerator markdownTOCData={markdownTOCData} /></div>
      </div>
    </Container>)
}




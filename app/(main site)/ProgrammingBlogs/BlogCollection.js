

'use client'
import Card from './Card'
import ReactMarkdown from 'react-markdown'
import BlogControl from './BlogControl'
import { useState } from 'react';


export default function BlogCollection({data}){
    const [blogFilter, setBlogFilter] = useState('')

    return(
        <div className="bg-violet-400">
            <div className="flex justify-center items-center">
            <BlogControl setBlogFilter={setBlogFilter}/>
            </div>
        <section className = "flex flex-wrap justify-evenly gap-5 bg-blue-900 p-8">      
        {data.data.map((item) => (item.attributes.Blog_Type == "Programming" && (item.attributes.Title).toLowerCase().includes(blogFilter) ?
        <images >
          <Card 
              //  blogLink =  {`/ProgrammingBlogs/${item.id}`}
                blogLink =  {`/ProgrammingBlogs/${(item.attributes.Title).toLowerCase().split(' ').join('-')}`}
                blogContent = {<ReactMarkdown>{item.attributes.Content.slice(0,300) + '...'}</ReactMarkdown>}
          />
        </images> : null))}
      
      </section>
      </div>
    )
}
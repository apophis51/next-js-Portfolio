

'use client'
import Card from './Card'
import ReactMarkdown from 'react-markdown'
import BlogControl from './BlogControl'
import { useState } from 'react';
import Pagination from '@/app/(main site)/Components/Pagination.tsx'

export default function BlogCollection({data}){
    const [blogFilter, setBlogFilter] = useState('')
    const [sliceTopNumber, setSliceTopNumber] = useState(10)
    const [sliceBottomNumber, setSliceBottomNumber] = useState(0)
    console.log(data.data.length)
    let regex =  /!\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/;

    return(
        <div className="bg-gradient-to-br from-green-700 via-blue-600 to-green-800 m-4 shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)]">
            <div className="flex justify-center items-center">
            <BlogControl setBlogFilter={setBlogFilter}/>
            </div>
        <section className = "flex flex-wrap justify-evenly gap-5 bg-blue-900 p-8">      
        { data.data.slice(sliceBottomNumber,sliceTopNumber).map((item) => (item.attributes.Blog_Type == "Programming" && (item.attributes.Title).toLowerCase().includes(blogFilter) ?
        < >
          {console.log(item.attributes.Content)}
          <Card 
              //  blogLink =  {`/ProgrammingBlogs/${item.id}`}
                blogTitle = {<ReactMarkdown>{'# ' +item.attributes.Title}</ReactMarkdown>}
                blogLink =  {`/ProgrammingBlogs/${(item.attributes.Title).toLowerCase().replace(/,/g, '').split(' ').join('-')}`}
                blogPicture = {item.attributes.Content.match(regex)[2]}
                blogContent = {<ReactMarkdown>{item.attributes.Content.replace(regex, '').replace(item.attributes.Title, '').slice(0,280) + '...'}</ReactMarkdown>}
          />
        </> : null))}
      
      </section>
      <Pagination dataLength={data.data.length} setSliceTopNumber = {setSliceTopNumber} setSliceBottomNumber={setSliceBottomNumber}/>
      </div>
      
    )
}
'use client'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'


import React,{ useState, useMemo, useEffect} from 'react';

export default React.memo(function BlogControl({setBlogFilter}) { 
  const [filter, setFilter] = useState((useSearchParams()).get('filter'));
  console.log(filter) // React.memo helps it get the component to render only 2 times when you hit the back button from a blog instead of it reandering 4 times
  const params = (useSearchParams()).get('filter')
  console.log(params)
  const router = useRouter()
  
 



    if(params){
      console.log('hits')
      setBlogFilter(params)
      if(filter != params){
        setFilter(params)
      }
     } 
     if(!params && filter != 'Filter Blogs'){
      console.log('hits')
      setBlogFilter(` `)

        setFilter(`Filter Blogs`)
      
     } 


  const handleChange = (event) => {
   // setFilter(event.target.value);
   // setBlogFilter(event.target.value)
    if(event.target.value ==''){
      if (params){
        router.push(`/ProgrammingBlogs/`,  { scroll: false })
      }
    }
    else{
    router.push(`/ProgrammingBlogs/?filter=${event.target.value}`,  { scroll: false })
    }
  };


  return (
    <div className='p-2'>
              
        <select
          className="select select-lg w-full max-w-xs"
          value={filter}
          onChange={handleChange}
          autoWidth
        >
          <option value={''}>Filter Blogs</option>
          <option value={'react'}>ReactBlogs</option>
          <option value={'nextjs'}>NextJS Blogs</option>
          <option value={'python'}>Python Blogs</option>
          <option value={'docker'}>Docker Blogs</option>
          <option value={'websockets'}>WebSocket Blogs</option>
          <option value={'wordpress'}>Wordpress Blogs</option>
        </select>
        
   
    </div>
  );
}

)


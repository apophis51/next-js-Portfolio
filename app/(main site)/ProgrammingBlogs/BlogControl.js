'use client'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'


import { useState} from 'react';

export default function BlogControl({setBlogFilter}) {
  const [filter, setFilter] = useState('');
  
  const params = (useSearchParams()).get('filter')
  const router = useRouter()


  const handleChange = (event) => {
    setFilter(event.target.value);
    setBlogFilter(event.target.value)
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
        </select>
        
   
    </div>
  );
}
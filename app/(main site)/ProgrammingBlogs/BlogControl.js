'use client'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState} from 'react';

export default function BlogControl({setBlogFilter}) {
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
    setBlogFilter(event.target.value)
  };


  return (
    <div >
              
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
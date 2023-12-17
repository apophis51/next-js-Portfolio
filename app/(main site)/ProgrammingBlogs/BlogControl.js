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
      
      <FormControl sx={{ m: 1, minWidth: 180}} className="bg-white">
        <InputLabel id="demo-simple-select-autowidth-label" sx={{ backgroundColor: 'white'}}>Blog Filter</InputLabel>
        
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filter}
          onChange={handleChange}
          autoWidth
          label="Blog Filter"
          
        >
       
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'react'}>ReactBlogs</MenuItem>
          <MenuItem value={'nextjs'}>NextJS Blogs</MenuItem>
          <MenuItem value={'python'}>Python Blogs</MenuItem>
          <MenuItem value={'docker'}>Docker Blogs</MenuItem>
        </Select>
        
      </FormControl>
    </div>
  );
}
'use client'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'


import { useState} from 'react';

export default function SelectControl({setFilterFunction,selectionmenu}) {
  const [filter, setFilter] = useState('');
  console.log(selectionmenu)
  const params = (useSearchParams()).get('filter')
  console.log(params)
  const router = useRouter()


  const handleChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value);
    setFilterFunction(event.target.value)
    console.log('triggered')
    if(event.target.value ==''){
      console.log('triggered')
      if (params){
        // router.push(`/ProgrammingBlogs/`,  { scroll: false })
        router.push(`/Crypto/Crypto-Predictions/`,  { scroll: false })
      }
    }
    else{
      console.log('triggered')
    // router.push(`/ProgrammingBlogs/?filter=${event.target.value}`,  { scroll: false })
    router.push(`/Crypto/Crypto-Predictions/?filter=${event.target.value}`,  { scroll: false })

    }
  };


  return (
    <div className='p-2' >
              
        <select
          className="select select-lg w-full max-w-xs bg-black"
          value={filter}
          onChange={handleChange}
          autoWidth
        >
          {selectionmenu.map(({Value,Label}) => (
            <option value={Value}>{Label}</option>
          )
          )}
        </select>
        
   
    </div>
  );
}
'use client'

import {useState} from 'react'
import { useSearchParams } from 'next/navigation'




export default function Pagination({dataLength, setSliceTopNumber, setSliceBottomNumber}) {

  const [activeButton, setActiveButton] = useState(1);

  const params = (useSearchParams()).get('filter')
  console.log(dataLength)

  if (params){
    setSliceTopNumber(dataLength)
    setSliceBottomNumber(0)
 }

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber)
    setSliceTopNumber(buttonNumber * 10)
    setSliceBottomNumber((buttonNumber*10)-10)
  

  };

  function generateNumberRange(end) {
    const result = [];
    for (let i = 1; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  let pages = Math.ceil(dataLength/10)

  let paginationRange = generateNumberRange(pages)
  console.log(paginationRange)

  console.log(pages)
  return (
    <div>
    {(!params) && (<div className='flex flex-wrap justify-evenly p-9'>
      <div className="join">
        <button className="join-item btn btn-md md:btn-lg">«</button>
        {paginationRange.map((number) => {
          return <button onClick={() => handleButtonClick(number)} className={`join-item btn btn-md md:btn-lg ${activeButton === number ? 'btn-active' : ''}`}>{number}</button>
        })}
        <button className="join-item btn btn-md md:btn-lg">»</button>
      </div>
    </div>)}
    </div>
  )
}
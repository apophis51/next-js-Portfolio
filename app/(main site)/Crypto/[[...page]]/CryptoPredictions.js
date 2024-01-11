'use client'

import { useState, useEffect } from 'react'



export default function CryptoPredictions({ ethData }) {
  console.log(ethData)
  const currentTimeStamp = ethData.dateUnEdited
  console.log(currentTimeStamp)
  const currentDate = new Date(currentTimeStamp)
  const targetDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
  console.log(targetDate)
  const dayOfWeek = targetDate.getDay();
  console.log(dayOfWeek)
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  console.log(daysOfWeek[dayOfWeek])


  const [day, setDay] = useState(daysOfWeek[dayOfWeek])
  // const [date, setDate] = useState(targetDate)


  return (
    <div className=' text-white'>
      <h1 className='text-2xl'>Crypto Predictions - Beta</h1>
      <br></br>


      <div className="stats shadow">

        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Ethereum Price on {ethData.recentDate} </div>
          <div className="stat-value text-primary">${ethData.recentprice.toFixed(2)}</div>
          <div className="stat-desc">Beta Text</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">{day} Etherium Price Prediction</div>
          <div className="stat-value text-secondary">${ethData.ethprediction.toFixed(2)}</div>
          <div className="stat-desc">Beta Text</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
          </div>
          <div className="stat-value">--</div>
          <div className="stat-title">Beta Block</div>
          <div className="stat-desc text-secondary">Beta Note</div>
        </div>

      </div>

      <br></br>
      <br></br>

      <br></br>
      <br></br>

      {/* break */}


      <p>By {day} eth is predicted to be worth ${ethData.ethprediction.toFixed(2)} U.S Dollars</p>
      <p><b>This is Not Financial Advice</b></p>
    </div>
  );
}
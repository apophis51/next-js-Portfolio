'use client'

import { useState, useEffect } from 'react'
import SelectButton from '@/app/(main site)/Components/SelectButton'



export default function CryptoPredictions({ fetchprediction }) {
  const [cryptoData, setCryptoData] = useState(null)
  const [forcast, setForecast] = useState(1)


  async function fetch10PredictionMiddleWare() {
    console.log('triggered')
    let coin = cryptoData.crypto
    let predictiondate = 10
    let Data10 = await fetchprediction(coin,predictiondate)
    console.log(Data10)
    setCryptoData(Data10)
    setForecast(10)
  }

  async function fetch1PredictionMiddleWare() {
    console.log('triggered')
    let coin = cryptoData.crypto
    let predictiondate = 1
    let Data10 = await fetchprediction(coin,predictiondate)
    console.log(Data10)
    setCryptoData(Data10)
    setForecast(1)
  }

  async function fetchPredictionMiddleWare(coin,predictiondate=1) { //this works when set to 10 :)
    console.log(coin)
    let newData = await fetchprediction(coin,predictiondate)
    console.log(newData)
    setCryptoData(newData)
  }

  const currentTimeStamp = cryptoData?.dateUnEdited
  const currentDate = new Date(currentTimeStamp)
  let targetDate = forcast
  if (forcast==1){
  targetDate = new Date(currentDate.getTime() + 1 * 24 * 60 * 60 * 1000);
  }
  if (forcast==10){
  targetDate = new Date(currentDate.getTime() + 1 * 264 * 60 * 60 * 1000);

  }
  let dayOfWeek = targetDate.getDay();
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    console.log(null)
    setDay(daysOfWeek[dayOfWeek])
  }, [cryptoData])

  const [day, setDay] = useState(daysOfWeek[dayOfWeek])
  // const [date, setDate] = useState(targetDate)
  const selections = [{ Value: '', Label: 'Select Crypto' }, { Value: 'ethereum', Label: 'Ethereum' }, { Value: 'bitcoin', Label: 'Bitcoin' }, { Value: 'cardano', Label: 'Cardano' }, { Value: 'polkadot', Label: 'Polkadot' }, { Value: 'solana', Label: 'Solana' }]


  return (
    <div className=' text-white '>
      <div>
        <h1 className='text-4xl flex items-center justify-center p-10'>Crypto Predictions - Beta</h1>
      </div>
      <br></br>
      <div className='flex items-center justify-center'>
        <SelectButton selectionmenu={selections} setFilterFunction={fetchPredictionMiddleWare} />
      </div>
      <div className='flex items-center justify-center gap-5 mb-3'>
        <button className='btn' onClick={fetch1PredictionMiddleWare}>One Day ForeCast</button>
        <button className='btn' onClick={fetch10PredictionMiddleWare}>Ten Day ForeCast</button>
      </div>

      <div className="stats shadow flex items-center justify-center">

        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">{cryptoData?.crypto} Price on {cryptoData?.recentDate} </div>
          <div className="stat-value text-primary">${cryptoData?.recentprice.toFixed(2)}</div>
          <div className="stat-desc">Current Price</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">{day} in {forcast} days {cryptoData?.crypto} Price Estimation</div>
          <div className="stat-value text-secondary">${cryptoData?.cryptoprediction.toFixed(2)}</div>
          <div className="stat-desc">Estimated Price</div>
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


      <p>By {day} {cryptoData?.crypto} is predicted to be worth ${cryptoData?.cryptoprediction.toFixed(2)} U.S Dollars</p>
      <p><b>This is Not Financial Advice</b></p>
    </div>
  );
}
'use client'

import { useState } from 'react'

import Image from 'next/image'




/**
 * Renders the instructions for the Clicker Game.
 * 
 * @returns {JSX.Element} The instructions component.
 */
export function Instructions() {

  return (
    <div className="flex items-center justify-center">
      <div className='collapse collapse-arrow bg-base-200 max-w-md  text-black'>
        <input type='checkbox' />
        <p className='text-4xl collapse-title'>Instructions:</p>
        <br></br>
        <div className='collapse-content'>
          <p >  To Win - Become A Software Developer in 1460 days (4 years).</p>
          <br></br>
          <p> If your Entertainment or Hunger Drops to Zero you will die.</p>
          <br></br>
          <p> If you Run out of Money You will die.</p>
          <p>Be sure to pay your bills before they reach 100%!</p>
          <br></br>
          <p>Take Time to Search For Software Jobs - Be warned Your bills will continue to pileup if you search for jobs Instead of working</p>
          <br></br>
          <p>Searching for Software Jobs will result in temporary 50% penality to you income</p>
          <br></br>
          <p>Your software skill will drop slowly overtime if you dont take time to keep learning</p>
        </div>
      </div>
    </div>

  )
}


export function UpgradeCollection2({  collection, functionHandler, upgradeText }) {
  return (
    <div className='border-4'>
      <p className='m-5'>{upgradeText}</p>
      <div className='flex items-center justify-center gap-4 flex-wrap'>
        {collection.map((obj) => {
          const keys = Object.keys(obj);
          const restOfKeys = keys.slice(1); // Skip the first key

          const newObj = {};
          restOfKeys.forEach((key) => {
            newObj[key] = obj[key];
          });
          console.log(newObj)
          let money = newObj['cost']
          console.log(money)
          console.log(newObj)
          // let healthPoints = 100
          return (
            <div key={obj.Name} className=''>
              <div>
                {money}
                <p>{obj.Name}</p>
                <div onClick={() => functionHandler({...newObj})}>
                <Image src={`/clickerGame/${obj.Image}.jpg`}
                  width={100}
                  height={100}
                  
                />
                </div>
                {/* Render the values from the modified object */}
                {Object.entries(newObj).map(([key,value]) => (
                  <div>
                  {key=='Name' && <p>{value}</p>}
                  {key!='Name' && value > 0 && <p key={key}>+ {value} {key}</p>}
                  {key!='Name' && value <= 0 && <p key={key}>{value} {key}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </div>)
}

export function UpgradeCollection({ functionHandler, collection }) {
  console.log('activated')
  return (
    <div className='border-4'>
      <p className='mt-5 '>Get a Real Job for Daily Minimum Wage + $50 per/day </p>
      <br></br>
      <div className="flex items-center justify-center gap-4">
        {collection.map((upgrade) => (
          <Upgrade upgrade={upgrade} functionHandler={functionHandler} />
        ))}
      </div>
    </div>)
}


/**
 * Renders The picture and attaches the image to the upgrade 
 *
 * @param {Object} props - The component props.
 * @param {string} props.upgrade - The upgrade name.
 * @param {Function} props.functionHandler - The function handler for the upgrade.
 * @returns {JSX.Element} The upgrade component.
 */
export function Upgrade({ upgrade, functionHandler, stats }) {
  return (
    <div>
      <Image src={`/clickerGame/${upgrade}.jpg`}
        width={100}
        height={100}
        onClick={() => functionHandler(upgrade)}
      />
      <p>{upgrade}</p>
      <p>{stats}</p>
      <p>+1 health</p>
      <p>+1 hunger</p>
      <p>30 Cost</p>
      <p>+1 entertainment</p>
    </div>
  )
}

export function BarStats({ percent = 100, stat }) {
  return (
    <div className="flex items-center justify-center">
      <p>{stat} &nbsp;</p><progress className="progress progress-primary w-56" value={percent} max="100"></progress>
    </div>
  )
}
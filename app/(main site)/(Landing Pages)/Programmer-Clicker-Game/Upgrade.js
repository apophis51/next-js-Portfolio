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


export function UpgradeCollection2({ collection, functionHandler, upgradeText }) {
  return (
    <div className='border-4'>
      <p className='m-5'>{upgradeText}</p>
      <div className='flex items-center justify-center gap-4 flex-wrap'>
        {collection.map((obj) => {
          const keys = Object.keys(obj);
          const restOfKeys = keys.slice(2); // Skip the first two keys
          console.log(obj)
          const newObj = {};
          restOfKeys.forEach((key) => {
            newObj[key] = obj[key];
          });

          return (
            <div key={obj.Name} className=''>
              <div>
                <p>{obj.Name}</p>
                <div className='flex items-center justify-center' onClick={() => functionHandler({ ...obj })}>
                  <Image src={`/clickerGame/${obj.Image}.jpg`}
                    width={100}
                    height={100}

                  />
                </div>
                {/* Render the values from the modified object */}
                {Object.entries(newObj).map(([key, value]) => (
                  <div>
                    {key == 'Name' || key == 'Job' && <p>{value}</p>}
                    {key != 'Name' && value > 0 && <p key={key}>+ {value} {key}</p>}
                    {key != 'Name' && value <= 0 && <p key={key}>{value} {key}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </div>)
}

export function UpgradeCollection3({ collection, functionHandler, upgradeText, gameStat, conditional}) {

  let conditionalGuard = eval(conditional)
  return (
    <div>
      {conditionalGuard && (
        <div className='border-4'>
          <p className='m-5'>{upgradeText}</p>
          <div className='flex items-center justify-center gap-4 flex-wrap'>
            {collection.map((obj) => {
              const keys = Object.keys(obj);
              const restOfKeys = keys.slice(2); // Skip the first two keys
              console.log(obj)
              const newObj = {};
              restOfKeys.forEach((key) => {
                newObj[key] = obj[key];
              });

              return (
                <div key={obj.Name} className=''>
                  <div>
                    <p>{obj.Name}</p>
                    <div className='flex items-center justify-center' onClick={() => functionHandler({ ...obj })}>
                      <Image src={`/clickerGame/${obj.Image}.jpg`}
                        width={100}
                        height={100}

                      />
                    </div>
                    {/* Render the values from the modified object */}
                    {Object.entries(newObj).map(([key, value]) => (
                      <div>
                        {key == 'Name' || key == 'Job' && <p>{value}</p>}
                        {key != 'Name' && value > 0 && <p key={key}>+ {value} {key}</p>}
                        {key != 'Name' && value <= 0 && <p key={key}>{value} {key}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>
        </div>)
      }
    </div>)
}

export function BarStats({ percent = 100, stat }) {
  return (
    <div className="flex items-center justify-center">
      <p>{stat} &nbsp;</p><progress className="progress progress-primary w-56" value={percent} max="100"></progress>
    </div>
  )
}
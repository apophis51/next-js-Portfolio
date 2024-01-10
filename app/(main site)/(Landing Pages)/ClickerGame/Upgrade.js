'use client'

import Image from 'next/image'


export function UpgradeCollection({functionHandler,collection}) {
  return(
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


export function Upgrade({ upgrade, functionHandler }) {
  return (
    <div>
      <Image src={`/clickerGame/${upgrade}.jpg`}
        width={100}
        height={100}
        onClick={() => functionHandler(upgrade)}
      />
      <p>{upgrade}</p>
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
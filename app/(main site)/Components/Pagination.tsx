'use client'




export default function Pagination() {
  return (
    <div className='flex flex-wrap justify-evenly p-9'>
      <div className="join">
      <button className="join-item btn btn-lg">«</button>
        <button className="join-item btn btn-lg">1</button>
        <button className="join-item btn btn-lg btn-active">2</button>
        <button className="join-item btn btn-lg">3</button>
        <button className="join-item btn btn-lg">4</button>
        <button className="join-item btn btn-lg">»</button>
      </div>
    </div>
  )
}
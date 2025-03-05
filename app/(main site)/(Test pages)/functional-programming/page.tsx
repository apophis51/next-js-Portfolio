import React from 'react'
import {answer} from '@/app/(main site)/(Test pages)/functional-programming/pipe-and-flow'

console.log(answer)

let user = {name: "bart", address:"chicago"}
function page() {
  return (
    <div className='bg-white'>
    <div className= "bg-white text-black">Functional Programming Launch Page</div>
    {user && <p>{user.address?.city ?? "no address and city given"}</p>}
    {/* in optional chaining if the user.address is undefined javascript does not attempt to acess */}
    </div>
  )
}


export default page

//deprecated because we found out the serverAction actually doesnt leak data afterall

import { NextResponse } from 'next/server'
import projectURLS from '@/projectSettings'




export async function GET() {


  
    console.log('about to fetch serverBlogs')
    const res = await fetch(projectURLS().pythonMongoDBServer)
    const data = await res.json()
// const data = res   
  return NextResponse.json(
    data
  )
}

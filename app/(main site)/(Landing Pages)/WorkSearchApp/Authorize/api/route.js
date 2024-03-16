

import { NextResponse } from 'next/server'
// import { updateApplied } from '../page'
import { headers } from 'next/headers'


export async function OPTIONS(){
    return NextResponse.json(
        { 
            data: {
                information: 'fuck yeah nigga'
            }
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, X-Requested-With",
            "Access-Control-Allow-Origin": "*",
            "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;"
          },
        })
}


export async function GET(data) {
  const { auth, currentUser } = await import('@clerk/nextjs')
  console.log(auth())
  // console.log(auth().sessionClaims.jti)
    // return NextResponse.json("GET")
    console.log('route hit')
    console.log(headers().get('Authorization'))
    console.log(data.headers)
    console.log(data.headers.Symbol)
    return NextResponse.json(
        { 
            data: {
                information: 'fuck yeah nigga'
            }
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;"
          },
        })
    }

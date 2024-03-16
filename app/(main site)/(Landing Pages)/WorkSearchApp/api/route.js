

import { NextResponse } from 'next/server'
// import { updateApplied } from '../page'



export async function POST(data) {
    let recievedData = await data
    let RecievedDataJson = await recievedData.json()   
    console.log(RecievedDataJson)
    // await updateApplied(0, RecievedDataJson, "POST")
    return NextResponse.json(
        { 
            data: {
                information: 'Your job application has been submitted. Thank you for using WorkSearchApp.'
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
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            "Access-Control-Allow-Origin": "*",
            "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;",
            "Access-Control-Allow-Credentials": "true"
          },
        })
}


export async function GET() {
    // return NextResponse.json("GET")
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

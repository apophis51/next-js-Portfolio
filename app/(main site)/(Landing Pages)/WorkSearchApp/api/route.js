import { NextResponse } from 'next/server'
 



export async function POST(data) {
    let cool = await data
    let final = await cool.json()   
    console.log(final)
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

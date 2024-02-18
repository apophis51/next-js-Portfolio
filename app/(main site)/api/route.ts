import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import {authOptions} from './auth/[...nextauth]/route'

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    
    
    
    if(!session) {
        // return new NextResponse('Not found', {status: 404})

        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }
    
    
    // console.log('Get API', session) - Diagnostics
    return NextResponse.json({ authenticated: !!session })
}
import {  NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';


export async function POST(request) {

    try{
    await prisma.PhoneEmailUnsubscribe.upsert({
        where: {
          email: request.nextUrl.searchParams.get('email'),
        },
        update: {},
        create:{
          email: request.nextUrl.searchParams.get('email'),
          name: 'none'
        }
      });
      console.log('user added to do not call')

    }
    catch{
      console.log('there was an error')
    // console.log("**********************LOG*******************",request.nextUrl.searchParams.get('email'))
    }
    return NextResponse.json("DELETE")
  }

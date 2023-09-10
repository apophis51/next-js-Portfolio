import {  NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma';


export async function DELETE(request) {

    try{
    await prisma.PhoneEmailUnsubscribe.delete({
        where: {
          email: request.nextUrl.searchParams.get('email'),
        },
      });
      console.log('user deleted')

    }
    catch{
    // console.log("**********************LOG*******************",request.nextUrl.searchParams.get('email'))
    }
    return NextResponse.json("DELETE")
  }

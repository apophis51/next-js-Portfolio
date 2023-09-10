import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'



export async function GET(request) {
    // const prisma = new PrismaClient();

    // const newUser = await prisma.user.create({
    //     data: {
    //       name: 'Elliott',
    //       email: 'dxeljliottx@example-user.com',
    //       password: 'slkdfjsfa'
    //     },
    //   });
    // return NextResponse.json(newUser)
    return NextResponse.json('hold')
  }
  
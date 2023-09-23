import { NextResponse } from 'next/server'
import { sendMail2 } from "../../../service/newmailservice2";
import { prisma } from '@/lib/prisma';


//The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
export async function POST(request) {
    // await sendMail2();
    console.log(request)
    // const formData = await request.json()

    // const formData = await request.json()
     const formData = await request.formData()
    // const email = formData.get('email')


    // console.log(formData.get('email'))
    console.log(
        'name:', formData.get('name'),'\n', 
        'email:', formData.get('email'), '\n',
        'message:', formData.get('message')) 

    let name = formData.get('name')
    let email = formData.get('email')
    let message = formData.get('message')
    let transferemail = {
        name: name,
        email: email,
        message: message
    }
    // await sendMail2(transferemail);


    try{
        await prisma.RecievedEmails.create({
            data:{
              email: email,
              name: name,
                message: message
            }
            }
          );
          console.log('email added to recieved emails')
    
        }
        catch{
          console.log('there was an error')
        // console.log("**********************LOG*******************",request.nextUrl.searchParams.get('email'))
        }









  return NextResponse.json("EMAIL REQUEST RECIEVED")
}
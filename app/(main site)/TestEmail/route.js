import { NextResponse } from 'next/server'
import { sendMail } from "../../../service/newmailservice";
// import { sendMail } from "../../service/amazonservice";


//The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
export async function GET(req,res) {
    
  return NextResponse.json("Get")
}

//The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
export async function POST(req,res) {
    await sendMail();
    //   res.status(200).send("Success");
  return NextResponse.json("POST")
}
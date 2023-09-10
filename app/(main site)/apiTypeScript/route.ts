import { NextResponse } from 'next/server'
 


//The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
export async function GET(request: Request) {
  return NextResponse.json("Get")
}

//The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
export async function POST() {
  return NextResponse.json("POST")
}

//The PUT method replaces all current representations of the target resource with the request payload.
export async function PUT() {
  return NextResponse.json("PUT")
}

//The PATCH method applies partial modifications to a resource.
export async function PATCH() {
  return NextResponse.json("PATCH")
}

//The DELETE method deletes the specified resource.
export async function DELETE() {
  return NextResponse.json("DELETE")
}

//The HEAD method asks for a response identical to a GET request, but without the response body.
export async function HEAD() {
  return NextResponse.json("HEAD")
}

//The OPTIONS method describes the communication options for the target resource.
export async function OPTIONS() {
  return NextResponse.json("OPTIONS")
}
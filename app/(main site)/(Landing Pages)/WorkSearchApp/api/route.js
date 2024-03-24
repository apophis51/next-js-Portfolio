import { NextResponse } from 'next/server'
import { updateApplied } from '../page'
import { headers } from 'next/headers'
import * as responseUtils from './responseUtils'
import projectURLS from '@/projectSettings'


export async function POST(data) {
  const userAuth = headers().get('Authorization')
  //  console.log(data.headers)
  let authorizedEmail = null
  try {

    let userAllowed = await fetch(projectURLS().WWWuserMap)
    let userAllowedJson = await userAllowed.json()
    authorizedEmail = userAllowedJson[userAuth]

    if (userAllowedJson[userAuth]) {
      console.log(`user is allowed to send to ${authorizedEmail}`)
    }
    else {
      return NextResponse.json(
        {
          data: {
            error: 'User Login Required to Apply for Jobs. Please Login to Apply.'
          }
        },
        responseUtils.allowCors)

    }
  }
  catch { 
    return NextResponse.json(
      {
        data: {
          error: 'the UserMapping Server is Offline'
        }
      },
      responseUtils.allowCors)
  }
  let recievedData = await data
  let RecievedDataJson = await recievedData.json()


  RecievedDataJson.data.userEmail = authorizedEmail
  console.log(RecievedDataJson)
  await updateApplied(0, RecievedDataJson, "POST")
  return NextResponse.json(
    {
      data: {
        information: 'Your job application has been submitted. Thank you for using WorkSearchApp.'
      }
    },
    responseUtils.allowCors)
}

export async function OPTIONS() {
  return NextResponse.json(
    {
      data: {
        information: 'You hit the OpTions Route. Most likely as a preFlight Request'
      }
    },
    responseUtils.allowCors)
}


export async function GET() {
  return NextResponse.json(
    {
      data: {
        information: 'You hit our Get Route. This Route Does Nothing'
      }
    },
    responseUtils.allowCors)
}

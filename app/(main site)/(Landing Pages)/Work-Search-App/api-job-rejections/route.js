import { NextResponse } from 'next/server'
import { updateApplied , getJobData} from '../page'
import { headers } from 'next/headers'
import * as responseUtils from '../responseUtils'
import projectURLS from '@/projectSettings'
console.log('hit')


export async function GET(data) {
  const userAuth = headers().get('Authorization')
  //  console.log(data.headers)
  console.log(userAuth)
  let authorizedEmail = null
  let jobData = null
  try {

    let userAllowed = await fetch(projectURLS().WWWuserMap, { cache: 'no-store' })
    let userAllowedJson = await userAllowed.json()
    authorizedEmail = userAllowedJson[userAuth].email
    console.log(authorizedEmail)

    if (userAllowedJson[userAuth]) {
      console.log('hit')
      jobData = await getJobData(authorizedEmail)
      console.log(jobData)
      // let jobDataJSON = await jobData.json()
      // console.log(jobDataJSON)
    }
    else {
      return NextResponse.json(
        {
          data: {
            error: 'User Login Required to Use the App. Please Login to Apply.'
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

  return NextResponse.json(
    {
      data: {
        information: jobData
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


export async function PUT(data) {
  const userAuth = headers().get('Authorization')
  //  console.log(data.headers)
  console.log(userAuth)
  let authorizedEmail = null
  try {

    let userAllowed = await fetch(projectURLS().WWWuserMap, { cache: 'no-store' })
    let userAllowedJson = await userAllowed.json()
    authorizedEmail = userAllowedJson[userAuth]
    console.log(authorizedEmail)

    if (userAllowedJson[userAuth]) {
      console.log(`user is allowed to send to ${authorizedEmail}`)
    }
    else {
      return NextResponse.json(
        {
          data: {
            error: 'User Login Required to Use the App. Please Login to Apply.'
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
  console.log('hit promo')
  let recievedData = await data
  let RecievedDataJson = await recievedData.json()
  console.log(RecievedDataJson)
  console.log(RecievedDataJson.output)
  console.log(RecievedDataJson.UID)
  await updateApplied(RecievedDataJson.UID, RecievedDataJson.output, "PUT")
  return NextResponse.json(
    {
      data: {
        information: 'Your job application has been submitted. Thank you for using WorkSearchApp.'
      }
    },
    responseUtils.allowCors)
}



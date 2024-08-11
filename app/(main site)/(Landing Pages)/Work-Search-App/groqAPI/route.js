import { json } from 'body-parser';
import { NextResponse } from 'next/server'
import * as responseUtils from '../responseUtils'
import { headers } from 'next/headers'
import projectURLS from '@/projectSettings'
import {fetchUserAIMetaData} from '@/app/(main site)/Components/Utils/authMetaData'

const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQAPI
});
async function main(questionsToGetAnswered,authorizedEmail, authorizedClerkID) {
    fetchUserAIMetaData({deductCreditType: 'deductCredits', userId: authorizedClerkID})
    let resumeData = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/job-resumes?pagination[page]=1&pagination[pageSize]=80&filters[userEmail][$eqi]=${authorizedEmail}`)
    let resumeDataJson = await resumeData.json()
    let finalizedResumeData = resumeDataJson.data[0].attributes.Resume
    console.log(finalizedResumeData)
    const chatCompletion = await getGroqChatCompletion(questionsToGetAnswered, finalizedResumeData);
    // Print the completion returned by the LLM.
    let goodResult = chatCompletion.choices[0]?.message?.content
    console.log(chatCompletion.choices[0]?.message?.content || "");
    const deleteNewLines = goodResult.replace(/\n/g, ' ')
    const regex = /\[(.*?)\]/g;

    const matches = deleteNewLines.match(regex);
    console.log('matches:',matches)
    console.log('matches[0]:', matches[0])
    console.log('matches[1]:', matches[1])
    // let AI_Result = await JSON.parse(matches[0])
    console.info('AI Result:', matches)
    let AI_Result = await JSON.parse(matches)

    console.log('AI JSON parse result:', AI_Result)
    return AI_Result
}
async function getGroqChatCompletion(questionsToGetAnswered, finalizedResumeData) {
    try{
        let completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `This is is your instructions. I need you to take my RESUMEDATA and use it to select the best responses from the JSONDATA. If the JSONDATA lets you select your own response then use my supplied data to answer the employer  in your own words using best practices with my data provided. I want your answer to be a JSON response with one text response per question. If the JSONDATA has options, then give the best option in your response, give the option verbatim.   Your answer should mimick this format. also do not include the original options list in your response, just the response
    
                    [{"question": "{question given in JSONDATA}", "response": "{your response or the best option}"}, {object2}, {object3}, ...rest of objects]  
                    
                    RESUMEDATA: ${finalizedResumeData}
                    
                    
                    JSONDATA: ${questionsToGetAnswered}`
                }
            ],
            model: "llama3-8b-8192",
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            stop: null,
            stream: false
        })
        return completion
    }
    catch(error){
        console.log(error)
    throw new Error('chat completion failed', error)
    }
    // return groq.chat.completions.create({
    //     messages: [
    //         {
    //             role: "user",
    //             content: `This is is your instructions. I need you to take my RESUMEDATA and use it to select the best responses from the JSONDATA. If the JSONDATA lets you select your own response then use my supplied data to answer the employer  in your own words using best practices with my data provided. I want your answer to be a JSON response with one text response per question. If the JSONDATA has options, then give the best option in your response, give the option verbatim.   Your answer should mimick this format.

    //             [{"question": "{question given in JSONDATA}", "response": "{your response or the best option}"}]  
                
    //             RESUMEDATA: ${finalizedResumeData}
                
                
    //             JSONDATA: ${questionsToGetAnswered}`
    //         }
    //     ],
    //     model: "llama3-8b-8192",
    //     temperature: 0,
    //     max_tokens: 30000,
    //     top_p: 1,
    //     stop: null,
    //     stream: false
    // });
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

export async function POST(request) {
    console.log('route hit')
    const userAuth = headers().get('Authorization')
    console.log(userAuth)
    // await responseUtils.CheckIFUserIsAllowed(userAuth)
    let authorizedEmail = null
    let authorizedClerkID = null

    try {

        let userAllowed = await fetch(projectURLS().WWWuserMap, { cache: 'no-store' })
        let userAllowedJson = await userAllowed.json()
        authorizedEmail = userAllowedJson[userAuth].email
        authorizedClerkID = userAllowedJson[userAuth].clerkID
        console.log(authorizedEmail)
        console.log(authorizedClerkID)
    
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
      catch(error) { 
        console.log('catch triggered',error)
        return NextResponse.json(
          {
            data: {
              error: 'the UserMapping Server is Offline, please try again later'
            }
          },
          responseUtils.allowCors)
      }
    try{
    let questionsToGetAnswered = await request.json()
    console.log(questionsToGetAnswered)
    let questionsToGetAnsweredString = JSON.stringify(questionsToGetAnswered)
    let questions_with_invalid_characters_removed = questionsToGetAnsweredString.replace(/[^a-zA-Z0-9\s\.\,\:\'\-\"\*\[\]\{\}\(\)\+\=\?\/\&\;\!]/g, '')
    console.log(questionsToGetAnsweredString)
    console.log(questions_with_invalid_characters_removed)
    let result = await main(questionsToGetAnsweredString, authorizedEmail, authorizedClerkID)
    // let stringifyResult = JSON.stringify(result)
    return NextResponse.json(
        {
            data: {
                information: result
            }
        },
        responseUtils.allowCors)
    }
    catch(error){
        console.log(error)
        return NextResponse.json(
            {
                data: {
                    error: `Ai Service is online but we could not process your request. ${error}`
                }
            },
            responseUtils.allowCors)
    }
}

export async function GET() {
    let result = await main()
    let stringifyResult = JSON.stringify(result)
    return NextResponse.json(
        {
            data: {
                information: result
            }
        },
        responseUtils.allowCors)
}

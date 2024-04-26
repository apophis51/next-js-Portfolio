
import GoogleTableChart from './GoogleTableChart'
import Container from '@mui/material/Container';
import WorkSearchInput from './WorkSearchInput'
import { cache } from 'react';
import Hero from '../../Components/Hero'
import {headers} from 'next/headers'
// import dynamic from 'next/dynamic'
import { JobDataUpdate, JobData, JobFetchMethods } from './workSearchTypes'

// import { clerkClient } from "@clerk/nextjs";
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
// import { revalidatePath } from 'next/cache'
// revalidatePath('/WorkSearchApp')
// Troubleshooting
// import { auth, currentUser } from '@clerk/nextjs';
async function checkUser() { //we need to add a try catch block to this to prevent the internal server errror
//     console.log('route hit')
    
    console.log('route hit')
    const { auth, currentUser } = await import('@clerk/nextjs')
    //  const { userId, getToken, orgRole } = auth();
    console.log('route hit')
    console.log(auth().sessionClaims?.primaryEmail)
    let userEmail = await currentUser()
    if (userEmail){
    console.log(userEmail.emailAddresses[0].emailAddress)
    return userEmail.emailAddresses[0].emailAddress
    }
    else{
        return null
    }
        //   console.log(auth().sessionClaims.primaryEmail);
    // const user = await currentUser()
    // console.log(user.id)
    // console.log('page user' ,user)
    // const cooluser = await clerkClient.users.getUser(user.id)
    // console.log(cooluser)
    // await clerkClient.users.updateUserMetadata(user.id, {
    //     privateMetadata: {
    //       stripeId: "fuck"
    //     }})
    // await clerkClient.users.updateUserMetadata(user.id, {
    //         publicMetadata: {
    //           extentionToken: "dfsdfdsffucadfadfk"
    //         }})
    //         const userPrivate = await clerkClient.users.getUser(user.id)
    //         console.log(userPrivate)

    // console.log(user)
    // console.log(auth())
    // console.log(auth().sessionClaims.jti)
    // console.log(user.username)
    // console.log(user.metadata)
    // const userEmail = user.emailAddresses[0].emailAddress
    // console.log(user.emailAddresses[0].emailAddress)
    // console.log(userId)
    // console.log(orgRole)
    // return await auth().sessionClaims.primaryEmail
}
async function getAppliedJobs(userEmail: string | null = null) {
    'use server'
    console.log(userEmail)
    const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/job-searches?pagination[page]=1&pagination[pageSize]=80', { cache: 'no-store' })
    //[https://malcmind-strapi-cms-production.up.railway.app/api/job-resumes?pagination[page]=1&pagination[pageSize]=80]
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    // return res.json()
    let jobData = await res.json()
    console.log(jobData)
    const filteredJobs = jobData.data.filter((job: JobData) => {
        console.log(job.attributes.userEmail)
        console.log(job.attributes.userEmail == userEmail)
        return job.attributes.userEmail == userEmail
        
    });
    let formattedJobs = { data: [...filteredJobs] } 
    console.log(formattedJobs)

    return formattedJobs

}




//wrapper function that uses 'use server' for our update function because our serverside functions ironically cant interact with functions marked with use server
export async function updateAppliedJobs(UID: number , jobApplicationDataState: JobDataUpdate, Method: JobFetchMethods) {
    'use server'
    console.log(UID, jobApplicationDataState, Method)
    let result = await updateApplied(UID, jobApplicationDataState, Method)
    return result
}

export async function updateApplied(UID: number, jobApplicationDataState: JobDataUpdate, Method: JobFetchMethods) {
    
    console.log(UID)
    console.log(jobApplicationDataState)
    console.log('route hit')
    let response: Response
    try {
        console.log('route hit')
        console.log(process.env.Strappi_SuperAccess)
        const headers = new Headers({
            'Authorization': `Bearer ${process.env.Strappi_SuperAccess}`,
            'Content-Type': 'application/json', // Adjust this based on your API requirements,
        });
        if (Method == 'DELETE') {
            response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/job-searches/${UID}`, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(jobApplicationDataState),
                cache: 'no-store',
            })
            if (!response.ok) {
                console.log(response.status)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseJson = await response.json()
            console.log(responseJson)
            return responseJson
        }
        if (Method == 'POST') {
            response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/job-searches`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(jobApplicationDataState),
                cache: 'no-store',
            })
            if (!response.ok) {
                console.log(response.status)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseJson = await response.json()
            console.log(responseJson)
            
            return responseJson
        }
        if (Method == 'PUT') {
            response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/job-searches/${UID}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(jobApplicationDataState),
                cache: 'no-store',
            })
            if (!response.ok) {
                console.log(response.status)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseJson = await response.json()
            console.log(responseJson)
            return responseJson
        }
    
       
    }
    catch (error) {
        console.log(error)
        console.error('Error:', error);
    }
}





export default async function WorkSearchApp() {
    let userEmail = await checkUser()
    console.log(userEmail)
    let  jobApplicationData = await getAppliedJobs(userEmail)
    console.log(jobApplicationData)
    //test
    async function jobApplicationDat() {
        'use server'
        return await getAppliedJobs(userEmail)
    }

    //end test
    return (
        <Container maxWidth="xl">
            <Hero contentNeeded={"MalcMind Work Search"} />

            <div className='bg-white prose-2xl p-10 '>
                <h1>MalcMind Work Search App</h1>
                <WorkSearchInput updateAppliedJobs={updateAppliedJobs} />
                
                <div className='flex flex-col justify-center items-center'>
                    <h2>My Job Applications</h2>
                    <GoogleTableChart jobApplicationDat={jobApplicationDat} />
                </div>
            </div>
        </Container>
    )
}
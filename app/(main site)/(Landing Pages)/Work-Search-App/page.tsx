
import JobSpreadSheet from './JobSpreadSheet'
import Container from '@mui/material/Container';
import WorkSearchInput from '@/app/(main site)/(Landing Pages)/Work-Search-App/WorkSearchInput'
import Hero from '@/app/(main site)/Components/Hero'
import { JobDataUpdate, JobData, JobFetchMethods } from './workSearchTypes'
import {Section} from '@/app/(main site)/Components/Section'
import ContactForm from '@/app/(main site)/Components/ContactForm'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
console.log(process.env.Strappi_SuperAccess)

async function checkUser() { //we need to add a try catch block to this to prevent the internal server errror
    //     console.log('route hit')

    console.log('route hit') 
    const { auth, currentUser } = await import('@clerk/nextjs')
    //  const { userId, getToken, orgRole } = auth();
    console.log('route hit')
    console.log(auth().sessionClaims?.primaryEmail)
    const {sessionClaims, userId} = auth()
    console.log(userId)
    console.log(sessionClaims)

    let userEmail = await currentUser()
    if (userEmail) {
        console.log(userEmail.emailAddresses[0].emailAddress)
        return userEmail.emailAddresses[0].emailAddress
    }
    else {
        return null
    }
    
}


export async function getJobData(userEmail: string | null = null, contentType: string | null = null) {
    // 'use server'  - consider reading this
    console.log(userEmail)
    let res = null
    if (contentType == null) {
        res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/job-searches?pagination[page]=1&pagination[pageSize]=8000', { cache: 'no-store' })
    }
    else if (contentType == 'job-resumes') {
        res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/job-resumes?pagination[page]=1&pagination[pageSize]=80', { cache: 'no-store' })
    }
    if (!res!.ok) {
        throw new Error('Failed to fetch data')
    }
    // return res.json()
    let personalJobData = await res!.json()
    console.log(personalJobData)
    const filteredJobs = personalJobData.data.filter((job: JobData) => {

        return job.attributes.userEmail == userEmail

    });
    let formatedJobData = { data: [...filteredJobs] }
    console.log(formatedJobData)

    return formatedJobData

}




//wrapper function that uses 'use server' for our update function because our serverside functions ironically cant interact with functions marked with use server
export async function updateAppliedJobs(UID: number, jobApplicationDataState: JobDataUpdate, Method: JobFetchMethods,contentType: string | null = null) {
    'use server'
    console.log('hit by a smooth criminal', contentType)
    // console.log(UID, jobApplicationDataState, Method)
    let result = await updateApplied(UID, jobApplicationDataState, Method, contentType)
    console.log(result)
    return result
}

export async function updateApplied(UID: number, jobApplicationDataState: JobDataUpdate, Method: JobFetchMethods, contentType: string | null = null) {

    let seedURL = null
    if(contentType == null) seedURL ='job-searches'
    if(contentType == 'job-resumes') seedURL ='job-resumes'
    console.log(seedURL) 
    console.log(UID)
    console.log(contentType)
    console.log(jobApplicationDataState)
    let response: Response
    try {
        console.log(process.env.Strappi_SuperAccess)
        const headers = new Headers({
            'Authorization': `Bearer ${process.env.Strappi_SuperAccess}`,
            'Content-Type': 'application/json', // Adjust this based on your API requirements,
        });
        if (Method == 'DELETE') {
            response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/${seedURL}/${UID}`, {
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
            console.log('route hit')
            console.log(jobApplicationDataState)
            response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/${seedURL}`, {
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
            console.log(jobApplicationDataState)
            response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/${seedURL}/${UID}`, {
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


    async function jobApplicationFetch() {
        'use server'
        return await getJobData(userEmail)
    }

    async function jobResumeFetch() {
        'use server'
        return await getJobData(userEmail, 'job-resumes')
    }



    return (
        <Container maxWidth="xl">
            <Hero contentNeeded={"MalcMind Work Search"} />
            <div className=' prose-2xl p-10 bg-gradient-to-tr from from-purple-800 to-green-800  overflow-y-hidden overflow-x-hidden mt-5 shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)]'>
            {!userEmail && 
            <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! You need to Be Loggedin to access this feature.</span>
          </div>
            }
            {userEmail && <>
                <h1 className='text-center text-white'>MalcMind Work Search App</h1>
                <WorkSearchInput updateAppliedJobs={updateAppliedJobs} />

                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-white'>My Job Applications</h2>
                    <JobSpreadSheet jobResumeFetch={jobResumeFetch}  jobDataFetch={jobApplicationFetch} userEmail={userEmail} />
                </div></>}
            </div>
            <Section content={'WorkSearchApp'} sectionTitle='Work Search App Articles'/> 
            <ContactForm/>
        </Container>
    )
}
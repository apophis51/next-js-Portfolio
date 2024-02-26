
import GoogleTableChart from './GoogleTableChart'
import Container from '@mui/material/Container';
import WorkSearchInput from './WorkSearchInput'
import { cache } from 'react';
import Hero from '../../Components/Hero'


async function getAppliedJobs() {
    const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/job-searches?pagination[page]=1&pagination[pageSize]=60', { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}


async function updateAppliedJobs(UID, jobApplicationDataState) {
    'use server'
    console.log(UID)
    console.log(jobApplicationDataState)
    console.log('route hit')
    try {
        console.log('route hit')
        console.log(process.env.Strappi_SuperAccess)
        const headers = new Headers({
            'Authorization': `Bearer ${process.env.Strappi_SuperAccess}`,
            'Content-Type': 'application/json', // Adjust this based on your API requirements,
        });
        const response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/job-searches/${UID}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(jobApplicationDataState),
            cache: 'no-store',
        })
        if (!response.ok) {
            console.log(response.status)
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
    catch (error) {
        console.log(error)
        console.error('Error:', error);
    }
}

async function createNewJobApplication() {
    const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/job-searches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Company": "Google",
            "Applied_Date": "2022-01-01",
            "Job_Posting_URL": "https://www.google.com"
        })
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}


export default async function WorkSearchApp() {
    const jobApplicationData = await getAppliedJobs()
    return (
        <Container maxWidth="xl">
            <Hero contentNeeded={"MalcMind Work Search"} />

            <div className='bg-white prose-2xl p-10 '>
                <h1>MalcMind Work Search App</h1>
                <WorkSearchInput updateAppliedJobs={updateAppliedJobs} jobApplicationData={jobApplicationData} />
                <div className='flex flex-col justify-center items-center'>
                    <h2>My Job Applications</h2>
                    <GoogleTableChart jobApplicationData={jobApplicationData} />
                </div>
            </div>
        </Container>
    )
}

import GoogleTableChart from './GoogleTableChart'
import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'



async function getAppliedJobs() {
    const res = await fetch('https://malcmind-strapi-cms-production.up.railway.app/api/job-searches?pagination[page]=1&pagination[pageSize]=60')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
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
            <Hero contentNeeded = {"MalcMind Work Search"}/>
            <div className='bg-white prose-2xl p-10 '>
                
                    <h1>MalcMind Work Search</h1>
                    <p>Never Fill Out another Job Application</p>
                    <p>MalcMind Work Search lets you Automate and Organize Your Job Searches.</p>
                    <p>We Use Data Taken From your Resume and application Questions to Automatically Respond to Job postings with your credentals and </p>
                    <div className='flex flex-col justify-center items-center'>
                        <h2>My Job Applications</h2>
                    <GoogleTableChart jobApplicationData={jobApplicationData} />
                    </div>
                </div>
        </Container>
    )
}
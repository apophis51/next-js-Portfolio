'use client'


import React, { useState } from 'react';
import { atom, useAtom } from 'jotai'
import { UIDAtom, jobApplicationDataAtom, jobNameAtom, jobDescriptionAtom, JobApplicationsSent, userEmailAtom, jobRejectionAtom, jobResumeAtom, UIDResumeAtom } from './Atoms'
//  import RichTextEditor from './RichTextEditor.js'
import CKEditor from './CKEditor'
import RichTextEditor from './RichTextEditor.js';
import { UpdateCallBack, JobDataUpdate, RawJobData, JobFetchMethods } from './workSearchTypes'
//import RichTextEditor from '@/app/(email project)/RichTextEditor.js'
import { fetchUserAIMetaData } from '@/app/(main site)/Components/Utils/authMetaData'


const InputComponent = ({ updateAppliedJobs }: UpdateCallBack) => {
  const [UID, setUID] = useAtom(UIDAtom);
  const [UIDResume, setUIDResume] = useAtom(UIDResumeAtom)
  const [jobApplicationDataState, setJobApplicationData] = useAtom(jobApplicationDataAtom);
  const [jobName, setJobName] = useAtom(jobNameAtom);
  const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom);
  const [jobApplicationsSent, setJobApplicationsSent] = useAtom(JobApplicationsSent)
  const [userEmailAtomState, setUserEmailAtom] = useAtom(userEmailAtom)
  const [jobRejection, setJobRejection] = useAtom(jobRejectionAtom)
  const [jobResume, setJobResume] = useAtom(jobResumeAtom)
  const[AiCredits, setAiCredits] = useState<string | number>('loading...')

  console.log(jobResume)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmailAtom(event.target.value);
  };


  /**
   * this function also handles the resume submission
   */
  async function handleSubmitJob(Method: JobFetchMethods = "PUT") {
    console.log(jobApplicationDataState)
    let returnResume = { data: { Resume: jobResume, userEmail: userEmailAtomState } }

    setJobApplicationData(prevState => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        Company: jobName, userEmail: userEmailAtomState
      },
    }));
    let transportObject = { data: jobApplicationDataState.attributes }
    console.log(jobApplicationDataState)
    console.log(transportObject)
    console.log(jobDescription)
    transportObject = { data: { Company: jobName, Job_Description: jobDescription, userEmail: userEmailAtomState, Rejection_Message: jobRejection } }
    console.log(returnResume)
    console.log(UID)
    console.log(UIDResume)
    if (UID != 1000) {
      let updateProcessing = await updateAppliedJobs(UID, transportObject, Method, null)
      console.log(updateProcessing)
    }
    if (UIDResume == 1000) {
      await updateAppliedJobs(UIDResume, returnResume, 'POST', 'job-resumes')
    }
    if (Method == "PUT") {
      await updateAppliedJobs(UIDResume, returnResume, Method, 'job-resumes')
    }
    console.log(returnResume)

    setJobApplicationsSent((prev) => prev + 1)
  }

  useState(async () => {
    let metaAIData = (await fetchUserAIMetaData())
    setAiCredits(metaAIData)
  })

  return (
    <div >
      <div className='flex flex-col justify-center items-center mb-10'>
        <button className='btn mb-3'>AI Credits Remaining: {AiCredits}</button>
        <button className ='btn bg-green-300'>Buy More (comming soon)</button>
      </div>
      <CKEditor />
      <br></br>
      {/* <RichTextEditor /> */}
      <div className='border border-solid border-black flex gap-5 bg-white'>
        <label htmlFor="myInput">Company: </label>
        <input
          type="text"
          id="myInput"
          value={jobName}
          onChange={handleInputChange}
        />
        <label htmlFor="myInput">Email: </label>
        <input
          type="text"
          id="myInput"
          value={userEmailAtomState}
          onChange={handleEmailChange}
        />
        <button
          className='btn'
          onClick={() => { handleSubmitJob() }}
        >Submit</button>
        <button
          className='btn'
          onClick={() => {
            handleSubmitJob('POST')
          }}
        >Create New Listing</button>
        <button
          className='btn'
          onClick={() => {
            handleSubmitJob("DELETE")
          }}
        >Delete Listing</button>
      </div>
      <p>Typed Value: {jobName}</p>
    </div>
  );
};

export default InputComponent;

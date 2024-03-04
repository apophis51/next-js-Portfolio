'use client'


import React, { useState } from 'react';
import { atom, useAtom } from 'jotai'
import { UIDAtom, jobApplicationDataAtom, jobNameAtom, jobDescriptionAtom, JobApplicationsSent} from './Atoms.js'
//  import RichTextEditor from './RichTextEditor.js'
 import CKEditor from './CKEditor.js'
import RichTextEditor from './RichTextEditor.js';
//import RichTextEditor from '@/app/(email project)/RichTextEditor.js'



const InputComponent = ({updateAppliedJobs, jobApplicationData}) => {
  const [inputValue, setInputValue] = useState('cool');
  const [UID, setUID] = useAtom(UIDAtom);
  const [jobApplicationDataState, setJobApplicationData] = useAtom(jobApplicationDataAtom);
  const [jobName, setJobName] = useAtom(jobNameAtom);
  const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom);
  const [jobApplicationsSent, setJobApplicationsSent] = useAtom(JobApplicationsSent)

  const handleInputChange = (event) => {
    setJobName(event.target.value);
  };

  function handleSubmitJob(Method = 'PUT') {
    console.log(jobApplicationData)
    console.log(jobApplicationDataState)
    setJobApplicationData(prevState => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        Company: jobName,
      },
    }));
   let transportObject = { data: jobApplicationDataState.attributes }
    console.log(jobApplicationDataState)
    console.log(transportObject)
    console.log(jobDescription)
    transportObject = {data: {Company: jobName, Job_Description: jobDescription }}
  //   transportObject = {
  //     "data": {
  
  //             "Company": "teedfjskkkllkt"
          
  //     },
  // }
     updateAppliedJobs(UID, transportObject,Method)
     setJobApplicationsSent((prev) => prev + 1)
  }

  return (
    <div >
      <CKEditor />
      {/* <RichTextEditor /> */}
      <div className='border border-solid border-black flex gap-5'>
        <label htmlFor="myInput">Company: </label>
        <input
          type="text"
          id="myInput"
          value={jobName}
          onChange={handleInputChange}
        /><button
          className='btn'
          onClick={() =>{handleSubmitJob()}}
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

'use client'


import React, { useState } from 'react';
import { atom, useAtom } from 'jotai'
import { UIDAtom, jobApplicationDataAtom, jobNameAtom } from './Atoms.js'




const InputComponent = ({updateAppliedJobs, jobApplicationData}) => {
  const [inputValue, setInputValue] = useState('cool');
  const [UID, setUID] = useAtom(UIDAtom);
  const [jobApplicationDataState, setJobApplicationData] = useAtom(jobApplicationDataAtom);
  const [jobName, setJobName] = useAtom(jobNameAtom);

  const handleInputChange = (event) => {
    setJobName(event.target.value);
  };

  function handleSubmitJob() {
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
    transportObject = {data: {Company: jobName}}
  //   transportObject = {
  //     "data": {
  
  //             "Company": "teedfjskkkllkt"
          
  //     },
  // }
     updateAppliedJobs(UID, transportObject)

  }

  return (
    <div >
      <div className='border border-solid border-black'>
        <label htmlFor="myInput">Company: </label>
        <input
          type="text"
          id="myInput"
          value={jobName}
          onChange={handleInputChange}
        /><button
          className='btn'
          onClick={handleSubmitJob}
        >Submit</button>
      </div>
      <p>Typed Value: {jobName}</p>
    </div>
  );
};

export default InputComponent;

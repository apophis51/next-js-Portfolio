//Refrence this for updates:
//https://www.react-google-charts.com/examples/table
"use client"

import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { atom, useAtom } from 'jotai'
import { UIDAtom, jobApplicationDataAtom, jobNameAtom, jobDescriptionAtom, JobApplicationsSent } from './Atoms.js'
let jobApplicationData = {}

export default function GoogleCryptoChart({ jobApplicationDat}) {
  const [UID, setUID] = useAtom(UIDAtom);
  const [jobApplicationDataState, setJobApplicationData] = useAtom(jobApplicationDataAtom);
  const [jobName, setJobName] = useAtom(jobNameAtom);
  const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom);
  const [jobApplicationsSent, setJobApplicationsSent] = useAtom(JobApplicationsSent)
  const [chartInfo, setChartInfo] = useState({})//
  const [dummyJob, setDummyJob] = useState('dummy')
// let jobApplicationData = jobApplicationDat()

console.log(jobApplicationData)


  const handleButtonClick = (jobToChange, UID) => {
    console.log(jobApplicationData)
    jobApplicationData.data.filter((item) => {
      if (item.id === UID) {
        console.log('found', item)
        setJobApplicationData({ ...item })
        setJobDescription(item.attributes.Job_Description)
      }
    })
    setUID(UID)
    setJobName(jobToChange)
    console.log('Updating', jobToChange, UID)
  };


  function generateChartData() {
    ///test
    jobApplicationData.data.filter((item) => {
      if (item.id === 2) {
        console.log('found', item)
    }
  })
  //end test
    console.log(jobApplicationData.data[0])
    let displayData = []
    jobApplicationData.data.forEach((item) => {
      displayData.push(['<button class="btn"}>update</button>', item.attributes.Company, item.attributes.Applied_Date, item.attributes.Job_Posting_URL, item.id])
    })
    let chartData = [
      ['Action', 'Company', 'Applied Date', 'url', 'UID'],
      ...displayData,
    ];
    const chartOptions = {
      allowHtml: true,
      showRowNumber: true,
    };
    setChartInfo({ chartData, chartOptions })
  }



 
  // generateChartData(jobApplicationData)
console.log('rendered')
  useEffect(() => {

    const delay = 2000; // 2 seconds in milliseconds

    const timerId = setTimeout(() => {
      // Your code to run after the delay
      console.log('Delayed useEffect executed after 2 seconds');
    }, delay);

 

    async function fetchData(){
      jobApplicationData = await jobApplicationDat()
      console.log(jobApplicationData) 
      generateChartData(jobApplicationData)

    }
    fetchData()
       // Clean up the timer when the component unmounts or when the dependencies change
       return () => clearTimeout(timerId);

    // generateChartData(jobApplicationData)
  }, [jobApplicationsSent]);

  
  return (
    <div className='max-w-5xl'>
    <p>{dummyJob}</p>
      <Chart
        chartType="Table"
        // width="90%"
        width='100%'
        height="400px"
        data={chartInfo.chartData}
        options={chartInfo.chartOptions}
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length > 0) {
                const clickedRow = selection[0].row + 1;
                console.log(clickedRow)
                console.log(selection)
                // console.log(event.target.cellIndex)
                const realJobToChange = event.target.parentNode.cells[2].textContent
                console.log(realJobToChange)
                setDummyJob((prev) => (chartInfo.chartData[clickedRow][1]))
                console.log(dummyJob)
                const jobToChange = chartInfo.chartData[clickedRow][1]
                // console.log(jobToChange)
                const UID = chartInfo.chartData[clickedRow][4]
                const realUID = event.target.parentNode.cells[5].textContent
                console.log(realUID)
                if (clickedRow !== null && clickedRow !== undefined) {
                  handleButtonClick(jobToChange, UID);
                  // handleButtonClick(realJobToChange, realUID);

                }
              }
            },
          },
        ]}
      />
    </div>
  );
};


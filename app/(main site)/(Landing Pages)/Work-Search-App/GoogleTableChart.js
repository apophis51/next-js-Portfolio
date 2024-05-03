//Refrence this for updates:
//https://www.react-google-charts.com/examples/table
"use client"
import projectSettings from '@/projectSettings.js'
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { atom, useAtom, useSetAtom } from 'jotai'
import { UIDAtom, jobApplicationDataAtom, jobNameAtom, jobDescriptionAtom, JobApplicationsSent, userEmailAtom, jobRejectionAtom, jobResumeAtom, UIDResumeAtom } from './Atoms'
let jobApplicationData = {}
let jobResumeData = {}

export default function GoogleCryptoChart({ jobDataFetch, jobResumeFetch, userEmail }) {
  const [focusOnRow, setFocusOnRow] = useState(null)
  const setUID = useSetAtom(UIDAtom);
  const setUIDResume = useSetAtom(UIDResumeAtom);
  const setJobApplicationData = useSetAtom(jobApplicationDataAtom);
  const setJobName = useSetAtom(jobNameAtom);
  const setJobDescription = useSetAtom(jobDescriptionAtom);
  const [jobApplicationsSent, setJobApplicationsSent] = useAtom(JobApplicationsSent)
  const [chartInfo, setChartInfo] = useState({})//
  const [webSocketData, setWebSocketData] = useState(null);
  const setUserEmailAtom = useSetAtom(userEmailAtom)
  const setJobRejection = useSetAtom(jobRejectionAtom)
  const setJobResumeData = useSetAtom(jobResumeAtom)

  console.log(jobApplicationData)
  console.log(jobResumeData)
  setUserEmailAtom(userEmail)


  const handleButtonClick = (jobToChange, UID) => {
    console.log(jobApplicationData)
    jobApplicationData.data.filter((item) => {
      if (item.id === UID) {
        console.log('found', item)
        setJobApplicationData({ ...item })
        setJobDescription(item.attributes.Job_Description)
        setUserEmailAtom(item.attributes.userEmail)
        setJobRejection(item.attributes.Rejection_Message)
      }
    })
    setUID(UID)
    setJobName(jobToChange)
    console.log('Updating', jobToChange, UID)

  };


  function generateChartData() {
    ///test
    //   jobApplicationData.data.filter((item) => {
    //     if (item.id === 2) {
    //       console.log('found', item)
    //   }
    // })
    //end test
    console.log(jobApplicationData.data[0])
    let displayData = []
    jobApplicationData.data.forEach((item) => {
      displayData.push(['<button class="btn"}>update</button>', item.attributes.Company, item.attributes.Applied_Date, item.attributes.Job_Posting_URL, item.id, item.attributes.userEmail])
    })
    let chartData = [
      ['Action', 'Company', 'Applied Date', 'url', 'UID', 'userEmail'],
      ...displayData,
    ];
    const chartOptions = {
      allowHtml: true,
      showRowNumber: true,
    };
    setChartInfo({ chartData, chartOptions })
  }


  console.log(webSocketData)

  // generateChartData(jobApplicationData)
  console.log('rendered')
  useEffect(() => {

    // const delay = 2000; // 2 seconds in milliseconds

    // const timerId = setTimeout(() => {
    //   // Your code to run after the delay
    //   console.log('Delayed useEffect executed after 2 seconds');
    // }, delay);
    // const ws = new WebSocket('ws://localhost:3001');
    // const ws = new WebSocket('ws://localhost:3532');
    const ws = new WebSocket(projectSettings().GoogleTableChartSocket);


    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    ws.addEventListener('message', (event) => {
      console.log('WebSocket message received:', event);
      const message = JSON.parse(event.data);
      fetchData()
    });


    // Handle incoming messages
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setWebSocketData(newData);
    };

    async function fetchData() {
      try {
        jobApplicationData = await jobDataFetch()
      }
      catch {
        ///this catch block doesnt work need to fix
        jobApplicationData = {
          data: [{
            id: 5000,
            attributes: {
              Company: "Sample Company",
              Job_Posting_URL: 'sample Url.com',
              Job_Description: 'Start adding jobs with our chrome extentoin',
              Rejection_Message: 'follow up with the rejection messages here',
              Job_Title: 'This Is a Sample Job Application',
              userEmail: userEmail,
            }
          }]
        }
      }
      console.log('jobApplicationData has been fetched and set', jobApplicationData)
      jobResumeData = await jobResumeFetch()
      try {
        setJobResumeData(jobResumeData.data[0].attributes.Resume)
        setUIDResume(jobResumeData.data[0].id)
      }
      catch (error) {
        setJobResumeData('Paste Your Resume Here')
        setUIDResume(1000)
      }


      console.log(jobApplicationData)
      console.log(jobResumeData)
      generateChartData(jobApplicationData)

    }
    fetchData()
    // Clean up the timer when the component unmounts or when the dependencies change
    //  return () => clearTimeout(timerId);
    return () => {
      ws.close();
    };

    // generateChartData(jobApplicationData)
  }, [jobApplicationsSent]);
  console.log('rendered')
  console.log(chartInfo)
  return (
    <div className='max-w-full'>
      {chartInfo.chartData == undefined && <div className="flex justify-center items-center">
        <p className='text-2xl text-white'>Loading</p>
        <span className="loading loading-dots loading-lg text-white"></span>
      </div>}
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
                // setDummyJob((prev) => (chartInfo.chartData[clickedRow][1]))
                //  const jobToChange = chartInfo.chartData[clickedRow][1]
                //    console.log(jobToChange)

                // console.log(jobToChange)
                // const UID = chartInfo.chartData[clickedRow][4]
                const realUID = parseInt(event.target.parentNode.cells[5].textContent)
                console.log(typeof realUID)
                console.log(parseInt(realUID))
                if (clickedRow !== null && clickedRow !== undefined) {
                  // handleButtonClick(jobToChange, UID);
                  handleButtonClick(realJobToChange, realUID);

                }
              }
            },
          },
        ]}
      />
    </div>
  );
};


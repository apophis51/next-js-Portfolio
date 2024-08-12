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

export default function JobSpredSheet({ jobDataFetch, jobResumeFetch, userEmail }) {
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

  const [allButtonColor, setallButtonColor] = useState('bg-lime-400')
  const [recentButtonColor, setrecentButtonColor] = useState('bg-white')

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


  function generateChartData({ammountofData = 'all'}) {
    
      
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    
    // Generate the regex pattern based on the current date
    const datePattern = new RegExp(`^\\d{4}-${currentMonth}-${currentDay}$`);
    

    console.log(jobApplicationData.data[0])
    let displayData = []
    if(ammountofData === 'all'){
      setallButtonColor('bg-lime-400')
      setrecentButtonColor('bg-white')
    jobApplicationData.data.forEach((item) => {
      displayData.push(['<button class="btn"}>update</button>', item.attributes.Company, item.attributes.Applied_Date, item.attributes.Job_Posting_URL, item.id, item.attributes.userEmail])
    })
  }
  else{
    setallButtonColor('bg-white')
    setrecentButtonColor('bg-lime-400')
    jobApplicationData.data.filter((item) => {
      if(datePattern.test(item.attributes.Applied_Date)){
        console.log('found')
      displayData.push(['<button class="btn"}>update</button>', item.attributes.Company, item.attributes.Applied_Date, item.attributes.Job_Posting_URL, item.id, item.attributes.userEmail])
      }  
    })
  }
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

  
    const ws = new WebSocket(projectSettings().GoogleTableChartSocket);


    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    ws.addEventListener('message', (event) => {
      console.log('WebSocket message received:', event);
      const message = JSON.parse(event.data);
      fetchData()
    });


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
  
    return () => {
      ws.close();
    };

  }, [jobApplicationsSent]);
  console.log('rendered')
  console.log(chartInfo)
  return (
    <div className='max-w-full'>
       <div className='flex items-center justify-center gap-5 mb-5 flex-wrap'>
        <button className={`btn ${allButtonColor} hover:bg-lime-700`} onClick={() => generateChartData({ammountofData:"all"})}>All Applications</button>
        <button className={`btn ${recentButtonColor} hover:bg-lime-700`} onClick={() => generateChartData({ammountofData:"recent"})}>Recent Applications</button>
      </div>
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
                const realJobToChange = event.target.parentNode.cells[2].textContent
                console.log(realJobToChange)
  
                const realUID = parseInt(event.target.parentNode.cells[5].textContent)
                console.log(typeof realUID)
                console.log(parseInt(realUID))
                if (clickedRow !== null && clickedRow !== undefined) {
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


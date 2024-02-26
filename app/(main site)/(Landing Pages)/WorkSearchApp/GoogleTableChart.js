//Refrence this for updates:
//https://www.react-google-charts.com/examples/table
"use client"

import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import { atom, useAtom } from 'jotai'
import { UIDAtom, jobApplicationDataAtom, jobNameAtom } from './Atoms.js'


export default function GoogleCryptoChart({ jobApplicationData }) {
  const [UID, setUID] = useAtom(UIDAtom);
  const [jobApplicationDataState, setJobApplicationData] = useAtom(jobApplicationDataAtom);
  const [jobName, setJobName] = useAtom(jobNameAtom);


  const handleButtonClick = (jobToChange, UID) => {
    jobApplicationData.data.filter((item) => { if (item.id === UID) { 
      console.log('found', item) 
      setJobApplicationData({...item})
    } })
    setUID(UID)
    setJobName(jobToChange)
    console.log('Updating', jobToChange, UID)
  };


  console.log(jobApplicationData.data[0])
  const displayData = []
  jobApplicationData.data.forEach((item) => {
    displayData.push(['<button class="btn"}>update</button>', item.attributes.Company, item.attributes.Applied_Date, item.attributes.Job_Posting_URL, item.id])
  })
  const chartData = [
    ['Action', 'Company', 'Applied Date', 'url', 'UID'],
    ...displayData,
  ];
  const chartOptions = {
    allowHtml: true,
    showRowNumber: true,
  };

  useEffect(() => {
    // Any additional setup or data processing can be done here
  }, []);

  return (
    <div className='max-w-5xl'>
      <button onClick={() => alert(123)}>cool</button>
      <Chart
        chartType="Table"
        // width="90%"
        width='100%'
        height="400px"
        data={chartData}
        options={chartOptions}
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length > 0) {
                const clickedRow = selection[0].row + 1;
                const jobToChange = chartData[clickedRow][1]
                const UID = chartData[clickedRow][4]
                if (clickedRow !== null && clickedRow !== undefined) {
                  handleButtonClick(jobToChange, UID);
                }
              }
            },
          },
        ]}
      />
    </div>
  );
};


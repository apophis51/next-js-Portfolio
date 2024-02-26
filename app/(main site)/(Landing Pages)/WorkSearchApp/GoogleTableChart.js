//Refrence this for updates:
//https://www.react-google-charts.com/examples/table
"use client"

import React, { useEffect } from 'react';
import Chart from 'react-google-charts';

export default function GoogleCryptoChart({jobApplicationData}) {
  

    console.log(jobApplicationData)

    const displayData = []
    jobApplicationData.data.forEach((item) => {
        displayData.push([item.attributes.Company,item.attributes.Applied_Date, item.attributes.Job_Posting_URL])
    })
    console.log(displayData)
  const chartData = [
    ['Company','Applied Date', 'url'],
    ...displayData,
    // [1533686400000, 6711.73242235858],
    
    // Add the rest of your data here
  ];

  // Options for the chart
  const chartOptions = {
    allowHtml: true,
  showRowNumber: true,
  };

  useEffect(() => {
    // Any additional setup or data processing can be done here
  }, []);

  return (
    <div  className='max-w-5xl'>
      <Chart
        chartType="Table"
        // width="90%"
        width='100%'
        height="400px"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};


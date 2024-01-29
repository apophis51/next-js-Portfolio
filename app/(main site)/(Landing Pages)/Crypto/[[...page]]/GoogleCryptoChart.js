"use client"

import React, { useEffect } from 'react';
import Chart from 'react-google-charts';

export default function GoogleCryptoChart({historicalData,cryptoData}) {
  // Sample data
  const chartData = [
    ['Date', 'Value'],
    ...historicalData,
    // [1533686400000, 6711.73242235858],
    
    // Add the rest of your data here
  ];

  // Options for the chart
  const chartOptions = {
    title: cryptoData.toUpperCase() + ' daily chart',
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  useEffect(() => {
    // Any additional setup or data processing can be done here
  }, []);

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};


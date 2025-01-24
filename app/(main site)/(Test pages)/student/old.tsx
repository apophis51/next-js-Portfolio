'use client';

import { Revenue } from '@/app/lib/definitions';
import React, {useRef,useEffect, useState } from "react";
import * as d3 from "d3";

type LogLinearChartClientProps = {
    revenue: Revenue[];
  };

const revenue = [
    {
        "month": "Jan",
        "revenue": 2000
    },
    {
        "month": "Feb",
        "revenue": 1800
    },
    {
        "month": "Mar",
        "revenue": 2200
    },
    {
        "month": "Apr",
        "revenue": 2500
    },
    {
        "month": "May",
        "revenue": 2300
    },
    {
        "month": "Jun",
        "revenue": 3200
    },
    {
        "month": "Jul",
        "revenue": 3500
    },
    {
        "month": "Aug",
        "revenue": 3700
    },
    {
        "month": "Sep",
        "revenue": 2500
    },
    {
        "month": "Oct",
        "revenue": 2800
    },
    {
        "month": "Nov",
        "revenue": 3000
    },
    {
        "month": "Dec",
        "revenue": 4800
    }
]


// export default function LogLinearChartClient({ revenue }: LogLinearChartClientProps) {
export default function LogLinearChartClient() {

//   const chartHeight = 350;

  const svgRef = useRef<SVGSVGElement>(null);
  const [isLogScale, setIsLogScale] = useState(true);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  useEffect(() => {
    // if (!svgRef.current) return;
    
    // const svg = d3.select(svgRef.current);
    const svg = d3.select(".cool");

    svg.selectAll("*").remove(); //added
    const width = 500;
    const height = 350;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const revenueMax = Math.max(...revenue.map((month) => month.revenue));


    // Map indices for x-axis
    const xScale = d3.scaleLinear()
      .domain([0, revenue.length - 1]) // Indices as the domain
      .range([margin.left, width - margin.right]);

    const yScale = isLogScale
      ? d3.scaleLog().domain([1, revenueMax]).range([height - margin.bottom, margin.top])
      : d3.scaleLinear().domain([0, revenueMax]).range([height - margin.bottom, margin.top]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(revenue.length).tickFormat((d) => revenue[d as number]?.month || "");
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2d"));

    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

    svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

    // svg.select(".x-axis")
    // .attr("class", "x-axis")
    //   .attr("transform", `translate(0,${height - margin.bottom})`)
    //   .call(xAxis);

    // svg.select(".y-axis")
    // .attr("class", "y-axis")
    //   .attr("transform", `translate(${margin.left},0)`)
    //   .call(yAxis);

    // Line Path
    const line = d3
      .line<Revenue>()
      .x((_, i) => xScale(i)) // Map index to x-axis
      .y((d) => yScale(d.revenue))
      .curve(d3.curveMonotoneX); // Optional: smooth line

    // Draw or update line
    // svg.select(".line")
    //   .datum(revenue)
    //.join("path")

    //   .attr("class", "line")
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 2)
    //   .transition()
    //   .duration(1000)
    //   .attr("d", line);

      svg.append("path")
      .datum(revenue)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);





  }, [isLogScale, revenue]);

  return (
    <div className='bg-white'>
      <button onClick={() => setIsLogScale(!isLogScale)}>
        Toggle Scale ({isLogScale ? "Logarithmic" : "Linear"})
      </button>
      <svg /*ref={svgRef} */ width="500" height="350"    className="cool">
        {/* <g className="x-axis" />
        <g className="y-axis" /> */}
      </svg>
    </div>
  );
}
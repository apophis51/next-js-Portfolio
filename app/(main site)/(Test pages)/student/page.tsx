'use client';

import { Revenue } from '@/app/lib/definitions';
import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const revenue = [
  { "month": "Jan", "revenue": 2000 },
  { "month": "Feb", "revenue": 1800 },
  { "month": "Mar", "revenue": 2200 },
  { "month": "Apr", "revenue": 2500 },
  { "month": "May", "revenue": 2300 },
  { "month": "Jun", "revenue": 3200 },
  { "month": "Jul", "revenue": 3500 },
  { "month": "Aug", "revenue": 3700 },
  { "month": "Sep", "revenue": 2500 },
  { "month": "Oct", "revenue": 2800 },
  { "month": "Nov", "revenue": 3000 },
  { "month": "Dec", "revenue": 4800 },
];

export default function LogLinearChartClient() {
  const [isLogScale, setIsLogScale] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = 500;
    const height = 350;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const revenueMax = Math.max(...revenue.map((month) => month.revenue));

    const xScale = d3.scaleLinear()
      .domain([0, revenue.length - 1])
      .range([margin.left, width - margin.right]);

    const yScale = isLogScale
      ? d3.scaleLog().domain([1, revenueMax]).range([height - margin.bottom, margin.top])
      : d3.scaleLinear().domain([0, revenueMax]).range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale).ticks(revenue.length).tickFormat((d) => revenue[d as number]?.month || "");
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2d"));

    // Add axes if not already present
    if (svg.select(".x-axis").empty()) {
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);
    }

    if (svg.select(".y-axis").empty()) {
      svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);
    }

    // Update the y-axis with transition
    svg.select(".y-axis")
      .transition()
      .duration(750)
      .call(yAxis);

    // Define the line
    const line = d3.line<Revenue>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d.revenue))
      .curve(d3.curveMonotoneX);

    // Add or update the line path
    const path = svg.selectAll(".line").data([revenue]);

    path
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .merge(path)
      .transition()
      .duration(750)
      .attr("d", line);

  }, [isLogScale]);

  return (
    <div className="bg-white">
      <button
        onClick={() => setIsLogScale(!isLogScale)}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Toggle Scale ({isLogScale ? "Logarithmic" : "Linear"})
      </button>
      <svg ref={svgRef} width="500" height="350" ></svg>
    </div>
  );
}

'use client'
import Image from "next/image"
import Container from '@mui/material/Container';
import Script from 'next/script';
import * as React from 'react';
import Link from 'next/link'



export default function JumboTron() {
    const [height, setheight] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
     
     
     let parrentheight = 0
      React.useEffect(() => {

      }, [])



      
    return (
        <Container maxWidth="xl"  >
        <div className="hero min-h-screen" style={{backgroundImage: 'url(howitzer.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hacker Firing Range</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
        </Container>
    )
}

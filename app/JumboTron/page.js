'use client'
import Image from "next/image"
import Container from '@mui/material/Container';
import Script from 'next/script';
import * as React from 'react';
import MouseOverPopover from "./MouseOverPopover";



export default function JumboTron() {
    const [height, setheight] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const mygranium = () => {
        try {
            var granimInstance = new Granim({
                element: '#canvas-image-blending',
                direction: 'top-bottom',
                isPausedWhenNotInView: true,
                image : {
                    source: '/plane.jpg',
                    blendingMode: 'difference',
                    stretchMode: ['stretch-if-smaller', 'stretch-if-smaller'],
                    position: ['center', 'center']

                },
                states : {
                    "default-state": {
                        gradients: [
                            ['#29323c', '#485563'],
                            ['#FF6B6B', '#556270'],
                            ['#80d3fe', '#7ea0c4'],
                            ['#f0ab51', '#eceba3']
                        ],
                        transitionSpeed: 7000
                    }
                }
            });
        }
        catch{}
    }
     
     let parrentheight = 0
      React.useEffect(() => {
        mygranium()

      }, [])



      
    return (
        <Container maxWidth="xl"  >
        <div className ="jumboparrent destinymom bg-slate-300 text-white lg:text-black  overlay">
        <Container /*maxWidth="xl"*/ >
        <div className="hero min-h-fit   pb-10 lg:pb-10" >
            <div className="hero-content flex-col lg:flex-row-reverse">
 
                <div className='ml-0 lg:ml-[140px] mt-0 lg:mt-[200px]'>
                    <Image src="/Malcolm.jpg" alt="Picture of the author"
                        width={250}
                        height={250}
                        className="max-w-sm rounded-lg shadow-2xl"/>
                          <button className="btn btn-primary"
                        onClick={() => alert("This Button does Not do anything yet, but it will soon! 😅")}
                        style={
                            {marginLeft:'35%',marginTop:20}
                    }>Hire me</button>
                </div> {/* {Malcolm Vernon Image Div} */}
                <div className="flex-col Text-Div"
                    style={
                        {textAlign: "center"}
                }>
                    <h1 className="text-5xl font-bold  bg-[rgba(0,0,0,.4)] md:bg-[rgba(0,0,0,0)] rounded-3xl pb-5">Hi I'm Malcolm! 👋</h1>
                    <img className='absolute opacity-0 right-[345px] left-[0] lg:opacity-75 lg:top-[-60px] xl:top-[-15px] ' style={{zIndex:'-1',height:520,width:'68%'}}src='/chatbubble.png'/>
                    
                    <div className=" text-xl   bg-[rgba(0,0,0,.4)] md:bg-[rgba(0,0,0,0)] rounded-3xl">

                    <p className="py-6 ">I am a full stack web developer. I made this this <span className="text-red"><MouseOverPopover/></span>using Next.js, React, and MaterialUI. You can still see my <a href = "https://malcolmvernon.info">old portfolio site</a> which is built with Flask and Python. </p><p className='opacity-100 lg:opacity-0'style={{color: "red"}}>This site Is still Under Development so Please be patient</p> <p className='opacity-100 lg:opacity-0'>I'm subscribed to the <a href = "https://jamstack.org/headless-cms/">JamStack</a> philosophy of separating back-end conserns from the front-end, so content on this site is implemented with <a href = "https://strapi.io/">Strapi Headless CMS.</a> User storage is handled with PostgreSQL using Prisma  </p>
                    </div> {/* {Text Div} */}
                    <button className="btn btn-primary opacity-100 lg:opacity-0"
                        onClick={() => alert("This Button does Not do anything yet, but it will soon! 😅")}
                        style={
                            {margin: "auto"}
                    }>Hire me</button>
                </div> {/* {Entire Text Div} */}
            </div> {/* {Entire Banner Div} */}
        </div>  {/* {Entire Banner Div Wrapper} */}
        </Container>
         <div className = 'destinychild'>
         <canvas className = '' id="canvas-image-blending"></canvas>

            <Script src="granim.min.js" 
            strategy = 'beforeInteractive'
            ></Script>
        </div> {/* {Gradient child div} */}
    {/* {Banner + Background + Return Div} */} </div>
        </Container>
    )
}


// import About from './About/page'
// import JumboTron from './JumboTron/page'

// export default function Home() {
//   return (
    
//     <main> 
//      <JumboTron/>
//      <About/>
//     </main>
//   )
// }


import Container from '@mui/material/Container';
import Hero from './Components/Hero'


const VideoBackground = () => {
  return (
    <div className="w-full h-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className=" w-full h-full object-cover"
      >
        <source src="code.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default function HomePage() {
  return (
    <a href="/About">
    <Container maxWidth="xl" >
      <div className="relative min-h-screen">
      <Hero contentNeeded={"MalcMind"} />
        <div className="absolute left-0 top-0 w-full h-full opacity-10">
          <VideoBackground />
        </div>
      </div>
    </Container>
    </a>
  )
}



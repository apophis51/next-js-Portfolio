import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'


async function getData() {
  const res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?populate=*`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

//The props.contentNeeded is the title of the blog post thats on strappi

async function Zero({contentNeeded}) {
  const HeaderContent = await getData()
  const MainText = HeaderContent.data.filter((item) => item.attributes.Title == contentNeeded)[0].attributes.Content
  const Image = HeaderContent.data.filter((item) => item.attributes.Title == contentNeeded)[0].attributes.FrontImage.data.attributes.formats.large.url
  const buttonText = HeaderContent.data.filter((item) => item.attributes.Title == contentNeeded)[0].attributes.SideInformation[0]?.Data

  return (
    <div className="hero min-h-screen">
      <video className="hero-video" autoPlay muted loop>
        <source src={'/home/apophis51/nextjs-flask/public/NavVid.mp4'} type="video/mp4" />
        {/* Add additional source elements for different video formats if needed */}
        Your browser does not support the video tag.
      </video>

      <div className="hero-overlay bg-opacity-80"></div>

      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{contentNeeded}</h1>
          <p className="mb-5">{MainText}</p>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </div>
  );
}

const VideoBackground = () => {
  return (
    <div className="video-background w-full h-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-element w-full h-full object-cover"
      >
        <source src="code.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default function HomePage() {
  return (
    <Container maxWidth="xl" >
      {/* <h1 className="bg-white">Version 1:</h1> */}
      <div className="relative">
        <Zero contentNeeded = {"MalcMind"}/>
        <div className= "absolute left-0 top-0 opacity-40 w-full h-full">
        <VideoBackground/>
        <div className= "absolute left-0 top-0 opacity-80 w-full h-full object-cover">
        <Hero contentNeeded = {"MalcMind"} />
        </div>
        </div>
        </div>
      {/* <h1 className="bg-white">Version 2:</h1> */}
      {/* <div className= "absolute left-0 top-0 opacity-60 w-full h-full object-cover">
        <Hero contentNeeded = {"MalcMind"} />
        </div> */}
    </Container>
  )
}



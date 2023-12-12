import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'


// async function getData() {
//   const res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?populate=*`)
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

// //The props.contentNeeded is the title of the blog post thats on strappi

// async function Hero({contentNeeded}) {
//   const HeaderContent = await getData()
//   console.log(HeaderContent)
//   const MainText = HeaderContent.data.filter((item) => item.attributes.Title == contentNeeded)[0].attributes.Content
//   const Image = HeaderContent.data.filter((item) => item.attributes.Title == contentNeeded)[0].attributes.FrontImage.data.attributes.formats.large.url
//   const buttonText = HeaderContent.data.filter((item) => item.attributes.Title == contentNeeded)[0].attributes.SideInformation[0]?.Data

//   return (
//       <div className="hero min-h-screen" style={{ backgroundImage: `url(${Image})` }}>
//         <div className="hero-overlay bg-opacity-80"></div>
//         <div className="hero-content text-center text-neutral-content">
//         <div className="max-w-md">
//             <h1 className="mb-5 text-5xl font-bold">{contentNeeded}</h1>
//             <p className="mb-5">{MainText} </p>
//             <button className="btn btn-primary">{buttonText}</button>
//           </div>
//         </div>
//       </div>
//   )
// }


export default function HomePage() {
  return (
    <Container maxWidth="xl"  >
        <Hero contentNeeded = {"MalcMind"}/>
    </Container>
  )
}



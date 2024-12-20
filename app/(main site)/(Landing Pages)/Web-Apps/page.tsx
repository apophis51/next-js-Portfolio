import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import {Section} from '@/app/(main site)/Components/Section'


import { ProductPage,  UniversalData} from '@/app/(main site)/Components/Types/FetchTypes'
import { projectsData } from '@/app/(main site)/Components/DataFetch'
import Link from 'next/link'
import malcStrapiAdapter from '@/app/(main site)/Components/malcStrapiAdapter';






export default async function WebApps() { 

  const getData = await projectsData({content: "WebApps"})
  console.log(getData)
  const transformedData = await malcStrapiAdapter(getData)
  console.log(transformedData)
  const sectionTitle = "Web Apps" 


  return (
    <div>
      <Container maxWidth="xl"  >
        <Hero contentNeeded={"Web Apps"} />
        {/* <Section content={'WebApps'} /> */}
        <Section getData={getData} sectionTitle={sectionTitle} />
      </Container>
    </div>
  );
}
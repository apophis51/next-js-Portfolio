import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import Link from 'next/link'
import { projectsData } from '@/app/(main site)/Components/DataFetch'
import { ProjectsDataPull } from '@/app/(main site)/Components/Typs/FetchTypes'



export default async function WebApps() {
  const getData = await projectsData()
  return (
    <div>
      <Container maxWidth="xl"  >
        <Hero contentNeeded={"Web Apps"} />
        <div className='bg-gradient-to-tr from-purple-600 to-blue-900 mt-2 flex-col flex items-center justify-center gap-5 p-6'>
          <div className='  flex flex-col gap-5'>
            {getData.map((item: ProjectsDataPull) => (
              <div className="card lg:card-side bg-base-100 shadow-xl lg:max-h-64">
                <figure className='max-w-xs min-w-fit pt-7 lg:pt-10 lg:pb-10 lg:pl-10'><img src={item.attributes.LandingPageImage.data.attributes.formats.thumbnail.url} alt="Album" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{item.attributes.Title}</h2>
                  <p>{item.attributes.headerContent}</p>
                  <div className="card-actions justify-center">
                  <Link href={item.attributes.Title}><button className="btn btn-primary"><p>Go To App</p></button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
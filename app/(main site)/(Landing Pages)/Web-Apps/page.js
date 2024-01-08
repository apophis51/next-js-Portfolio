import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import Link from 'next/link'
import ClickerGame from '@/app/(main site)/(Landing Pages)/ClickerGame/page.js';

// import ContentController from '../../Components/ContentController'



export default async function WebApps() {
  let webSiteName = '/Web-Apps'
  let landingpage = '/Web-Apps'

  return (
    <div>
      <Container maxWidth="xl"  >
        <Hero contentNeeded={"Web Apps"} />
        <div className='bg-white prose-2xl'>
          <div className='btn'>
        <Link href='/ClickerGame'>Play The Clicker Game</Link>
        </div>
        </div>
      </Container>
    </div>
  );
}
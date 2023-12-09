
import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import TerminalComponent from './TerminalComponent.js';
import { headers } from 'next/headers' // this prevents ssr because we had an error reference https://nextjs.org/docs/app/building-your-application/rendering/server-components



export default function FiringRange() {
  const headersList = headers() //prevents ssr
  const referer = headersList.get('referer')  //prevents ssr

  return (
    <Container maxWidth="xl"  >
        <Hero contentNeeded = {"Hacker Firing Range"}/>
        <TerminalComponent />
        {/* <div>Referer: {referer}</div> */}
        {/* <TerminalShell /> */}
    </Container>
  )
}




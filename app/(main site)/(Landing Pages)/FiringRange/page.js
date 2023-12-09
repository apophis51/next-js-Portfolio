
import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
// import TerminalComponent from './TerminalComponent.js';
import TerminalShell from './TerminalShell.js'

import { headers } from 'next/headers'



export default function FiringRange() {
  const headersList = headers()
  const referer = headersList.get('referer')

  return (
    <Container maxWidth="xl"  >
        <Hero contentNeeded = {"Hacker Firing Range"}/>
        <TerminalComponent />
        <div>Referer: {referer}</div>
        {/* <TerminalShell /> */}
    </Container>
  )
}




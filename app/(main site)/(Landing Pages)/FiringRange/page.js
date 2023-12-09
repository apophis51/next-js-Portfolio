
import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
// import TerminalComponent from './TerminalComponent.js';
import TerminalShell from './TerminalShell.js'


export default function FiringRange() {


  return (
    <Container maxWidth="xl"  >
        <Hero contentNeeded = {"Hacker Firing Range"}/>
        {/* <TerminalComponent /> */}
        <TerminalShell />
    </Container>
  )
}

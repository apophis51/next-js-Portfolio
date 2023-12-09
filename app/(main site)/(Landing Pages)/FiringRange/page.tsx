
import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import TerminalComponent from './TerminalComponent.js';



export default function FiringRange() {

  if (typeof window !== 'undefined') {
    return ( 
    <Container maxWidth="xl"  >
    <Hero contentNeeded = {"Hacker Firing Range"}/>
    <TerminalComponent />
</Container>)
  }
  else{
  return (
    <Container maxWidth="xl"  >
        <Hero contentNeeded = {"Hacker Firing Range"}/>
        <TerminalComponent />
    </Container>
  )
  }
}

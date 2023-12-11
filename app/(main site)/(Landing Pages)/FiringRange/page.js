
import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('./App.js'), { ssr: false })



export default function FiringRange() {

  return (
    <Container maxWidth="xl"  >
        <Hero contentNeeded = {"Hacker Firing Range"}/>
        <App />
    </Container>
  )
}



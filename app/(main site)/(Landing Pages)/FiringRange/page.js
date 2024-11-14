
import Container from '@mui/material/Container';
import Hero from '../../Components/Hero'
// import dynamic from 'next/dynamic'
import App from './App'
// import { Suspense } from 'react'


export const dynamic = 'force-dynamic'



// const App = dynamic(() => import('./App.js'), { ssr: false })
// const App = dynamic(() => import('./App.js'), {
//   loading: () => <p>Loading...</p>,
// })

export function Loading() {
  return <p>Loading...</p>
}

console.log('this is tracked')
export default function FiringRange() {
  return (
    <Container maxWidth="xl"  >
        <Hero contentNeeded = {"Hacker Firing Range"}/>
        {/* <Suspense fallback={<Loading />}> */}
        {/* <App /> */}
      {/* </Suspense> */}
        <App />
    </Container>
  )
}



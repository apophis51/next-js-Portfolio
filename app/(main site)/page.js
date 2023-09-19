
// import { motion, useScroll } from "framer-motion"
import ProjectCards from './ProjectCards/page';
import About from './About/page'
import JumboTron from './JumboTron/page'

// import { ProjectCards} from './ProjectCards/page'

// function Framer( props ) {
//   return (
//     <div>
//     <motion.div
//   initial={{ opacity: 0 }}
//   transition={{ delay: 1,  duration: 4 }}

//   whileInView={{ opacity: 1 }}>
//       {props.children}
//       {props.message}
//       </motion.div>
//     </div>)
// }



export default function Home() {
  return (
    
    <main>
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Framer message = "cool shit">
            <h1>cool Shit</h1>
            </Framer>
      <motion.div
  initial={{ opacity: 0 }}
  transition={{ delay: 1,  duration: 4 }}

  whileInView={{ opacity: 1 }}>
      <h2 className="text-5xl ">what up son.</h2>
      </motion.div>
          <Link href="/api/python">
            <code className="font-mono font-bold">api/index.py</code>
          </Link>
          <Link href="/fourth">
            <code className="font-mono font-bold">/fourth</code>
          </Link>
          <Link href="/malmind">
            <code className="font-mono font-bold">malmind</code>
          </Link>
          
        </p> */}
  
        {/* <video autoPlay muted loop id="video">
      <source src="NavVid.mp4" type="video/mp4"/>
    </video> */}
     {/* <ProjectCards/> */}
     
    {/* <SuperOldJumboTron/> */}
     <JumboTron/>
     {/* <JumboTron/> */}
     <About/>
      {/* <ProjectCards/> */}

    </main>
  )
}

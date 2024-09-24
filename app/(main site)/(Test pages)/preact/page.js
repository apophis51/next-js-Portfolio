"use client"
import { signal} from "@preact-signals/safe-react";
// import {useState} from "react"


// let renderCount = 0
//  const counter = signal('Fly')
//  effect(() => console.log('nice', counter.value))

// export default function Home() {
//   // const [counter, setCounter ] = useState(0)
//   console.log('we rendered', renderCount, "times")
//   renderCount++
//   return (
//     <div className="bg-white">
//       <p>{counter}</p>
//       {/* <button  onClick={() => setCounter(counter + 1)} className='btn'>click me to increment</button> */}

//       <button  onClick={() => counter.value = counter.value + "Fly"} className='btn'>click me to increment</button>
//     </div>
    
//   );
// }


// Create a signal for count
const countSignal = signal({parrent:1, child:0});

// Child component that accepts a signal prop
function ChildComponent({ countSignal }) {
  return (
    <div>
      <p>Count in child: {countSignal.value.child}</p>
      <button onClick={() => countSignal.value = { ...countSignal.value, child: countSignal.value.child + 1 }}>Increment in Child</button>
    </div>
  );
}

// Parent component that passes the signal as a prop
export default function ParentComponent() {
  return (
    <div>
      <p>Count in parent: {countSignal.value.parrent}</p>
      <button onClick={() => (countSignal.value).parrent++}>Increment in Parent</button>
      {/* Passing the signal as a prop to the child component */}
      <ChildComponent countSignal={countSignal} />
    </div>
  );
}
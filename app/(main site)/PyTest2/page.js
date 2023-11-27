'use client'
import {useState,useEffect} from 'react';





export default function Home() {
    const [userInput, setUserInput] = useState('');
    const pyscript = `
      print('function woirks')
    `
    useEffect(() => {
        // mygranium()

      }, [])
    return (
        <div className ="bg-white">
            <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
9        <script defer src="https://pyscript.net/latest/pyscript.js" strategy='beforeInteractive'/>
      <py-script 
        dangerouslySetInnerHTML={{__html: pyscript}}
      />
      </div>
      )
  }
  
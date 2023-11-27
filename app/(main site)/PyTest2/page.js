'use client'
import {useState,useEffect} from 'react';
import Container from '@mui/material/Container';





export default function Home() {
    const [userInput, setUserInput] = useState('');
    const pyscript = `
      print('function woirks')
    `
    useEffect(() => {
        // mygranium()

      }, [])
    return (
      <Container maxWidth="xl"  >

        <div className ="bg-white">
            <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
9        <script defer src="https://pyscript.net/latest/pyscript.js" strategy='beforeInteractive'/>
      <py-script 
        dangerouslySetInnerHTML={{__html: pyscript}}
      />
      </div>
      </Container>
      )
  }
  
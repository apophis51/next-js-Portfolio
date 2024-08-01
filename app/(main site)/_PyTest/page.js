'use client'
import {useState,useEffect} from 'react';
import './pyscript.css'
import Script from 'next/script'
import Container from '@mui/material/Container';


 


export default function Home() {
    const [userInput, setUserInput] = useState('');
    const pyscript = `
    <div>
    <py-config>
                plugins = [
                  "https://pyscript.net/latest/plugins/python/py_tutor.py"
                ]
            </py-config>

            <section class="pyscript">
                Hello world! <br>
                This is the current date and time, as computed by Python:
                <py-script>
                    from datetime import datetime
                    now = datetime.now()
                    display(now.strftime("%m/%d/%Y, %H:%M:%S"))
                </py-script>
            </section>
      <py-script>
      def cool():
        return 4

      print('function woirks')
      print(cool())
      
      </py-script></div>
    `

    const handleButtonClick = () => {
        setUserInput('NewUser');
      };
    useEffect(() => {
        // mygranium()

      }, [])
    return (
      <Container maxWidth="xl"  >

        <div className ="bg-white p-9">
            {/* <Script src="https://pyscript.net/latest/pyscript.js" strategy="beforeInteractive"/> */}
        <script  src="https://pyscript.net/latest/pyscript.js" strategy='beforeInteractive'/>
<button onClick={handleButtonClick}>userInput{userInput}</button>

      <div
        dangerouslySetInnerHTML={{__html: pyscript}}
      />
      </div>
      </Container>
      )
  }
  
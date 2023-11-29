'use client'
import {useState,useEffect} from 'react';
import './pyscript.css'
import Script from 'next/script'
import Container from '@mui/material/Container';
import Prism from "prismjs";
import './prism.css'
import 'prismjs/components/prism-python';// Import the Python language definition



export default function Home() {
    const [inputValue, setInputValue] = useState('');
    
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

      const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

    //   useEffect(() => {
    //     const highlight = async () => {
    //       await Prism.highlightAll(); // <--- prepare Prism 
    //     };
    //     highlight(); // <--- call the async function
    //   }, []); // <--- run when post updates

const javacode = 'console.log("cool")'
const python = 'print("cool")'

const test = '<pre><code class="language-javascript">console.log("cool")</code></pre>'

 
    return (
      <Container maxWidth="xl"  >

        <div className ="bg-white p-9">
        <script  src="https://pyscript.net/latest/pyscript.js" strategy='beforeInteractive'/>

      <div
        dangerouslySetInnerHTML={{__html: pyscript}}
      />
      </div>

      <div className = "bg-white">
      {/* Input box */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />

      {/* Display the input value */}
      <p>You typed: {inputValue}</p>
    </div> 
    {/* End of Input Box */}
  
    <div
        dangerouslySetInnerHTML={{__html: test}}
      />

<pre><code class="language-javascript">{javacode}</code></pre>
<pre><code class="language-python">{python}</code></pre>


      </Container>
      )
  }
  
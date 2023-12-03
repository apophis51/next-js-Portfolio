'use client'
import {useState,useEffect,useRef, useLayoutEffect} from 'react';
import './pyscript.css'
import Script from 'next/script'
import Container from '@mui/material/Container';
import Prism from "prismjs";
import './prism.css'
import 'prismjs/components/prism-python';// Import the Python language definition



export function ProgramStatements ({handleChange, code}){
  return(
  <pre>
      <code
        className="language-javascript"
        contentEditable={true}
        onBlur={handleChange}
        // onInput={props.handleChange}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </pre>)

}


export default function Home() {
    const [inputValue, setInputValue] = useState('');
    const [code, setCode] = useState("console.log('nice')");
    const [sim, setSim] = useState('test')
    const [change, setChange] = useState('console.log("cool")')
    const [test, setTest] = useState(`<pre><code class="language-javascript">${change}</code></pre>`)
    const what = useRef('console.log("ref")')

    const handleTest = (e) => {
      setChange(e.target.value.innerText)
      setTest(`<pre><code class="language-javascript">${change}</code></pre>`)
      console.log(test)
    }


  const handleChange = (event) => {
    // setCode(event.target.textContent); //can also be inner test
    // setSim(event.target.textContent)
    console.log(event.target.textContent)
    setCode(event.target.textContent)

    what.current = event.target.textContent
    console.log(event.target.value)
    console.log(document.querrySelector('big').textContent)
    console.log(code)
  };
    
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

      useEffect(() => {
        const highlight = async () => {
          await Prism.highlightAll(); // <--- prepare Prism 
        };
        highlight(); // <--- call the async function
      }, [code]); // <--- run when post updates

const javacode = 'console.log("cool")'
const python = 'print("cool")'


 
    return (
      <Container maxWidth="xl"  >

        
        <ProgramStatements handleChange = {handleChange} code ={code}/>


        <div className ="bg-white p-9">
        <script  src="https://pyscript.net/latest/pyscript.js" strategy='beforeInteractive'/>
        
        <p>test 3</p>
        <div
        contentEditable={true}
        dangerouslySetInnerHTML={{__html: test}}
        onInput = {handleTest}
      />
   

      <div
        dangerouslySetInnerHTML={{__html: pyscript}}
      />
      </div>

      <pre>
      <code
        className="language-javascript big"
        contentEditable={true}
        onBlur={handleChange}
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: what.current }}
      />
    </pre>

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
  

//   import React, { useState } from 'react';

// const CodeEditor = ({ initialCode }) => {
//   const [code, setCode] = useState(initialCode);

//   const handleChange = (event) => {
//     setCode(event.target.textContent);
//   };

//   return (
//     <pre>
//       <code
//         className="language-javascript"
//         contentEditable={true}
//         onInput={handleChange}
//         dangerouslySetInnerHTML={{ __html: code }}
//       />
//     </pre>
//   );
// };

// export default CodeEditor;









{/* <textarea
className="language-javascript big"
value={codeRef.current}
onChange={handleChange}
onBlur={handleChange}
/> */}
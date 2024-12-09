"use client"
import { Render } from "@measured/puck";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import {useState, useEffect} from 'react'
import type { Config } from "@measured/puck";
import save from "./serverAction";
import Container from '@mui/material/Container';
import { DropZone } from "@measured/puck";
import ReactMarkdown from "react-markdown";

type Components = {
    Container: {};
    TextBlock: {};
    ReactMarkDown: {};
  };

// Create Puck component config
const config: Config<Components> = {
//   root: {
//         render: ({children}) => {
//             return (
//                 <>
//                 <Container maxWidth="md">
//                     <div>
//                         <h1 className="bg-white">Hello</h1>
//                         {children}
//                     </div>
//                 </Container></>
//             )
//         }
        
//     },  
  components: { 
    ReactMarkDown: {
        fields: {
            MarkDownContent: {
              type: "textarea",
            },
          },
          defaultProps: {
            MarkDownContent: "# This is a sample Blog",
          },
        render: ({ MarkDownContent }) => {
            return (
                <div
              className=" prose prose-sm lg:prose-xl prose-a:text-red-600 overflow-auto pr-2"
            >
                <ReactMarkdown>{MarkDownContent}</ReactMarkdown>
             </div>)
        }
    },
    Container: {
        render: () => {
            return (
                <div className="">
                <Container maxWidth="md" className="bg-white">
                    <div>
                        <DropZone zone="my-content"/>
                    </div>
                </Container></div>
            )
        }
    },
    TextBlock: {
      fields: {
        text: {
          type: "text",
        },
      },
      defaultProps: {
        text: "Hello, world",
      },
      render: ({ text }) => {
        return <h1 className="bg-white">{text}</h1>;
      },
    },
  },
};
 
// Describe the initial data
const initialData = {};
 
// Save the data to your database

let thisData = null
let element = null
export default function Editor() {
    const [tripped, setTripped] = useState(false);


    async function saveIt(data) {
        await save(data)
        thisData = data
        setTripped(true)
        //reshow element
        element.style.display = "block";

    }

    useEffect(() => {
        //target MalcMindNav id
        element = document.getElementById("malcMindNav");
        //make it invisible 
        element.style.display = "none";
      }, []);
    
  return (
    <>
  {!tripped && <Puck config={config} data={initialData} onPublish={saveIt} />};
  {tripped && <Render config={config} data={thisData} />};
  </>)
}

'use client'


///https://www.npmjs.com/package/react-simplemde-editor
// import  ReactMarkdown  from "react-markdown"
import ReactMarkdown from 'react-markdown';
import Container from '@mui/material/Container';
import { mongoDBDownloadAtom } from '../globalAdminDashAtoms'
import { atom, useAtom } from 'jotai'
import projectURLS from '@/projectSettings'
import { useEffect,useState, useRef, useLayoutEffect } from 'react'
import { HighlightafterEveryRender } from '@/app/(main site)/Components/Utils/highlighter'
import dynamic from 'next/dynamic'



// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import '@/app/(main site)/Components/styles/prism.css'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

//import params



export default function ArticleView() {

    const ID = '67239574d4cf31f65e1daa41'
    console.log(ID)


    const [downloadedBlog, setValue] = useAtom(mongoDBDownloadAtom)
    const [key, setKey] = useState(Date.now());
    const simpleMDERef = useRef(null); // Reference to access the SimpleMDE instance



    console.log(downloadedBlog)

    async function serverGetBlogs() {

        console.log('about to fetch serverBlogs')
        const res = await fetch(projectURLS().pythonMongoDBServer)
        console.log('we just got a res response')
        const data = await res.json()
        console.log(data)
        setValue(data.find((blog) => blog.id == ID).MarkdownContent)
        console.log(data)
    }

    useEffect(() => {

        serverGetBlogs()

    }, [])
    HighlightafterEveryRender()

    const onChange = (value: string) => {
        setKey(Date.now());
        setValue(value);
        
    }

    // useEffect(() => {
      
    // },[key])
    

    useEffect(() => {
        // Delay the logic by 2 seconds
        // const timer = setTimeout(() => {
          console.log('hit');
          
          // Check if the ref is set
          if (simpleMDERef.current) {
            console.log('Found the div element:', simpleMDERef.current);
    
            const eyeIcon = simpleMDERef.current.querySelector('.fa-eye');
            const splitView = simpleMDERef.current.querySelector('.fa-columns');
            
            if (eyeIcon) {
              console.log('Found the eye icon:', eyeIcon);
    
              // Add the event listener to the eye icon
              const handleClick = () => {
                console.log('Eye icon clicked!');
                // const timer = setTimeout(() => {
                    // setKey(Date.now());
                // }, 500);     
              };
    
              eyeIcon.addEventListener('click', handleClick);
              splitView.addEventListener('click', handleClick);
    
              // Clean up the event listener when the component unmounts or ref changes
              return () => {
                // eyeIcon.removeEventListener('click', handleClick);
                // splitView.removeEventListener('click', handleClick);
              };
            }
          }
        // }, 1000);
    
        // Cleanup the timeout if the component unmounts or downloadedBlog changes
        // return () => clearTimeout(timer);
    
      }, []); 

    

    const reRender = () => {
        setKey(Date.now());
      };

    const options = {
        spellChecker: false,  // Disable the spell checker (red highlights)
        autofocus: false, // Optional: Automatically focus the editor when it loads
        status: false, // Optional: Hide the status bar
        // toolbar: true , // Optional: Hide the toolbar
        // previewRender: (plainText) => {
        //   // Optional: Customize the Markdown preview rendering (if needed)
        //   return plainText;
        // },
        // Disabling syntax highlighting (if needed)
        mode: 'markdown',
        theme: 'base16-dark', // Optional: You can change the theme if you like
      };

    return (
        <div className=''>
            <Container maxWidth="xl" >
            <button className="btn" onClick={reRender}>ReRender</button>
                <div className=' flex flex-row bg-white justify-center  '>
                    {typeof downloadedBlog === 'string' && downloadedBlog.length > 0 &&
                        <>
                            <div  className="w-1/2 " >
                                <SimpleMDE   ref={simpleMDERef} options={options} value={downloadedBlog} onChange={onChange}/>
                            </div>
                            <div key={key} className="w-1/2 prose prose-sm lg:prose-xl prose-a:text-red-600">
                                <ReactMarkdown>{downloadedBlog}</ReactMarkdown>
                            </div>
                        </>
                    }
                </div>
            </Container>
        </div>)
}




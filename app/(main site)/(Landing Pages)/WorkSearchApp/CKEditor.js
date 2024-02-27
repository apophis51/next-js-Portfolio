'use client'
// ck editor install https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html
 // App.jsx / App.tsx

 import React, { useState } from 'react';
 import { CKEditor } from '@ckeditor/ckeditor5-react';
 import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 import { atom, useAtom } from 'jotai'
    import {jobDescriptionAtom} from './Atoms.js'
    // import Markdown from '@ckeditor/ckeditor5-markdown-gfm';
import  htmlToMarkdown  from './htmlToMarkdown.js'

 const App = () => {
     const [editor, setEditor] = useState(null);
     const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom);
 
     const handleReady = (editor) => {
         // You can store the "editor" and use it when needed.
         setEditor(editor);
        //  setJobDescription(editor.getData())
        // console.log(editor.data)
         console.log('Editor is ready to use!', editor);
     };
 
     const handleChange = (event, editor) => {
         console.log(event);
        console.log(editor.data.get())
        setJobDescription(editor.data.get())
        //  setJobDescription(`${editor.data.get()}`)
     };
 
     const handleBlur = (event, editor) => {
         console.log('Blur.', editor);
     };
 
     const handleFocus = (event, editor) => {
         console.log('Focus.', editor);
     };
 
     return (
         <div className="App">
             <h2>Using CKEditor&nbsp;5 build in React</h2>
             <CKEditor
                 editor={ClassicEditor}
                 data={jobDescription || 'needs data'}
                 onReady={handleReady}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 onFocus={handleFocus}
                //  config={{
                //     extraPlugins: [Markdown],
                //   }}
                 
             />
         </div>
     );
 };
 
 export default App;
'use client'
// ck editor install https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html
// App.jsx / App.tsx

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { atom, useAtom } from 'jotai'
import { jobDescriptionAtom, jobRejectionAtom } from './Atoms'
// import Markdown from '@ckeditor/ckeditor5-markdown-gfm';
import htmlToMarkdown from './htmlToMarkdown.js'

const App = () => {
    const [editor, setEditor] = useState(null);
    const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom);
    const [jobRejection, setJobRejection] = useAtom(jobRejectionAtom);

    const handleReady = (editor) => {
        // You can store the "editor" and use it when needed.
        setEditor(editor);
        //  setJobDescription(editor.getData())
        // console.log(editor.data)
    };
    const handleRejectionChange = (event, editor) => {
        setJobRejection(editor.data.get())
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
            <h2>Job Description</h2>
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
            <h2>Job Rejection Message</h2>
              <CKEditor
                editor={ClassicEditor}
                data={jobRejection || 'needs data'}
                onReady={handleReady}
                onChange={handleRejectionChange}
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
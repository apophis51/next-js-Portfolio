'use client'
// ck editor install https://ckeditor.com/docs/ckeditor5/latest/installation/integrations/react.html
// App.jsx / App.tsx

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { atom, useAtom } from 'jotai'
import { jobDescriptionAtom, jobRejectionAtom, jobResumeAtom} from './Atoms'
// import Markdown from '@ckeditor/ckeditor5-markdown-gfm';
import htmlToMarkdown from './htmlToMarkdown.js'
 
const App = () => {
    const [editor, setEditor] = useState(null);
    const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom);
    const [jobRejection, setJobRejection] = useAtom(jobRejectionAtom);
    const [jobResume, setJobResume] = useAtom(jobResumeAtom);

    const handleReady = (editor: any) => {
        // You can store the "editor" and use it when needed.
        setEditor(editor);
        //  setJobDescription(editor.getData())
        // console.log(editor.data)
    };
    const handleResumeChange = (event: any, editor: any) => {
        setJobResume(editor.data.get())
    };
    const handleRejectionChange = (event: any, editor: any) => {
        setJobRejection(editor.data.get())
    };
    const handleChange = (event: any, editor: any) => {
        console.log(event);
        console.log(editor.data.get())
        setJobDescription(editor.data.get())
        //  setJobDescription(`${editor.data.get()}`)
    };

    // const handleBlur = (event, editor) => {
    //     console.log('Blur.', editor);
    // };

    // const handleFocus = (event, editor) => {
    //     console.log('Focus.', editor);
    // };

    return (
        <div className="App">
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title  font-medium">
                    <p><b>Job Description</b></p>
                </div>
                <div className="collapse-content">
                    <CKEditor
                        editor={ClassicEditor}
                        data={jobDescription || 'needs data'}
                        onReady={handleReady}
                        onChange={handleChange}
                    // onBlur={handleBlur}
                    // onFocus={handleFocus}
                    //  config={{
                    //     extraPlugins: [Markdown],
                    //   }}
                    />
                </div>
            </div>
            <br></br>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Job Rejection Message
                </div>
                <div className="collapse-content">
                    <CKEditor
                        editor={ClassicEditor}
                        data={jobRejection || 'needs data'}
                        onReady={handleReady}
                        onChange={handleRejectionChange}
                    // onBlur={handleBlur}
                    // onFocus={handleFocus}
                    //  config={{
                    //     extraPlugins: [Markdown],
                    //   }}

                    />
                </div>
            </div>
            <br></br>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Job Resume
                </div>
                <div className="collapse-content">
                    <CKEditor
                        editor={ClassicEditor}
                        data={jobResume || 'Save Your Resume Data Here'}
                        onReady={handleReady}
                        onChange={handleResumeChange}
                    // onBlur={handleBlur}
                    // onFocus={handleFocus}
                    //  config={{
                    //     extraPlugins: [Markdown],
                    //   }}

                    />
                </div>
            </div>
        </div>
    );
};

export default App;
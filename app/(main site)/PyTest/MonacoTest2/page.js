'use client'

// CodeEditorWindow.js

import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "document.write(let a = 'cool'; a;)"); //default for code prop ""
  const [compiledCode, setCompiledCode] = useState("Compiled Code");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const handleCodeExecution = () => {

    const consoleLogRegex = /console\.log\(([^)]*)\)/g;
    const matches = [...value.matchAll(consoleLogRegex)];
    const logArguments = matches.map(match => match[1]);
    console.log(logArguments[0]);

    console.log(value)
    let test = eval(value)
    // console.log = document.write()
    setCompiledCode(test)
    // setCompiledCode(value);
  }
  
  return (
    <div>
        <p className = 'bg-white'>hello</p>
        {/* <p className = 'bg-white'>{eval(value)}</p> */}
        <p className = 'bg-white'>{compiledCode}</p>
        <button className = 'bg-white' onClick={handleCodeExecution}>Execute Code</button>
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"} //default for language prop "javascript"
        value={value} //default for value useEffect " "
        theme={theme} //default for theme null
        defaultValue="console.log('hello world')"
        onChange={handleEditorChange}
      />
    </div>
    </div>
  );
};
export default CodeEditorWindow;
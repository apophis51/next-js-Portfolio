'use client'

// CodeEditorWindow.js

import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || ""); //default for code prop ""

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  
  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"} //default for language prop "javascript"
        value={value} //default for value useEffect " "
        theme={theme} //default for theme null
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
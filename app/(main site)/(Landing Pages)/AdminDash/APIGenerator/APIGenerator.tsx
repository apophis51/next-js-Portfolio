'use client'

import React, { useState } from "react";

export function APIGenerator() {
  const [apiKey, setApiKey] = useState("");

  const generateAPIKey = () => {
    // Simulate API key generation
    const newApiKey = `API_${Math.random().toString(36).substr(2, 16)}`;
    setApiKey(newApiKey);
  };

  return (
    <div className="flex justify-center items-center bg-white h-[150px] flex-col">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded btn block mb-2"
        onClick={generateAPIKey}
      >
        Generate API Key
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded btn block mb-2"
        onClick={generateAPIKey}
      >
        Generate New API Key
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded btn block mb-2"
        onClick={() => alert(`Your API key is: ${apiKey}`)}
      >
        View Your API
      </button>
      <p className="mt-2">Link: {apiKey || "No API key generated yet"}</p>
    </div>
  );
}

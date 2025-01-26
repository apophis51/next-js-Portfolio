'use client'

import React, { useState, useEffect } from "react";
import useUserId from "@/app/hooks/useUserId";
import {addApiKeyToMainSettings, getUsersBlogsWithAPI,getMainSettings} from "@/app/(main site)/Components/db_services/mongo"
import Link from "next/link";

export function APIGenerator() {
  const [apiKey, setApiKey] = useState("");
  const userId = useUserId();
  console.log(userId)

  const generateAPIKey = () => {
    // Simulate API key generation
    const newApiKey = `API_${Math.random().toString(36).substr(2, 16)}`;
    addApiKeyToMainSettings(userId, newApiKey)
    setApiKey(newApiKey);
  };


  useEffect(() => {
    (async() => {
      if (userId != "") {
      console.log(userId)
      let userSettings = await getMainSettings(userId)
      console.log(userSettings)
      setApiKey(userSettings.apiKey)
      }
    })();
     
  }, [userId]);

  return (
    <div className="flex justify-center items-center bg-white h-[250px] flex-col">
        <p>{userId}</p>
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
        onClick={() => getUsersBlogsWithAPI(apiKey)}
      >
        View Your Blogs JSON
      </button>
      <p className="mt-2">Link: {apiKey || "No API key generated yet"}</p>
      <Link href={`AdminDash/APIGenerator?apiKey=${apiKey}`}><button className="btn"> See Your Blogs</button></Link>
    </div>
  );
}

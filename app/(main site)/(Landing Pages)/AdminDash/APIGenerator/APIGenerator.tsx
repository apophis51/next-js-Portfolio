'use client'

import React, { useState, useEffect } from "react";
import useUserId from "@/app/hooks/useUserId";
import {addApiKeyToMainSettings, getUsersBlogsWithAPI,getMainSettings} from "@/app/(main site)/Components/db_services/mongo"
import Link from "next/link";
import MainContentTemplate from '@/app/(main site)/Components/ui/MainContentTemplate';

export function APIGenerator() {
  const [apiKey, setApiKey] = useState("");
  const [apiDisplayMessage, setApiDisplayMessage] = useState("Generate New API Key");
  const userId = useUserId();
  console.log(userId)
  console.log(apiKey)

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
      if (userSettings.apiKey) {
      setApiKey(userSettings.apiKey)
      }
      }
    })();
     
  }, [userId]);

  return (
    <MainContentTemplate title={"Access Your Blogs Through the API"}>
    <div className="flex justify-center items-center bg-white h-full flex-col  ">
      <button
        className="bg-blue-500 text-white  px-4 rounded btn block mb-2"
        onClick={generateAPIKey}
      >
        {apiDisplayMessage}
      </button>

      <p className="">Your Current API Key: {apiKey || "No API key generated yet"}</p>
    {(apiKey != "") && <p className="mt-2 text-center">Your Current API URL: <Link href={`https://malcmind.com/AdminDash/APIGenerator?apiKey=${apiKey}`}>{`https://malcmind.com/AdminDash/APIGenerator?apiKey=${apiKey}`|| "No API key generated yet"}</Link></p> } 
    </div>
    </MainContentTemplate>
  );
}

'use client'

import { useState, useRef } from "react";
import useAudioRecorder from "./useAudioRecorder";
import { uploadAudio, getAudio } from "@/app/(main site)/Components/db_services/mongo"


const AudioRecorder = () => {
  const { audioBlob, isRecording, startRecording, stopRecording } = useAudioRecorder();
  const [audioSrc, setAudioSrc] = useState("");

  const fetchAudio = async () => {
    const response = await fetch(`http://localhost:3000/Web-Apps/ai-translation/audioAPI?id=67a5ae5c675b2c59881618a4`);

    if (!response.ok) {
      alert("Failed to fetch audio");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
  };

  const handleFetchAudio = async () => {
    const audioDataUrl = await getAudio('67a5a6e7675b2c59881618a2');
    if (audioDataUrl) {
      setAudioSrc(audioDataUrl);
    } else {
      alert("Failed to fetch audio");
    }
  };

  const downloadAudio = () => {
    if (!audioBlob) return;
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recorded_audio.wav";
    a.click();
  };

  const handleUpload = async () => {
    if (!audioBlob) return alert("Please select an audio file");

    const formData = new FormData();
    formData.append("audio", audioBlob);

    const result = await uploadAudio(formData);

    if (result.error) {
      alert(result.error);
    } else {
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioBlob && (
        <div className="mt-4 flex flex-col justify-center items-center">
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2 mt-4"
            onClick={downloadAudio}
          >
            Download Audio
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2 mt-4"
            onClick={handleUpload}
          >
            Upload Audio
          </button>
          <audio controls>
            <source src={`http://localhost:3000/Web-Apps/ai-translation/audioAPI?id=67a5ae5c675b2c59881618a4`} type="audio/mpeg" />
          </audio>
          <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
        </audio>
        </div>
      )}
      <button onClick={fetchAudio}>Load Audio</button>
      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default AudioRecorder;

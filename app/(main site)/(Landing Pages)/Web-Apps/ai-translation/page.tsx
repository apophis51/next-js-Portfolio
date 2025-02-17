'use client'

import { useState, useRef, useEffect } from "react";
import useAudioRecorder from "./useAudioRecorder";
import { uploadAudio, getAudio, getAllAudioRecordigns } from "@/app/(main site)/Components/db_services/mongo"
import { groqAudio } from "@/app/services/groqService";
import { GridFSFile } from "mongodb";

const AudioRecorder = () => {
  const { audioBlob, isRecording, startRecording, stopRecording } = useAudioRecorder();
  const [audioSrc, setAudioSrc] = useState<Blob | null | string>("");
  const [allRecordings, setAllRecordings] = useState<GridFSFile[]>([]);

  const handleGetAllAudioRecordigns = async () => {
   let recordings = await getAllAudioRecordigns();
    recordings =  JSON.stringify(recordings)   //stringify recordings
    recordings = JSON.parse(recordings)
    setAllRecordings(recordings);
    console.log(recordings)
  };

  const fetchAudio = async () => {
    console.log('cool')
    //const response = await fetch(`http://localhost:3000/Web-Apps/ai-translation/audioAPI?id=67a5ae5c675b2c59881618a4`);
    const response = await getAudio('67a5ae5c675b2c59881618a4');
    await groqAudio()

    // if (!response.ok) {
    //   alert("Failed to fetch audio");
    //   return;
    // }

    // const blob = await response.blob();
    // const url = URL.createObjectURL(blob);
    const url = URL.createObjectURL(response);

    console.log(url)
    setAudioSrc(url);
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
    formData.append("audio", audioBlob, "cool.wav");

    const result = await uploadAudio(formData);

    if (result.error) {
      alert(result.error);
    } else {
    }
  };

  useEffect(() => {

    handleGetAllAudioRecordigns();
  }, []);

  return (
    <div className="p-4 flex flex-col justify-center items-center bg-black">
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
        </div>
      )}
      <button onClick={fetchAudio}>Load Audio (Deprecated)</button>
      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
        </audio>
      )}
      {allRecordings.length > 0 && (
        <div>
          <h2 className='text-white'>All Recordings:</h2>
          {allRecordings && allRecordings.map((recording) => (
            <div key={recording._id.toString()}>
              <audio controls src={`/Web-Apps/ai-translation/audioAPI?id=${recording._id.toString()}`} />
              <p className="text-white">{recording.filename}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  //
};

export default AudioRecorder;

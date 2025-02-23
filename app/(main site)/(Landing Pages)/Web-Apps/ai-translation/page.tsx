'use client'

import { useState, useRef, useEffect } from "react";
import useAudioRecorder from "./useAudioRecorder";
import { uploadAudio, getAudio, getAllAudioRecordigns } from "@/app/(main site)/Components/db_services/mongo"
import { groqAudio } from "@/app/services/groqAudiotoTextService";
import { GridFSFile } from "mongodb";
import useUserId from "@/app/hooks/useUserId";
import Image from "next/image";
import { Modal3 } from "@/app/components/ui/Modal3"
import { SignInButton } from "@clerk/nextjs";


const AudioRecorder = () => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const [audioSrc, setAudioSrc] = useState<Blob | null | string>("");
  const [allRecordings, setAllRecordings] = useState<GridFSFile[]>([]);
  const [displayedTranslations, setDisplayedTranslations] = useState<{ [key: string]: string | void }>({});
  const userId = useUserId();
  const { audioBlob, isRecording, startRecording, stopRecording } = useAudioRecorder();


  function handleRecording() {
    if (userId != '' && userId != null) {
      startRecording();
    }
    else {
      modalRef.current?.showModal()
    }
  }

  const handleGetAllAudioRecordigns = async () => {
    let recordings = await getAllAudioRecordigns(userId);
    recordings = JSON.stringify(recordings)   //stringify recordings
    recordings = JSON.parse(recordings)
    setAllRecordings(recordings);
    console.log(recordings)
  };

  async function handleAudiotoText(audioID: string) {
    const translatedAudio = await groqAudio(audioID);
    setDisplayedTranslations((prev) => ({ ...prev, [audioID]: translatedAudio })); // Store translation by audio ID

  }
  console.log(displayedTranslations)

  const fetchAudio = async () => {
    console.log('cool')
    //const response = await fetch(`http://localhost:3000/Web-Apps/ai-translation/audioAPI?id=67a5ae5c675b2c59881618a4`);
    const response = await getAudio('67a5ae5c675b2c59881618a4');

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
    formData.append("userId", userId);


    const result = await uploadAudio(formData);

    if (result.error) {
      alert(result.error);
    } else {
    }
  };

  useEffect(() => {

    if (userId != '') handleGetAllAudioRecordigns();
  }, [userId]);

  return (
    <div className="p-4 flex flex-col justify-center items-center bg-black">
      <Modal3 ref={modalRef} modalTitle="You Must Login To Record" hideOutsideButton={true} buttonText="not used">
        <SignInButton>
          <button className="btn">Sign In</button>
        </SignInButton>
      </Modal3>


      <Image src="/voiceTranscriptionIcon-512x512.png" alt="Logo" width={512} height={512} />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={isRecording ? stopRecording : handleRecording}
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
            Save Audio
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
        <div >
          <h2 className='text-white'>All Recordings:</h2>
          {allRecordings && allRecordings.map((recording) => (
            <div key={recording._id.toString()} className='bg-gray-800'>
              <div className="flex flex-col justify-center items-center gap-2 m-4">
                <p className="text-white mt-20">Name: {recording.filename}</p>
                <audio controls src={`/Web-Apps/ai-translation/audioAPI?id=${recording._id.toString()}`} />
                <button className="btn bg-green-700 text-white" onClick={() => handleAudiotoText(recording._id.toString())}>Transcribe This Text</button>
                {displayedTranslations[recording._id.toString()] && (
                  <p className="text-white mt-2">Transcription: {displayedTranslations[recording._id.toString()]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  //
};

export default AudioRecorder;

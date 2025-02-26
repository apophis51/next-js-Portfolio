'use client'

import { useState, useRef, useEffect, useReducer } from "react";
import useAudioRecorder from "./useAudioRecorder";
import { uploadAudio, getAudio, getAllAudioRecordigns, deleteAudio } from "@/app/(main site)/Components/db_services/mongo"
import { groqAudio, transcribeBlob } from "@/app/services/groqAudiotoTextService";
import { GridFSFile } from "mongodb";
import useUserId from "@/app/hooks/useUserId";
import Image from "next/image";
import { Modal3 } from "@/app/components/ui/Modal3"
import { SignInButton } from "@clerk/nextjs";
import useAdvancedTextInput3 from '@/app/hooks/ui/useAdvancedTextInput3'
import { CloseButton } from '@/app/components/ui/CloseButton'
import { useBottomNav } from "@/app/hooks/ui/useBottomNav"

const initialState = { 
  status: "idle",
  userId: null,
  allRecordings: [],
  activeNavButton: null ,
  audioBlob: null
}

interface AudioState {
  userId: string;
  allRecordings: GridFSFile[],
  status: 'SHOW_RECORDINGS' | 'RECORD_VIEW' | 'RECORDING_STOPPED' | 'SETTINGS_VIEW' 
  audioBlob: Blob
}


function reducer(state: AudioState, action) {
  switch (action.type) {
    case "SET_USER_ID":
      console.log('hit')
      return { ...state, userId: action.payload };
    case "SET_RECORDINGS":
      console.log('hit')
      return { ...state, allRecordings: action.payload };
    case "SET_AUDIO_BLOB":
      console.log('hit')
      return { ...state, audioBlob: action.payload, status: 'RECORDING_STOPPED' };
    case "SET_ACTIVE_NAV_BUTTON":
      console.log('hit')
      console.log(action.payload)
      console.log(state)
      return { 
        ...state, 
        activeNavButton: action.payload, 
        status: action.payload == "record"
        ? "RECORD_VIEW"
        : action.payload == "settings"
        ? "SETTINGS_VIEW"
        : action.payload == "saved recordings"
        ? "SHOW_RECORDINGS"
        : "idle"
      };
    case "idle":
      if (action.type === "START") return { status: "recording" };
      break;
    case "recording":
      if (action.type === "STOP") return { status: "stopped" };
      break;
    case "stopped":
      if (action.type === "UPLOAD") return { status: "uploading" };
      break;
    case "uploading":
      if (action.type === "SUCCESS") return { status: "idle" };
      break;
  }
  console.log(action.payload)
  console.log('hit')
  return state; // Prevents invalid transitions

}


const AudioRecorder = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const nameRef = useRef<HTMLDialogElement>(null)
  const [displayedTranslations, setDisplayedTranslations] = useState<{ [key: string]: string | void }>({});
  const userId = useUserId();
  const { audioBlob, isRecording, startRecording, stopRecording } = useAudioRecorder();
  const [articleName, BasicArticleName] = useAdvancedTextInput3({ prompt: "Enter a Recording Name" })
  const [realtimeTranscription, setRealtimeTranscription] = useState<string | null>(null);
  const [activeNavButton, BottomNavComponent] = useBottomNav()
  const [state, dispatch] = useReducer(reducer, initialState)


  async function handleRealTimeTranscription() {
    const transcribedBlob = await transcribeBlob(audioBlob)
    setRealtimeTranscription(transcribedBlob)
  }

  function handleRecording() {
    if (userId != '' && userId != null) {
      startRecording();
    }
    else {
      modalRef.current?.showModal()
    }
  }

  const handleGetAllAudioRecordigns = async () => {
    const recordings = await getAllAudioRecordigns(userId);
    const stringifiedRecordings = JSON.stringify(recordings)   //stringify recordings
    const parsedRecordings = JSON.parse(stringifiedRecordings)
    // setAllRecordings(parsedRecordings);
    dispatch({ type: "SET_RECORDINGS", payload: parsedRecordings })
    console.log(recordings)
  };

  async function handleAudiotoText(audioID: string) {
    const translatedAudio = await groqAudio(audioID);
    setDisplayedTranslations((prev) => ({ ...prev, [audioID]: translatedAudio })); // Store translation by audio ID

  }
  console.log(displayedTranslations)

  // const fetchAudio = async () => {
  //   console.log('cool')
  //   //const response = await fetch(`http://localhost:3000/Web-Apps/ai-translation/audioAPI?id=67a5ae5c675b2c59881618a4`);
  //   const response = await getAudio('67a5ae5c675b2c59881618a4');

  //   // if (!response.ok) {
  //   //   alert("Failed to fetch audio");
  //   //   return;
  //   // }

  //   // const blob = await response.blob();
  //   // const url = URL.createObjectURL(blob);
  //   const url = URL.createObjectURL(response);

  //   console.log(url)
  //   setAudioSrc(url);
  // };


  const downloadAudio = () => {
    if (!audioBlob) return;
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recorded_audio.wav";
    a.click();
  };

  async function handleDeleteAudio(audioID: string) {
    await deleteAudio(audioID);
    handleGetAllAudioRecordigns();
  }

  async function handleUpload() {
    //nigga
    nameRef.current?.close()
    if (!audioBlob) return alert("Please select an audio file");
    let theAudioName = articleName()
    const formData = new FormData();
    formData.append("audio", audioBlob, "cool.wav");
    formData.append("userId", userId);
    formData.append("audioName", theAudioName);


    const result = await uploadAudio(formData);
    console.log(result)
    await new Promise(resolve => setTimeout(resolve, 3000));

    handleGetAllAudioRecordigns()
    if (result.error) {
      alert(result.error);
    } else {

    }

  }
  const handleSaveAudio = async () => {
    nameRef.current?.showModal()

    // if (!audioBlob) return alert("Please select an audio file");

    // const formData = new FormData();
    // formData.append("audio", audioBlob, "cool.wav");
    // formData.append("userId", userId);


    // const result = await uploadAudio(formData);

    // if (result.error) {
    //   alert(result.error);
    // } else {
    // }
  };

  useEffect(() => {
    const toolbarElement = document.querySelector('.MuiContainer-root');
    if (toolbarElement) {
      toolbarElement.style.display = 'none';
    }
  }, []);
  useEffect(() => {
    if (state.userId != '') handleGetAllAudioRecordigns();
    if (state.userId) {
      dispatch({ type: "SET_USER_ID", payload: userId });
    }
  }, [userId]);
  useEffect(() => {
    if (activeNavButton) dispatch({ type: "SET_ACTIVE_NAV_BUTTON", payload: activeNavButton })
  }, [activeNavButton]);
  useEffect(() => {
    if (audioBlob) dispatch({ type: "SET_AUDIO_BLOB", payload: audioBlob })
  }, [audioBlob]);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-black container mx-auto h-full min-h-screen pb-10">
        <Modal3 ref={nameRef} modalTitle="Enter A Name for the Recording" hideOutsideButton={true} buttonText="not used">
          <BasicArticleName />
          <button className="btn" onClick={handleUpload}>Save Recording</button>
        </Modal3>

        <Modal3 ref={modalRef} modalTitle="You Must Login To Record" hideOutsideButton={true} buttonText="not used">
          <SignInButton>
            <button className="btn">Sign In</button>
          </SignInButton>
        </Modal3>


        <Image src="/voiceTranscriptionIcon-512x512.png" alt="Logo" width={512} height={512} />
        {state.status == "RECORD_VIEW" &&
          <>
            <div className="max-w-[330px] text-white pb-10">
              <p>{realtimeTranscription}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={isRecording ? stopRecording : handleRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          </>}
        {state.status == "RECORDING_STOPPED" && (
          <div className="mt-4 flex flex-col justify-center items-center">
            <audio controls src={URL.createObjectURL(state.audioBlob)} />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-2 mt-4"
              onClick={downloadAudio}
            >
              Download Audio
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-2 mt-4"
              onClick={handleSaveAudio}
            >
              Save Audio
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-2 mt-4"
              onClick={handleRealTimeTranscription}
            >
              Transcribe Audio
            </button>
          </div>
        )}
        {state.status == "SHOW_RECORDINGS" && (
          <div className='pb-14'>
            <h2 className='text-white'>All Recordings:</h2>
            {state.allRecordings && state.allRecordings.map((recording) => (

              <div key={recording._id.toString()} className='bg-gray-800 max-w-[330px]'>
                <CloseButton left={0} bottom={85} callback={() => handleDeleteAudio(recording._id.toString())}>
                  <div className="flex flex-col justify-center items-center gap-2 m-4">

                    <p className="text-white mt-20">Name: {recording.filename}</p>
                    <audio controls src={`/Web-Apps/ai-translation/audioAPI?id=${recording._id.toString()}`} />
                    <button className="btn bg-green-700 text-white" onClick={() => handleAudiotoText(recording._id.toString())}>Transcribe This Text</button>
                    {displayedTranslations[recording._id.toString()] && (
                      <p className="text-white mt-2">Transcription: {displayedTranslations[recording._id.toString()]}</p>
                    )}

                  </div>
                </CloseButton>
              </div>
            ))}

          </div>
        )}
        <BottomNavComponent />
      </div>

    </>
  );
  //
};

export default AudioRecorder;

'use client'

import { useState, useRef } from "react";
import useAudioRecorder from "./useAudioRecorder";


const AudioRecorder = () => {
    const { audioBlob, isRecording, startRecording, stopRecording } = useAudioRecorder();

    const downloadAudio = () => {
        if (!audioBlob) return;
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recorded_audio.wav";
        a.click();
      };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioBlob && (
        <div className="mt-4">
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={downloadAudio}
          >
            Download Audio
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;

'use client'

import React, { useState } from 'react';
const AudioPlayer = () => {
    // State to track the audio element and playback status
    //music is from https://www.premiumbeat.com/royalty-free-music-genre/games?page=5
    const [audio, setAudio] = useState(new Audio('/clickerGame/Widget_By_Harrison_Amer.mp3'));
    const [isPlaying, setIsPlaying] = useState(false);
  
    // Function to handle play/pause
    const togglePlay = () => {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
        audio.loop = true;
      }
      setIsPlaying(!isPlaying);
    };
  
    // Function to handle volume change
    const handleVolumeChange = (e) => {
      audio.volume = e.target.value;
    };

//       // Function to handle loop toggle
//   const toggleLoop = () => {
//     audio.loop = !audio.loop;
//   };


// !audio.loop: The ! (logical NOT) operator is used here to negate the current value of audio.loop. If audio.loop is true, !audio.loop will be false, and vice versa.
  
    return (
      <div>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={handleVolumeChange}
          value={audio.volume}
        />
      </div>
    );
  };
  
  export default AudioPlayer;
  
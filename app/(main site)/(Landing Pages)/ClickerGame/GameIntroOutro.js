`use client`

import React, { useState, useEffect } from 'react';
import { textAtom } from './page.js'
import { Provider, atom, useAtom } from 'jotai'

import { isPlayingAtom } from './AudioPlayer.js';
import Image from 'next/image'



// const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())

// const Uppercase = () => {
//     const [uppercase] = useAtom(uppercaseAtom)
//     return <div>Uppercase: {uppercase}</div>
//   }

const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())
// let PlayingAtom = atom((get) => get(isPlayingAtom))
// useAtom(isPlayingAtom);


export default function GameIntroOutro() {
  // const [count, setCounter] = useAtom(uppercaseAtom);
  const [count, setCounter] = useAtom(textAtom);

  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);


  useEffect(() => {
    // This will be executed when the component mounts
    document.getElementById('my_modal_4').showModal();
  }, [])




  console.log(isPlaying)



  return (
    <div>
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-black flex flex-col items-center justify-center">
          <h2 className='text-4xl font-bold'> The WebDeveloper Game</h2>
          <br></br>
          <p className='text-2xl'>(strategy clicker game)</p>
          <br></br>
          <Image src={`/clickerGame/programmer-driving-a-lambo.jpg`}
            width={300}
            height={300}
            onClick={() => functionHandler(upgrade)}
          />
          <p className ='mt-5 font-bold' onClick={() => setCounter('Malcolm is the best')}>{count}</p>
          <p className="py-4">You have 1,460 Days to become a WebDev. Good Luck!</p>
          <p className="py-4">Click the button below to play</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <p>{isPlaying}</p>
              <button className="btn" onClick={() => setIsPlaying(true)}>Continue</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
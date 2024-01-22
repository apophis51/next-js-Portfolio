`use client`

import React, { useState, useEffect } from 'react';
import { Provider, atom, useAtom } from 'jotai'
import Image from 'next/image'


import { isPlayingAtom } from './AudioPlayer.js';
import { textAtom,deadAtom } from './page.js'
import Link from 'next/link'





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
  const [testText, settestText] = useAtom(textAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
 const [dead, setDead] = useAtom(deadAtom);

  useEffect(() => {
    // This will be executed when the component mounts
    document.getElementById('my_modal_4').showModal();
  }, [])



console.log(dead)
  console.log(isPlaying)
function reloadPage(){
  window.location.reload()
}


  return (
    <div>
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-black flex flex-col items-center justify-center">
          <h2 className='text-4xl font-bold'> The WebDeveloper Game</h2>
          <br></br>
          <p className='text-2xl'>(strategy clicker game)</p>
          <br></br>
          {!dead && <Image src={`/clickerGame/programmer-driving-a-lambo.jpg`}
            width={300}
            height={300}
            onClick={() => functionHandler(upgrade)}
          />}
          {dead && <Image src={`/clickerGame/gameover.jpg`}
            width={300}
            height={300}
            onClick={() => functionHandler(upgrade)}
          />}
          <p className ='mt-5 font-bold' onClick={() => settestText('Malcolm is the best')}>{testText}</p>
          {!dead && <p className="py-4">You have 1,460 Days to become a WebDev. Good Luck!</p>}
          {dead && <p className="py-4 text-bold">You Got Crushed by the Competition, Better Luck Next Time!</p>}
          {!dead && <p className="py-4">Click the button below to play</p>}
          {dead && <p className="py-4">Click the button below to play again</p>}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <p>{isPlaying}</p>
              {!dead && <button className="btn" onClick={() => setIsPlaying(true)}>Continue</button>}
              {dead && <button className="btn" onClick={reloadPage}>Play Again!</button>}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
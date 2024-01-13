`use client`

import React, { useState, useEffect } from 'react';
import {textAtom} from './page.js'
import { Provider, atom, useAtom } from 'jotai'

import { isPlayingAtom } from './AudioPlayer.js';


// import { textAtom } from 'atoms'


// const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())

// const Uppercase = () => {
//     const [uppercase] = useAtom(uppercaseAtom)
//     return <div>Uppercase: {uppercase}</div>
//   }

const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())
// let PlayingAtom = atom((get) => get(isPlayingAtom))
// useAtom(isPlayingAtom);


export default function GameIntro() {
    const [count, setCounter] = useAtom(uppercaseAtom);
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
  <div className="modal-box w-11/12 max-w-5xl bg-black">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p onClick={() => setCounter('Malcolm is the best')}>{count}</p>
    <p className="py-4">Click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <p>{isPlaying}</p>
        <button className="btn" onClick={() => setIsPlaying(true)}>Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
    )
}
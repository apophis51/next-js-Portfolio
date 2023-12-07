

'use client'

import { useEffect, useState } from 'react';

export default function SocketUI({socketHandler, messageTotal}) {
const [connectsocket, setConnectsocket] = useState('null');

async function internalHandler() {
    console.log('this has ben tripped')
    setConnectsocket(await socketHandler());
}

return(
    <div className='bg-white'>
        <p>Would You like to Connect to the Socket?</p>
        <div>
        {messageTotal.map((item) => ( <p>{item}</p>))}
        </div>
        <p>{connectsocket}</p>
        <button onClick={internalHandler}>Connect</button>
        {/* <button onClick={() => setConnectsocket(true)}>Connect</button> */}
    </div>
)

}
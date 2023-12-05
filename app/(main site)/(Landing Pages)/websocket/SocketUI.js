

'use client'

import { useEffect, useState } from 'react';

export default function SocketUI({socketHandler}) {
const [connectsocket, setConnectsocket] = useState('null');

async function internalHandler() {
    console.log('this has ben tripped')
    setConnectsocket(await socketHandler());
}

return(
    <div className='bg-white'>
        <p>Would You like to Connect to the Socket?</p>
        <p>{connectsocket}</p>
        <button onClick={internalHandler}>Connect</button>
        {/* <button onClick={() => setConnectsocket(true)}>Connect</button> */}
    </div>
)

}
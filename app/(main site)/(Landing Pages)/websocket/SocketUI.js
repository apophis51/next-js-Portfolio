

'use client'

import { useEffect, useState } from 'react';

export default function SocketUI({socketHandler}) {
const [connectsocket, setConnectsocket] = useState(false);

function internalHandler() {
    console.log('this has ben tripped')
    socketHandler();
}

return(
    <div className='bg-white'>
        <p>Would You like to Connect to the Socket?</p>
        <button onClick={internalHandler}>Connect</button>
        {/* <button onClick={() => setConnectsocket(true)}>Connect</button> */}
    </div>
)

}
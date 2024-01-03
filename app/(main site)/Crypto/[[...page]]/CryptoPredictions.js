'use client'

import {useState, useEffect} from 'react'



export default function CryptoPredictions({ethData}) {

    return (
        <div className='bg-white'>
            <h1>Crypto Predictions - Beta</h1>
            <p>Tommorow eth is predicted to be @ {ethData}</p>
            <p>Coming soon...</p>
        </div>
    );
}
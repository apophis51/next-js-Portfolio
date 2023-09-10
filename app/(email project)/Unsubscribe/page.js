'use client'
import './Unsubscribe.css'

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'


function EmailUnsubscribe() {
    const [isUnsubscribed, setIsUnsubscribed] = useState(false);

    const search = useSearchParams().get('email')


    const  handleUnsubscribe = async () => {
        // In a real application, you would perform the unsubscribe action here
        // For this example, we'll just update the state to simulate it
        await fetch(`/TestDeletePhoneUser?email=${search}`,{
            method: 'DELETE'
        })
        setIsUnsubscribed(true);
    };

    return (
        <div>
            {!isUnsubscribed ? (
                <div className="text-4xl text-center border-solid border-2 border-indigo-600 m-[150px]">
                    <br />
                    <br />
                    <p className="">Click the button to unsubscribe from our emails:</p>
                    <br />
                    <br />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 round m-[30px]" onClick=
                    {handleUnsubscribe}>Unsubscribe</button>
                </div>
            ) : (
                <p className = 'text-4xl text-center border-solid border-2 border-indigo-600 m-[150px] h-[100px] p-[30px]'>You have been unsubscribed.</p>
                
            )}
        </div>
    );
}

export default EmailUnsubscribe;
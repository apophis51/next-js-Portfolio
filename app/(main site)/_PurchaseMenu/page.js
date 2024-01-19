'use client'
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'


function EmailUnsubscribe() {
    const [isUnsubscribed, setIsUnsubscribed] = useState(false);

    const search = useSearchParams().get('email')


    const  handleUnsubscribe = async () => {
        // In a real application, you would perform the unsubscribe action here
        // For this example, we'll just update the state to simulate it
        await fetch(`/TestDeletePhoneUser?email=${search}`,{
            method: 'POST'
        })
        setIsUnsubscribed(true);
    };

    return (
        <div>
            {!isUnsubscribed ? (
                <div className="text-4xl text-center border-solid border-2 border-indigo-600 m-[150px] bg-white">
                    <br />
                    <br />
                    <p className="">My Services Will Soon Be available for Purchase Via a Stripe Integration, Check back soon</p>
                    <br />
                    <br />
                   
                </div>
            ) : (
                <p className = 'text-4xl text-center border-solid border-2 border-indigo-600 m-[150px] h-[100px] p-[30px]'>You have been unsubscribed.</p>
                
            )}
        </div>
    );
}

export default EmailUnsubscribe;
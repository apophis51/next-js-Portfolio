import React from 'react';
import { useState } from 'react';



type loading = "on" | "off" | "Successful" | "error"
export default function useLoading(): [any,any,any,any] {
    // const isLoading = useStore((state) => state.isLoading)
    const [isLoading, setLoading] = useState<loading>("off")
    // const setLoading = useStore((state) => state.setLoading)

    const [errorMessage, setErrorMessage] = useState<string>("")

    async function executeLoad(callback: () => Promise<void>) {
        setLoading("on")
        try{
        await callback()
        }
        catch (error) {
            console.log(error)
            setLoading("error")
            setErrorMessage(error.message)
            return
        }
        setLoading("off")
    }

    function LoadingWrapper({ children, callback }: { children: React.ReactNode, callback: () => Promise<void> }) {
        if (isLoading == "off") {
            return (
                <div onClick ={() => {executeLoad(callback)}} className=''>
                    {children}
                </div>
            )
        }
        if (isLoading == "on") {
            return (
                <>
                    <span className="loading loading-lg loading-spinner text-success"></span>

                </>
            )
        }
        if (isLoading == "error") {
            return (
                <>
                    <div onClick ={() => {executeLoad(callback)}} className='flex flex-col items-center justify-center'>
                        <p className='text-red-500'>{errorMessage}</p>
                        <div><p className="text-center">Something went wrong</p></div>
                        {children}
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    }



    function LoadSuccess({ children }: { children: React.ReactNode }) {
        if (isLoading == "Successful") {
            return (
                <>
                    {children}

                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    }

    function LoadError({ children }: { children: React.ReactNode }) {
   
        if (isLoading == "error") {
            return (
                <>
                    {children}

                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    }

    return [setLoading, LoadingWrapper, LoadSuccess, LoadError];
}
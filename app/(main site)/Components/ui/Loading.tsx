import useStore from './LoadingZustand';
import React from 'react';
import { useEffect } from 'react'


export default function useLoading(): [Function, Function, React.FC, React.FC, React.FC] {
    const isLoading = useStore((state) => state.isLoading)
    const setLoading = useStore((state) => state.setLoading)


    function LoadingWrapper({ children }: { children: React.ReactNode }) {

        if (isLoading == "off") {
            return (
                <>
                    {children}

                </>
            )
        }
        if (isLoading == "on") {
            return (
                <>
                    <span className="loading loading-lg loading-spinner text-success"></span>

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
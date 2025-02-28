'use client'
import { useEffect, useState } from 'react'
import { getUserID } from "@/app/services/userServices"



export default function useUserId() {
    const [userId, setUserId] = useState('')

    function resetUserId(){
        setUserId('')
    }


    useEffect(() => {
        (async () => {
            let user = await getUserID() as string
            setUserId(user)
        })();

    }, [])


  return [userId, resetUserId]

}

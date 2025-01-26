'use client'
import { useEffect, useState } from 'react'
import { getUserID } from "@/app/services/userServices"



export default function useUserId() {
    const [userId, setUserId] = useState('')


    useEffect(() => {
        (async () => {
            let user = await getUserID() as string
            setUserId(user)
        })();

    }, [])


  return userId

}

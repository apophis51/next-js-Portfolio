'use server'

import { clerkClient } from "@clerk/nextjs/server";
import {auth} from "@clerk/nextjs/server"


export async function fetchUserAIMetaData(): Promise<number> {
    const {userId} = auth()
    console.log(userId)
    console.log('route hit')
        const publicMetaData:any = (await clerkClient.users.getUser(userId as string)).publicMetadata
        console.log(publicMetaData)
        if(!publicMetaData.AICredits){
            await clerkClient.users.updateUserMetadata(userId as string, {
                    publicMetadata: {
                      AICredits: 100
                    }
                  }) 
        }
        return publicMetaData.AICredits
    }
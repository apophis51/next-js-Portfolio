'use server'

import { clerkClient } from "@clerk/nextjs/server";
import {auth} from "@clerk/nextjs/server"


export async function fetchUserAIMetaData({deductCreditType = null,userId=null} = {}): Promise<number> {
  if (!deductCreditType){
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
      else{
        console.log('hit')
        const publicMetaData:any = (await clerkClient.users.getUser(userId! as string)).publicMetadata
        let AiCredits = publicMetaData.AICredits
        AiCredits = AiCredits - 3
            await clerkClient.users.updateUserMetadata(userId! as string, {
                    publicMetadata: {
                      AICredits: AiCredits
                    }
                  }) 
      
        return publicMetaData.AICredits
      }
    }
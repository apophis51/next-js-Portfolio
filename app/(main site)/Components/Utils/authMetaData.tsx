'use server'

import { clerkClient } from "@clerk/nextjs/server";
import {auth} from "@clerk/nextjs/server"

export async function getUserID(){
  const {userId} = await auth()
  console.log(userId)
  return userId
}

export async function getGenericMetaData() {
  const $newClerkClient = await clerkClient()
  const {userId} = await auth()
  console.log(userId)
  const publicMetaData:any = (await $newClerkClient.users.getUser(userId as string)).publicMetadata
  return publicMetaData
}

export async function deleteUserMetaData(object) {
  const $newClerkClient = await clerkClient()
  const {userId} = await auth()
  console.log(userId)

  // const oldPublicMetaData:any = (await $newClerkClient.users.getUser(userId as string)).publicMetadata
  // delete oldPublicMetaData[object]
  // console.log(oldPublicMetaData)
  // await $newClerkClient.users.updateUserMetadata(userId as string, {
  //   publicMetadata: oldPublicMetaData
  // }) 

  await $newClerkClient.users.updateUserMetadata(userId as string, {
    publicMetadata: {
      [object]: null
    }
  }) 
  const publicMetaData:any = (await $newClerkClient.users.getUser(userId as string)).publicMetadata

  console.log(publicMetaData)
  return publicMetaData
}

export async function createNewMetaData(object:string, value:any, userId?:string) {
  const $newClerkClient = await clerkClient()
  if (!userId){
  const {userId} = await auth()
  }
  console.log(userId)
  await $newClerkClient.users.updateUserMetadata(userId as string, {
    publicMetadata: {
      [object]: value
    }
  }) 
    const publicMetaData:any = (await $newClerkClient.users.getUser(userId as string)).publicMetadata

  console.log(publicMetaData)
  return publicMetaData
}

export async function fetchUserAIMetaData({deductCreditType = null,userId=null} = {}): Promise<number> {
  const testFunction = await getGenericMetaData()
  console.log(testFunction)
  const $newClerkClient = await clerkClient()
  console.log($newClerkClient.users)
  if (!deductCreditType){
    const {userId} = await auth()
    console.log(userId)
    console.log('route hit')
        const publicMetaData:any = (await $newClerkClient.users.getUser(userId as string)).publicMetadata
        console.log(publicMetaData)
        if(!publicMetaData.AICredits){
            await $newClerkClient.users.updateUserMetadata(userId as string, {
                    publicMetadata: {
                      AICredits: 100
                    }
                  }) 
        }
      
        return publicMetaData.AICredits
      }
      else{
        console.log('hit')
        const publicMetaData:any = (await $newClerkClient.users.getUser(userId! as string)).publicMetadata
        let AiCredits = publicMetaData.AICredits
        AiCredits = AiCredits - 3
            await $newClerkClient.users.updateUserMetadata(userId! as string, {
                    publicMetadata: {
                      AICredits: AiCredits
                    }
                  }) 
      
        return publicMetaData.AICredits
      }
    }
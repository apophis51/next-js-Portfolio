
"use server"
import projectURLS from '@/projectSettings'



export default async function serverGetBlogs() {
    console.log('about to fetch serverBlogs')
    const res = await fetch(projectURLS().pythonMongoDBServer)
    console.log('we just got a res response')
    const data = await res.json()
    return data
}
'use server'
import projectUrls from '@/projectSettings'
import {findByBlogUrl} from "@/app/(main site)/Components/db_services/mongo"
import { Content } from 'next/font/google';




export async function MongoDB_Blog_By_URL_Transformer(URL:string){
    let data = await findByBlogUrl(URL.id)
    console.log(data);
    console.log(data.Doc_URL)
    data.data = {attributes: {Content: data.MarkdownContent}}
    //data.data.attributes.Content = data.Title
    console.log(data)
    console.log(data.data)
    return data 

}

export async function mongoDB_Blogs_Adapter() {
    const res = await fetch(projectUrls().pythonMongoDBServer)
    const jsonRes = await res.json()
    const filteredData = jsonRes.filter((blog) => blog.Deployed == true)
    const transform = filteredData.map((blog) => {
      return {
          attributes: {
            Title: blog.Title,
            Content: blog.MarkdownContent,
            Discription: blog.Description,
            Blog_Type: blog.BlogType,
            Doc_URL: blog.DocURL
        }
      }
    })
    console.log(transform)
    return {data: transform} 
  }
  
  export async function strapi_blogs_Data() {
      const res = await fetch(projectUrls().blogsURL)
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const resJson = await res.json()
      return resJson 
  }
  
  export async function combined_strapi_and_mongodb() {
      const adapter = await mongoDB_Blogs_Adapter()
      const res = await fetch(projectUrls().blogsURL)
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const resJson = await res.json()
      const combinedObject = {
        data: [...adapter.data, ...resJson.data]
      }
      console.log(combinedObject)
      return combinedObject 
      // return resJson 
  }
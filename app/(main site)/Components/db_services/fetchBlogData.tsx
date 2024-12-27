import projectUrls from '@/projectSettings'



export async function mongoDB_Blogs_Adapter() {
    const res = await fetch(projectUrls().pythonMongoDBServer)
    const jsonRes = await res.json()
    const transform = jsonRes.map((blog) => {
      return {
          attributes: {
            Title: blog.Title,
            Content: blog.MarkdownContent,
            Discription: blog.Description,
            Blog_Type: blog.BlogType,
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
      return resJson 
  }
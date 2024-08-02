'use server'
import fs from 'fs';
import path from 'path';
// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'
// export const revalidate = 0


export const blog_link_extractor = async (fileName: `${string}.md`) => {
  const filePath = path.join('/mnt', 'c', 'Users', 'malco', 'OneDrive', 'SAFE', 'Documents', 'Obsidian Vault', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log(fileContent)
  return fileContent || 'null content'; // Return an empty array if no matches are found to maintain consistency of our dataTypes 
};

export async function transmitBlog(Method: string, Blog: string, title: string) {
    console.log(Method, Blog, title)
  if (Method == 'POST') {
    console.log('route hit')
    console.log(Blog)
    let formattedBlog = '# ' + title + '\n' + Blog
    let dataToTransmit = {
      data: {
        Title: title,
        Content: formattedBlog,
        Blog_Type: 'Programming',

      }
    }

    const headers = new Headers({
      'Authorization': `Bearer ${process.env.Strappi_SuperAccess}`,
      'Content-Type': 'application/json', // Adjust this based on your API requirements,
    });
    console.log(process.env)
    console.log(process.env.Strappi_SuperAccess)
    console.log(headers)
    let see_if_blog_exists = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=8000`, {
      cache: 'no-store'})
    let doesBlogExist = (await see_if_blog_exists.text()).includes(title)
    console.log(doesBlogExist)
    if (!doesBlogExist) {
      let response = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(dataToTransmit),
        cache: 'no-store',
      })
      if (!response.ok) {
        console.log(response.status)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseJson = await response.json()
      console.log(responseJson)

      return responseJson
    }

  }
}

// let title = 'How To Setup TailwindCSS with Wordpress'
// let blogToSend = blog_link_extractor(`${title}.md`)
// transmitBlog('POST', blogToSend, title)



/* Post  or put
https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=8000
Post: https://malcmind-strapi-cms-production.up.railway.app/api/${seedURL}
Put: https://malcmind-strapi-cms-production.up.railway.app/api/${seedURL}/${UID}
{
    data: {
       Company: 'Raymond James',
      Job_Description: '<p>n/aa</p>',
      userEmail: 'malcolmxvernon@hotmail.com',
      Rejection_Message:
*/
/*
  {
    data: {
      Job_Title: 'Click on a Job Posting Title to Add a Title',
      Applied_Date: '2024-07-27',
      Company: 'City*',
      Job_Description: 'Click on a Job Description to Add a Description',
      Job_Posting_URL: 'http://localhost:5173/',
      userEmail: 'malcolmxvernon@hotmail.com'
    }
  }
*/
'use server'

import { mongoClient } from '@/lib/mongo';



export async function findByBlogUrl(URL:string) {
  URL = URL.id
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('AI_Blogs'); // Replace with your collection name
    const regex = new RegExp(URL, 'i')
    // const result = await collection.findOne({ DocURL: regex }); // Query by the `Title' field
    const result = await collection.findOne({ DocURL: URL }); // Query by the `Title' field
    if (result) {
      return result
    } else {
        throw new Error('Document not found');
    }
  } catch (error) 
  {
    return (error)
  } 
}


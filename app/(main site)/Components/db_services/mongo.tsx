'use server'

import { mongoClient } from '@/lib/mongo';



export async function findByBlogName(name:string) {

  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('AI_Blogs'); // Replace with your collection name
    const regex = new RegExp(name, 'i')
    const result = await collection.findOne({ Title: regex }); // Query by the `Title' field
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


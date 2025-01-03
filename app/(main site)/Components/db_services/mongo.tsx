'use server'

import { mongoClient } from '@/lib/mongo';


type contentType = {
  type: "blog" | "meta" | "dropdown"
}

export async function contentSettings() {
  try{
  const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
  const collection = database.collection('Settings'); // Replace with your collection name
  const filter = {name: 'MainSettings'}
  const update = {$addToSet: { contentType: {type: "blog"}}}
  const result = await collection.updateOne(filter, update)
  console.log(result)
  }
  catch(error){
    console.log(error)
  }
  
}



export async function findByBlogUrl(URL:string) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('AI_Blogs'); // Replace with your collection name
    const regex = new RegExp(URL, 'i')
    const result = await collection.findOne({ DocURL: regex }); // Query by the `Title' field
    //const result = await collection.findOne({ DocURL: URL }); // Query by the `Title' field
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


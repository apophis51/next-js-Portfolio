'use server'

import { mongoClient } from '@/lib/mongo';


type contentType = {
  type: "blog" | "meta" | "dropdown"
}

export async function addNewCategory(category: string) {
  console.log(category)
  try {
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Settings'); // Replace with your collection name
    const options = { upsert: true };
    const filter = { name: 'MainSettings' }
    const update = { $addToSet: { category: category } }
    const result = await collection.updateOne(filter, update, options)
    console.log(result)
  }
  catch (error) {
    console.log(error)
  }
}

export async function addNewContentType(contentType: string) {
  console.log(contentType)
  try {
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Settings'); // Replace with your collection name
    const options = { upsert: true };
    const filter = { name: 'MainSettings' }
    const update = { $addToSet: { contentType: contentType } }
    const result = await collection.updateOne(filter, update, options)
    console.log(result)
  }
  catch (error) {
    console.log(error)
  }
}

export async function getOneContent(DocURL: string, contentType: string) {
  try{
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Next_Content'); // Replace with your collection name
    const regex = new RegExp(DocURL, 'i'); // Case-insensitive regex for URL matching

    // Find all matching documents
    const result = await collection.findOne({ DocURL: regex, ContentType: contentType });
    if (result) {
      return result
    } else {
      throw new Error('Document not found');
    }
  }
  catch (error) {
    return (error)
  }
}

export async function getMainSettings(user:string) {
  console.log('getting content type')
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Settings'); // Replace with your collection name
    const result = await collection.findOne({ name: 'MainSettings', ClerkID: user }); // Query by the `Title' field
    if (result) {
      return result
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    return (error)
  }
}

export async function findByBlogUrlAndType(URL: string, type: string) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Next_Content'); // Replace with your collection name
    const regex = new RegExp(URL, 'i'); // Case-insensitive regex for URL matching

    // Find all matching documents
    const results = await collection.find({ DocURL: regex, ContentType: type }).toArray();

    if (results.length > 0) {
      return results; // Return all matching documents as an array
    } else {
      throw new Error('No documents found');
    }
  } catch (error) {
    return error;
  }
}


export async function findByBlogUrl(URL: string) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Next_Content'); // Replace with your collection name
    const regex = new RegExp(URL, 'i')
    const result = await collection.findOne({ DocURL: regex }); // Query by the `Title' field
    //const result = await collection.findOne({ DocURL: URL }); // Query by the `Title' field
    if (result) {
      return result
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    return (error)
  }
}


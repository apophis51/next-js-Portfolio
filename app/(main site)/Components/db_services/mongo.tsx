'use server'

import { mongoClient } from '@/lib/mongo';
import { all } from 'axios';


type contentType = {
  type: "blog" | "meta" | "dropdown"
}


async function monitorChatChanges() {
  console.log('monitoring changes')
  const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
  const collection = database.collection('Settings'); // Replace with your collection name
  const changeStream = collection.watch();

  changeStream.on('change', (change) => {
      console.log('Change detected:', change);
      // Handle change event (e.g., notify users, update UI, etc.)
  });
}

// monitorChatChanges()
//   .catch(console.error);

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

export async function getALLUserBlogs(user:string) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Next_Content'); // Replace with your collection name
    const result = await collection.find({ ClerkID: user }).toArray(); // Query by the `Title' field

    console.log(result)
    if (result) {
      const plainResults = result.map(doc => ({
        ...doc,
        _id: null,
        id: doc._id.toString(), // Convert ObjectId to string
      }));
      console.log(plainResults)
      return plainResults
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    return (error)
}
}


export async function getMainSettings(user:string) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Settings'); // Replace with your collection name
    const result = await collection.findOne({ name: 'MainSettings', ClerkID: user }); // Query by the `Title' field
    console.log(result)
    if(!result){
      const objectToInsert = {
        name: 'MainSettings',
        ClerkID: user,
        contentType: ["all", "uncategorized"],
        category: ["uncategorized"]
      }
      await collection.insertOne(objectToInsert)
      getMainSettings(user) //recursion the results
    }

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


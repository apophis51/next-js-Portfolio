'use server'

import { mongoClient } from '@/lib/mongo';


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
  try {
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

export async function getALLUserBlogs(user: string) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Next_Content'); // Replace with your collection name
    const result = await collection.find({ ClerkID: user }).toArray(); // Query by the `Title' field

    console.log(result)
    if (result) {
      // const plainResults = result.map(doc => ({
      //   ...doc,
      //   _id: null,
      //   id: doc._id.toString(), // Convert ObjectId to string
      // }));
      // console.log(plainResults)
      return transformResults(result)
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    return (error)
  }
}


export async function getUsersBlogsWithAPI(apiKey: string) {
  try {
    console.log(apiKey)
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name

    const settingsCollection = database.collection('Settings'); // Settings collection

    // Perform an aggregation with a $lookup to join blogs and settings
    const pipeline = [
      {
        $match: { apiKey: apiKey } 
      },
      {
        $lookup: {
          from: 'Next_Content', // The name of the collection to join
          localField: 'ClerkID', // The field from the settings collection
          foreignField: 'ClerkID', // The field from the blogs collection
          as: 'blogs' // The name of the field to populate
        }
      }
    ];

    const result = await settingsCollection.aggregate(pipeline).toArray();

    if (!result.length) {
      throw new Error('No settings or blogs found for the user.');
    }

    console.log(result); // Logs the combined result
    return result[0]; // Return the first result (as settings are usually unique per user)
  } catch (error: any) {
    console.error('Error fetching settings and blogs:', error);
    return { error: error.message };
  } finally {
    await mongoClient.close(); // Ensure the MongoDB connection is closed
  }
}


export async function transformResults(results: object[]) {
  return results.map(doc => ({
    ...doc,
    _id: null,
    id: doc._id.toString(), // Convert ObjectId to string
  }));
}

export async function createDefaultUserSettings(user: string) {
  const defaultUserSettings = {
    name: 'MainSettings',
    ClerkID: user,
    contentType: ["all", "uncategorized"],
    category: ["uncategorized"]
  }
  return defaultUserSettings
}


export async function getMainSettings(user: string) {
  console.log('here')
  try {
    if(!user) {
      console.log('No user provided')
      throw new Error('No user provided')
    }

    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio'); // Replace with your database name
    const collection = database.collection('Settings'); // Replace with your collection name
    const result = await collection.findOne({ name: 'MainSettings', ClerkID: user }); // Query by the `Title' field
    console.log(result)
    if (!result) {
      const defaultUserSettings = createDefaultUserSettings(user)
      await collection.insertOne(defaultUserSettings)
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

export async function addApiKeyToMainSettings(user: string, apiKey: string) {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('Next_JS_Portfolio');
    const collection = database.collection('Settings');
    const filter = { name: 'MainSettings', ClerkID: user }
    const update = {$set: {apiKey}}
    const options = { upsert: true };
    const result = await collection.findOne({ name: 'MainSettings', ClerkID: user }); 
    if (!result) {
      const defaultUserSettings = createDefaultUserSettings(user)
      await collection.insertOne(defaultUserSettings)
      addApiKeyToMainSettings(user, apiKey) //recursion the results
    }
    if (result) {
      const output = await collection.updateOne(filter, update, options)
      console.log(output)
      return output
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


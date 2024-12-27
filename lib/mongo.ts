import { MongoClient } from 'mongodb';

const globalForMongo = global as unknown as { mongoClient: MongoClient };

export const mongoClient = globalForMongo.mongoClient || new MongoClient(process.env.MONGODB_CONNECTION_URL!, { monitorCommands: true });

if (process.env.NODE_ENV !== 'production') globalForMongo.mongoClient = mongoClient;


// const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });

// client.on('commandStarted', started => console.log(started));
// client.db().collection('pets');
// await client.insertOne({ name: 'spot', kind: 'dog' });
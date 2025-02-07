import { MongoClient, GridFSBucket } from 'mongodb';

const globalForMongo = global as unknown as { mongoClient: MongoClient };

export const mongoClient = globalForMongo.mongoClient || new MongoClient(process.env.MONGODB_CONNECTION_URL!, { monitorCommands: true });

if (process.env.NODE_ENV !== 'production') globalForMongo.mongoClient = mongoClient;



const globalForGridFSBucket = global as unknown as { gridFSBucket: GridFSBucket };

export const gridFSBucket = globalForGridFSBucket.gridFSBucket || new GridFSBucket(mongoClient.db('Next_JS_Portfolio'), { bucketName: 'audioDB' });

if (process.env.NODE_ENV !== 'production') globalForGridFSBucket.gridFSBucket = gridFSBucket;



  
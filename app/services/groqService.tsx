import { MongoClient } from 'mongodb'; // Ensure you install mongodb package
import Groq from 'groq-sdk';
import { Readable } from 'stream';

// Initialize the Groq client
const groq = new Groq();

// MongoDB connection string
const mongoUri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
const client = new MongoClient(mongoUri);

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db('your_database_name'); // Replace with your database name
    const gridFSBucket = new GridFSBucket(database);
    
    const fileId = 'your_audio_file_id'; // Replace this with the actual ObjectId or filename
    const downloadStream = gridFSBucket.openDownloadStream(ObjectId(fileId));

    // Create a transcription job
    const transcription = await groq.audio.transcriptions.create({
      file: downloadStream, // Use the download stream instead of fs.createReadStream
      model: "whisper-large-v3-turbo", // Required model to use for transcription
      prompt: "Specify context or spelling", // Optional
      response_format: "json", // Optional
      language: "en", // Optional
      temperature: 0.0, // Optional
    });

    // Log the transcribed text
    console.log(transcription.text);
  } catch (error) {
    console.error('Error during transcription: ', error);
  } finally {
    await client.close();
  }
}

main();
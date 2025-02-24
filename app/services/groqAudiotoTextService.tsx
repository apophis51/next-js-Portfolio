

"use server"

import { gridFSBucket } from '@/lib/mongo';
import Groq from 'groq-sdk';
import { ObjectId } from 'mongodb';
import fs from "fs";
import path from 'path';
import crypto from 'crypto';
import { pipeline } from 'stream/promises'; // Use stream/promises for cleaner pipeline

// Initialize the Groq client

export async function groqAudio(audioID: string) {
    console.log('test message #1 - using fs.createReadStream');
    let tempFilePath: string | null = null; // Variable to hold temporary file path

    try {
        const groq = new Groq({ apiKey: process.env.GROQAPI });

        const fileId = new ObjectId(audioID);
        const downloadStream = gridFSBucket.openDownloadStream(fileId);

        // Create a temporary file path
        const uniqueFilename = `temp_audio_${crypto.randomBytes(16).toString("hex")}.m4a`; // Or .wav, depending on your audio type
        tempFilePath = path.join("/tmp", uniqueFilename); // Use /tmp directory for temporary files

        const writeStream = fs.createWriteStream(tempFilePath);

        // Pipe the downloadStream to the writeStream to save to a temporary file
        await pipeline(downloadStream, writeStream);

        console.log(`Audio downloaded to temporary file: ${tempFilePath}`);


        // Create a transcription job using fs.createReadStream on the temporary file
        const transcription = await groq.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath), // Now use fs.createReadStream on the temp file
            model: "whisper-large-v3-turbo",
            prompt: "Specify context or spelling",
            response_format: "json",
            language: "en",
            temperature: 0.0,
        }); 

        console.log(transcription.text);

        return transcription.text

    } catch (error) {
        console.error('Error during transcription: ', error);
    } finally {
        // Clean up: Delete the temporary file
        if (tempFilePath) {
            fs.unlink(tempFilePath, (err) => {
                if (err) {
                    console.error(`Error deleting temporary file: ${tempFilePath}`, err);
                } else {
                    console.log(`Temporary file deleted: ${tempFilePath}`);
                }
            });
        }
    }
}


/**
 * Transcribes an audio Blob using Groq's Whisper API.
 * @param audioBlob - The audio Blob (e.g., from a file input or recording)
 * @returns Transcribed text from the audio
 */
export async function transcribeBlob(audioBlob: Blob): Promise<string | null> {

    const groq = new Groq({ apiKey: process.env.GROQAPI });

    console.log("Starting audio transcription...");

    let tempFilePath: string | null = null;

    try {
        // Generate a temporary file path
        const uniqueFilename = `temp_audio_${crypto.randomBytes(16).toString("hex")}.m4a`;
        tempFilePath = path.join("/tmp", uniqueFilename);

        // Convert Blob to a Buffer
        const buffer = Buffer.from(await audioBlob.arrayBuffer());

        // Write the Buffer to a temporary file
        await fs.promises.writeFile(tempFilePath, buffer);
        console.log(`Audio saved to temporary file: ${tempFilePath}`);

        // Transcribe the audio using Groq Whisper API
        const transcription = await groq.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath),
            model: "whisper-large-v3-turbo",
            prompt: "Specify context or spelling",
            response_format: "json",
            language: "en",
            temperature: 0.0,
        });

        console.log("Transcription complete:", transcription.text);

        return transcription.text;
    } catch (error) {
        console.error("Error during transcription:", error);
        return null;
    } finally {
        // Clean up: Delete the temporary file
        if (tempFilePath) {
            fs.unlink(tempFilePath, (err) => {
                if (err) {
                    console.error(`Error deleting temporary file: ${tempFilePath}`, err);
                } else {
                    console.log(`Temporary file deleted: ${tempFilePath}`);
                }
            });
        }
    }
}



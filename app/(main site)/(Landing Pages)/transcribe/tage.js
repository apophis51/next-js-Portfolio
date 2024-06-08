import fs from "fs";
import OpenAI from "openai";


// curl --request POST   --url https://api.openai.com/v1/audio/transcriptions   --header "Authorization: Bearer yourapikeygoeshere"   --header 'Content-Type: multipart/form-data'   --form file=@'./cool.mp3'   --form model=whisper-1

// command ran from project in nextjs

// https://platform.openai.com/docs/api-reference/audio/createTranscription


const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("2024-05-12 04-58-00.mp4"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}
main();
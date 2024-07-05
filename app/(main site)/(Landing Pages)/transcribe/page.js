import fs from "fs";
import OpenAI from "openai";


// curl --request POST   --url https://api.openai.com/v1/audio/transcriptions   --header "Authorization: Bearer yourapikeygoeshere"   --header 'Content-Type: multipart/form-data'   --form file=@'./cool.mp3'   --form model=whisper-1

// command ran from project in nextjs

// https://platform.openai.com/docs/api-reference/audio/createTranscription


const openai = new OpenAI({ apiKey: process.env.OpenAI_API_KEY });

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("app/(main site)/(Landing Pages)/transcribe/cool.mp3"),
    model: "whisper-1",
  });
  return transcription.text
  console.log(transcription.text);
}

export default function transcrpitons(){
    let mychat = main()
    return(
        <div className = 'bg-white'>
            <h1>hello</h1>
            <p>{mychat}</p>
        </div>
    )
}
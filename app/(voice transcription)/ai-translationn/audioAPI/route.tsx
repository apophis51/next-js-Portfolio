import { gridFSBucket } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return new Response("Missing file ID", { status: 400 });
    }

    const fileId = new ObjectId(id);
    const chunks = [];

    const stream = gridFSBucket.openDownloadStream(fileId);
    

    const response = new Response(stream, {
        headers: {
          "Content-Type": "audio/wav", // Set the appropriate content type
        },
      });
      
      return response; // Return the response which is now streaming the audio


    await new Promise((resolve, reject) => {
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", resolve);
      stream.on("error", reject);
    });

    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching audio:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
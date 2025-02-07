import { gridFSBucket } from "@/lib/mongo";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return new Response("Missing file ID", { status: 400 });
    }

    const fileId = new ObjectId(id);
    const chunks = [];

    const stream = gridFSBucket.openDownloadStream(fileId);

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
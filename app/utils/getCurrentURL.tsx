
import { headers } from "next/headers";

export async function getCurrentURL(): Promise<string> {
  


    const header = await headers()
    const xurl = header.get('x-url');
    const path = xurl!.split('/').pop()

    return path ?? ''; //will return an empty string if path is undefined.
  }
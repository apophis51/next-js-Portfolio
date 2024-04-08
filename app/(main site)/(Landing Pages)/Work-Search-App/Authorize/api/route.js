

import { NextResponse } from 'next/server'
// import { updateApplied } from '../page'

import crypto from 'crypto'

function generateRandomSHA256Hash() {
  // Generate 32 random bytes (256 bits) using crypto.randomBytes()
  const randomBytes = crypto.randomBytes(32);

  // Create a hash object using the SHA-256 algorithm
  const hash = crypto.createHash('sha256');

  // Update the hash object with the random bytes
  hash.update(randomBytes);

  // Generate the hash digest in hexadecimal format
  const hashDigest = hash.digest('hex');

  return hashDigest;
}

export async function OPTIONS(){
    return NextResponse.json(
        { 
            data: {
                information: 'fuck yeah nigga'
            }
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, X-Requested-With",
            "Access-Control-Allow-Origin": "*",
            "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;"
          },
        })
}


export async function GET() {
   
    return NextResponse.json(
        { 
                hash: generateRandomSHA256Hash()
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Content-Security-Policy": "connect-src *;script-src 'unsafe-inline' *;"
          },
        })
    }

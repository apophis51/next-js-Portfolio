import { prisma } from '@/lib/prisma';
import { DataTexture } from 'three';

export async function fetchprediction() {
  let res = await fetch('https://cryptoai-production.up.railway.app/current/ethereum/1', { cache: 'no-store' })
  console.log('data fetched')
  if (!res.ok) {
    throw new Error('Failed to fetch Data');
  }
  return (res.json())
}

export async function fetchNewPrediction() {
  console.log('fetching new prediction')
  let res = await fetch('https://cryptoai-production.up.railway.app/new/ethereum/1', { cache: 'no-store' })
  console.log('data fetched')
  if (!res.ok) {
    throw new Error('Failed to fetch Data');
  }
  return (res.json())
}

// export async function fetchLastPrediction() {
//   const lastEntry = await prisma.ethPredictionData.findFirst({
//     orderBy: {
//       id: 'desc', // Replace 'id' with your actual primary key or timestamp column
//     },
//   });

//   console.log(Number(lastEntry.dateUnEdited));
// }

export async function updateDatabase(data) {
  console.log(data)
  try {
    await prisma.cryptoPredictionData.upsert({
      where: {
        dateUnEdited: data.dateUnEdited
      },
      update: {},
      create: {
        crypto: 'fsfsdff',
        predictionDays: 42,
        cryptoprediction: 34,
        recentprice: 23,
        recentDate: 'asdf',
        dateUnEdited: 535545
      }
    });
  }
  catch (error) { console.log('there was an error', error) }
}
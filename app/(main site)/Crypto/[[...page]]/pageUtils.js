import { prisma } from '@/lib/prisma';

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
  const smashedDataTypes = data.dateUnEdited +  data.crypto + data.predictionDays
  console.log(smashedDataTypes)
  try {
    await prisma.cryptoPredictionData.upsert({
      where: {
        uniqueId: smashedDataTypes
      },
      update: {},
      create: {
        uniqueId: smashedDataTypes,
        crypto: data.crypto,
        predictionDays: data.predictionDays,
        cryptoprediction: data.cryptoprediction,
        recentprice: data.recentprice,
        recentDate: data.recentDate,
        dateUnEdited: data.dateUnEdited
      }
    });
  }
  catch (error) { console.log('there was an error', error) }
}
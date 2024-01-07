import { prisma } from '@/lib/prisma';

export async function fetchprediction() {
  let res = await fetch('https://cryptoai-production.up.railway.app/currentethprediction', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch Data');
  }
  return (res.json())
}

export async function fetchNewPrediction() {
  let res = await fetch('https://cryptoai-production.up.railway.app/newethprediction', { cache: 'no-store' })
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
    await prisma.EthPredictionData.upsert({
      where: {
        dateUnEdited: data.dateUnEdited,
      },
      update: {},
      create: {
        dateUnEdited: data.dateUnEdited,
        recentDate: data.recentDate,
        recentprice: data.recentprice,
        ethprediction: data.ethprediction
      }
    });
  }
  catch (error) { console.log('there was an error', error) }
}
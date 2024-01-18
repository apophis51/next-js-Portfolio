import { prisma } from '@/lib/prisma';
 import {  EpochTime } from '@/app/(main site)/Components/Utils/PartyTime.js'; 


 export async function fetchprediction(coin, time='current') {
  let res = await calculatePrediction(coin, time)
  let epochTime = new EpochTime();
   console.log(epochTime.currentEpoch - res.dateUnEdited)
   if ((epochTime.currentEpoch - res.dateUnEdited) > epochTime.oneDayInMilliseconds) {
        console.log('fetching new prediction')
        res = await calculatePrediction(coin, 'new')
   }
   updateDatabase(res)
console.log(res)
 return (res)
 }

export async function calculatePrediction(coin, time='current') {
  let res = await fetch(`https://cryptoai-production.up.railway.app/${time}/${coin}/1`, { cache: 'no-store' })
  console.log(time)
 

  console.log('data fetched')
  if (!res.ok) {
    console.log('failed to fetch')
    throw new Error('Failed to fetch Data');
  }
  return (res.json())
}

// export async function fetchprediction(coin) {
//   let res = await fetch(`https://cryptoai-production.up.railway.app/current/${coin}/1`, { cache: 'no-store' })
//   console.log(res)
//   console.log('data fetched')
//   if (!res.ok) {
//     throw new Error('Failed to fetch Data');
//   }
//   return (res.json())
// }

// export async function fetchNewPrediction() {
//   console.log('fetching new prediction')
//   let res = await fetch('https://cryptoai-production.up.railway.app/new/ethereum/1', { cache: 'no-store' })
//   console.log('data fetched')
//   if (!res.ok) {
//     throw new Error('Failed to fetch Data');
//   }
//   return (res.json())
// }

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
  const smashedDataTypes = data.dateUnEdited +'$'+  data.crypto +'$'+ data.predictionDays
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
'use server'
import { prisma } from '@/lib/prisma';

console.log('hit')
export default async function getDataBaseResults() {
    console.log('hit')
    const result = await prisma.recievedEmails.findMany()
    console.log(result)
    console.log('triggered')
    return result
}
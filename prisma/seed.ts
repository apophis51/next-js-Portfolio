import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

const loader = ['']


async function main() {
    const password = await hash('test', 12)
    const user = await prisma.user.upsert({
        where: { email: 'testem@test.com'},
        update: {},
        create: {
            email: 'testem@test.com',
            name: 'Test User',
            password: password
        },
    })


    await prisma.user.upsert({
        where: { email: 'admin@admin.com'},
        update: {},
        create: {
            email: 'admin@admin.com',
            name: 'admin',
            password: await hash('admin', 12)
        },
    })
    // console.log({user})


    await prisma.phoneEmailUnsubscribe.upsert({
        where: { email: 'testuser@hotmail.com'},
        update: {},
        create: {
            email: 'testuser@hotmail.com',
            name: 'Test User',
        },
    })

    await prisma.phoneEmailUnsubscribe.upsert({
        where: { email: 'shawn@hotmail.com'},
        update: {},
        create: {
            email: 'shawn@hotmail.com',
            name: 'schawn schwier',
        },
    })
   for (let x of loader ){
    console.log("adding " + x)
    await prisma.phoneEmailUnsubscribe.upsert({
        where: { email: x},
        update: {},
        create: {
            email: x,
            name: 'noname',
        },
    })
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
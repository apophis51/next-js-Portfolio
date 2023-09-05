import { prisma } from '@/lib/prisma';

export default async function Home() {
    const user = await prisma.user.findFirst({
        where: {
            email: 'test@test.com'
    }
})
    return <main className='bg-white'>Hello, {user?.name} </main>
}
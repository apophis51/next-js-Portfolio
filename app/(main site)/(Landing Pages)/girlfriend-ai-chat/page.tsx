'use client'

export const dynamic = 'force-dynamic'

import GirlxAiDisplay from './GirlxAiDisplay'
import Container from '@mui/material/Container';
import Link from 'next/link';


export default function girlfriendAiChat() {

    return (
        <Container maxWidth="xl"  >   
        <div className="flex flex-col gap-4 overflow-x-hidden">
           <Link href='/PurchaseMenu/girlfriend-ai-chat' ><button className='btn bg-pink-700 text-white w-full'>Buy GirlxAI Chat Now! - Black Friday Discount</button></Link>
            <div>
                <GirlxAiDisplay />
            </div>
        </div>
        </Container>
    );
}
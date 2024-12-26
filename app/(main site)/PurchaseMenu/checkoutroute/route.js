import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {EpochTime} from '@/app/(main site)/Components/Utils/PartyTime'


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

export async function POST(data) {

    // let userRequesting = await getUserId()
    // console.log(userRequesting)
    let req = await headers()
    let session = null
    console.log(data.nextUrl.searchParams)
    let productPriceId = data.nextUrl.searchParams.get("product")
    let subscriptionMode = data.nextUrl.searchParams.get("subscription-mode")
    let userIdData = data.nextUrl.searchParams.get("userId")
    let productName = data.nextUrl.searchParams.get("productName")
    let expire = data.nextUrl.searchParams.get("expire")
    let credits = data.nextUrl.searchParams.get("credits")
    let originPath = data.nextUrl.searchParams.get("originPath")


    if (subscriptionMode != 'payment') {
        subscriptionMode = 'subscription'
    }
    try {
        let currentUTCTime = (new EpochTime()).standard_UTC_Format
        // Create Checkout Sessions from body params.
        session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: productPriceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: userIdData,
                timeOrdered: currentUTCTime,
                productName: productName,
                expire: expire,
                credits: credits
              },
            // mode: 'payment',
            // mode: 'subscription',
            mode: subscriptionMode,
            success_url: `${req.get('origin')}/${originPath}`,
            cancel_url: `${req.get('origin')}/?canceled=true`,
            automatic_tax: { enabled: true },
        });
        console.log(session)
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
    }
    redirect(session.url)
}


import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import * as responseUtils from '@/app/(main site)/(Landing Pages)/Work-Search-App/api/responseUtils'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = "whsec_7d827d24ac63d8ed989a538f76c3136f59dbd55a2ee8835069bc186c46598194";

async function getRawBody(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}


export async function POST(data) {
    const sig = headers().get('stripe-signature')
    //  console.log(data.headers)
    console.log(sig)


    let event = ''
    let body = await data.body
    const rawBody = await getRawBody(body)
    // body = await body.toString()

    console.log(rawBody)

    try {
        console.log('triggered')
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        console.log(event)
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
    }
    let paymentIntentSucceeded = null
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            paymentIntentSucceeded = event.data.object;
            console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`);
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json(
        {
            data: {
                information: 'Your job application has been submitted. Thank you for using WorkSearchApp.',
                logs: paymentIntentSucceeded.ammount
            }
        },
        responseUtils.allowCors)
}


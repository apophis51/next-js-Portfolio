import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import * as responseUtils from '@/app/(main site)/(Landing Pages)/Work-Search-App/responseUtils';
import {createNewMetaData, get_generic_meta_data_with_user_id} from "@/app/(main site)/Components/Utils/authMetaData"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const endpointSecret = 'whsec_7d827d24ac63d8ed989a538f76c3136f59dbd55a2ee8835069bc186c46598194';
const endpointSecret = 'whsec_70JVSKV3HIhEGVZOBGAcSOLdmYiQOF1p';

/**
 * Get the raw request body.
 * 
 * @param {object} readable - The readable stream.
 * @returns {Promise<Buffer>}
 */
async function getRawBody(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

/**
 * Handle incoming Stripe webhook requests.
 * 
 * @param {object} data - The request data.
 * @returns {Promise<NextResponse>}
 */
export async function POST(data) {
    const sig = (await headers()).get('stripe-signature');
    // const sig = 'whsec_70JVSKV3HIhEGVZOBGAcSOLdmYiQOF1p'
    console.log(sig)
    let event = null;

    try {
        // Verify the Stripe signature
        // const rawBody = await getRawBody(data.body);
        const rawBody = await data.text()
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`);
                return NextResponse.json(
                    {
                        data: {
                            information: 'Your Payment has Been Submitted. Thank You!',
                            logs: paymentIntentSucceeded.amount,
                        }
                    },
                    responseUtils.allowCors
                );

            // ... handle other event types
            case 'checkout.session.completed':
                const metadata = event.data.object.metadata;
                console.log('Metadata:', metadata);
                // let currentMetaData = await get_generic_meta_data_with_user_id(metadata.userId)
                // let TotalCredits = currentMetaData[metadata.productName]?.TotalCredits
                // if (!TotalCredits) {
                //     TotalCredits = 0
                // }
                // let alteredMetadata = {...metadata, TotalCredits: TotalCredits + parseInt(metadata.credits)}
                // console.log('Altered Metadata:', alteredMetadata)

                //     await createNewMetaData(metadata.productName, alteredMetadata, metadata.userId)
                    await createNewMetaData(metadata.productName, metadata, metadata.userId)

                // Return a 200 status to acknowledge the request
                return NextResponse.json(
                    {
                        data: {
                            information: 'Your Payment has Been Submitted. Thank You!',
                            metadata: metadata,
                        }
                    },
                    responseUtils.allowCors
                );
            default:
                console.log(`Unhandled event type ${event.type}`);
                // Return a 200 status to acknowledge the request
                return NextResponse.json(
                    {
                        data: {
                            information: 'Your Payment has Been Submitted. Thank You!',
                        }
                    },
                    responseUtils.allowCors
                );
        }
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        // Return a 400 status to indicate a bad request
        return NextResponse.json(
            {
                data: {
                    error: err.message,
                }
            },
            {
                status: 400,
                ...responseUtils.allowCors,
            },
        );
    }
}
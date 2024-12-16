import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

export async function POST(data) {
    let req = await headers()
    let session = null
    console.log(data.nextUrl.searchParams)
    let productPriceId = data.nextUrl.searchParams.get("product")
    let subscriptionMode = data.nextUrl.searchParams.get("subscription-mode")
    if (subscriptionMode != 'payment') {
        subscriptionMode = 'subscription'
    }
    try {
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
                cart_id: 'cart_6943',
              },
            // mode: 'payment',
            // mode: 'subscription',
            mode: subscriptionMode,
            success_url: `${req.get('origin')}/?success=true`,
            cancel_url: `${req.get('origin')}/?canceled=true`,
            automatic_tax: { enabled: true },
        });
        console.log(session)
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
    }
    redirect(session.url)
}


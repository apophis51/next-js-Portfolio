import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

export async function POST(data) {
    let req = await headers()
    let session = null
    let productPriceId = data.nextUrl.searchParams.get("product")
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
            // mode: 'payment',
            mode: 'subscription',
            success_url: `${req.get('origin')}/?success=true`,
            cancel_url: `${req.get('origin')}/?canceled=true`,
            automatic_tax: { enabled: true },
        });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
    }
    redirect(session.url)
}


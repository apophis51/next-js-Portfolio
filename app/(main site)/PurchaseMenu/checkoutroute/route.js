import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

export async function POST(data) {
    let req = headers()
    let session = null
    try {
        // Create Checkout Sessions from body params.
        session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1Nm0wECBn6LU6bJVnClXDHZX',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.get('origin')}/?success=true`,
            cancel_url: `${req.get('origin')}/?canceled=true`,
            automatic_tax: { enabled: true },
        });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
    }
    redirect(session.url)
}


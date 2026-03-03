import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia' as any,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS
    const origin = req.headers.origin as string || '';
    const allowedOrigins = ['http://localhost:8080', 'http://localhost:8888'];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : '*';

    res.setHeader('Access-Control-Allow-Origin', corsOrigin);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    console.log('--- Incoming Checkout Request ---');
    console.log('Method:', req.method);
    console.log('Origin:', origin);

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        console.warn('Invalid method:', req.method);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { productName, price, woodType, engravingText, ribbonColor, imageUrl } = req.body;

        console.log('Payload:', { productName, price, woodType });

        if (!productName || !price) {
            console.error('Validation failed: Missing productName or price');
            return res.status(400).json({ error: 'Missing required product parameters' });
        }

        // Determine the base URL for redirection after checkout
        const redirectBase = origin || 'https://sevenmark.vercel.app';
        console.log('Redirection Base:', redirectBase);

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${redirectBase}/success`,
            cancel_url: `${redirectBase}/shop?canceled=true`,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Sevenmark ${productName}`,
                            description: `Custom ${woodType} Box with ${ribbonColor} ribbon. Engraving: "${engravingText || 'None'}"`,
                            images: imageUrl ? [`${redirectBase}${imageUrl}`] : [],
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                productName,
                woodType,
                engravingText: engravingText || 'None',
                ribbonColor,
            },
        });

        console.log('Stripe Session Created:', session.id);

        return res.status(200).json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('--- Stripe Checkout Error ---');
        console.error('Type:', error.type);
        console.error('Message:', error.message);
        if (error.raw) console.error('Raw Error:', JSON.stringify(error.raw, null, 2));

        return res.status(error.statusCode || 500).json({
            error: error.message || 'Internal Server Error',
            type: error.type || 'unknown_error'
        });
    }
}

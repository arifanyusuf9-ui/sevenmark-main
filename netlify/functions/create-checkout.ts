import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia' as any, // Cast to any to avoid strict version mismatch with SDK types
});

export const handler: Handler = async (event) => {
    // Handle CORS
    const origin = event.headers.origin || '';
    const allowedOrigins = ['http://localhost:8080', 'http://localhost:8888'];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : '*';

    const headers = {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    console.log('--- Incoming Checkout Request ---');
    console.log('Method:', event.httpMethod);
    console.log('Origin:', origin);

    // Handle preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        console.warn('Invalid method:', event.httpMethod);
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { productName, price, woodType, engravingText, ribbonColor, imageUrl } = body;

        console.log('Payload:', { productName, price, woodType });

        if (!productName || !price) {
            console.error('Validation failed: Missing productName or price');
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required product parameters' }),
            };
        }

        // Determine the base URL for redirection after checkout
        // We use the origin from the request to ensure we redirect back to the correct place (dev or prod)
        const redirectBase = origin || 'https://sevenmark.netlify.app';
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
                        unit_amount: price * 100, // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            // Attach the custom data so we can read it in the webhook later
            metadata: {
                productName,
                woodType,
                engravingText: engravingText || 'None',
                ribbonColor,
            },
        });

        console.log('Stripe Session Created:', session.id);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ sessionId: session.id, url: session.url }),
        };
    } catch (error: any) {
        console.error('--- Stripe Checkout Error ---');
        console.error('Type:', error.type);
        console.error('Message:', error.message);
        if (error.raw) console.error('Raw Error:', JSON.stringify(error.raw, null, 2));

        return {
            statusCode: error.statusCode || 500,
            headers,
            body: JSON.stringify({
                error: error.message || 'Internal Server Error',
                type: error.type || 'unknown_error'
            }),
        };
    }
};

import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia' as any,
});

// We recommend adding a STRIPE_WEBHOOK_SECRET to your .env later for production security
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let stripeEvent: Stripe.Event;

    try {
        const sig = event.headers['stripe-signature'];

        // If webhook secret exists, verify it (best practice for production)
        if (webhookSecret && sig) {
            stripeEvent = stripe.webhooks.constructEvent(event.body!, sig, webhookSecret);
        } else {
            // For fast local dev without webhook secrets configured yet
            stripeEvent = JSON.parse(event.body!);
        }
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }

    // Handle the checkout.session.completed event
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;

        const metadata = session.metadata || {};
        const customerEmail = session.customer_details?.email || 'Unknown Email';
        const customerName = session.customer_details?.name || 'Unknown Name';

        try {
            // 1. Log to Supabase Database
            const { error: dbError } = await supabase
                .from('orders')
                .insert({
                    stripe_session_id: session.id,
                    customer_email: customerEmail,
                    customer_name: customerName,
                    product_name: metadata.productName || 'Unknown Product',
                    amount_total: session.amount_total || 0,
                    wood_type: metadata.woodType || null,
                    engraving_text: metadata.engravingText || null,
                    ribbon_color: metadata.ribbonColor || null,
                    status: 'paid',
                });

            if (dbError) {
                console.error('Supabase Insert Error:', dbError);
                throw new Error('Failed to save order to database.');
            }

            // 2. Send Notification Email via Resend
            const emailHtml = `
        <h1>New Custom Order from Sevenmark!</h1>
        <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Product:</strong> ${metadata.productName} - $${(session.amount_total! / 100).toFixed(2)}</p>
        <hr />
        <h3>Customizations:</h3>
        <ul>
          <li><strong>Wood:</strong> ${metadata.woodType}</li>
          <li><strong>Ribbon:</strong> ${metadata.ribbonColor}</li>
          <li><strong>Engraving:</strong> "${metadata.engravingText}"</li>
        </ul>
      `;

            await resend.emails.send({
                // Note: Resend requires a verified domain to send FROM. We use their test 'onboarding' email by default
                from: 'Sevenmark Orders <onboarding@resend.dev>',
                to: ['arifanyusuf9@gmail.com'], // Updated notification email
                subject: `[NEW ORDER] ${metadata.productName} for ${customerName}`,
                html: emailHtml,
            });

            console.log('Order processed successfully!');
        } catch (error) {
            console.error('Error processing successful checkout:', error);
            return { statusCode: 500, body: 'Error processing order' };
        }
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
};

import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const resend = new Resend(process.env.RESEND_API_KEY);

// Vercel requires raw body for Stripe webhook verification
export const config = {
    api: {
        bodyParser: false,
    },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    let stripeEvent: Stripe.Event;

    try {
        const rawBody = await getRawBody(req);
        const sig = req.headers['stripe-signature'] as string;

        if (webhookSecret && sig) {
            stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
        } else {
            stripeEvent = JSON.parse(rawBody.toString());
        }
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        console.log('Processing session:', session.id);

        const metadata = session.metadata || {};
        const customerEmail = session.customer_details?.email || 'Unknown Email';
        const customerName = session.customer_details?.name || 'Unknown Name';

        // 1. Log to Supabase Database
        try {
            console.log('Attempting Supabase insert for:', customerEmail);
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
                console.error('Supabase DB Error Details:', JSON.stringify(dbError, null, 2));
            } else {
                console.log('Supabase insert success!');
            }
        } catch (dbErr) {
            console.error('Unexpected Supabase Error:', dbErr);
        }

        // 2. Send Notification Email via Resend
        try {
            console.log('Attempting Resend email to:', 'arifanyusuf9@gmail.com');
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

            const emailResponse = await resend.emails.send({
                from: 'Sevenmark Orders <onboarding@resend.dev>',
                to: ['arifanyusuf9@gmail.com'],
                subject: `[NEW ORDER] ${metadata.productName} for ${customerName}`,
                html: emailHtml,
            });
            console.log('Resend Response:', JSON.stringify(emailResponse, null, 2));
        } catch (emailErr) {
            console.error('Resend Email Error:', emailErr);
        }
    }

    return res.status(200).json({ received: true });
}

import { stripe } from "../stripe-server";

export async function handlePaymentRequest(req, res) {
    try {
        const { amount } = await req.body;
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create({
            customer: customer.id,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.STRIPE_PUBLIC_KEY,
        });
    } catch (error) {
        console.error("Error handling payment request:", error);
        res.status(500).json({ error: error.message });
    }
}

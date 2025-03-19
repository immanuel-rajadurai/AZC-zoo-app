import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-11-20.acacia",
    appInfo: {
        name: "AZC App",
        version: "1.0.0",
    },

});
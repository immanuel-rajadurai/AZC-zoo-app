import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripeKey = process.env.STRIPE_SECRET_KEY;
export const stripe = new Stripe(stripeKey, {
    apiVersion: "2023-10-16",
    appInfo: {
        name: "AZC App",
        version: "1.0.0",
    },

});
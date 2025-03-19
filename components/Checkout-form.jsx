import { useStripe } from '@stripe/stripe-react-native';
import React from 'react';
import { Button } from 'react-native';
import * as Linking from 'expo-linking';

async function fetchPaymentSheetParams() {
    const response = await fetch('api/payment-sheet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

export default function CheckoutForm({ amount }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = React.useState(false);

    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer, publishableKey } = await fetchPaymentSheetParams();
        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Your app name',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                phone: '1-800-555-1234',
            },
            returnURL: Linking.createURL("stripe-redirect"),
        });
        
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        
        if (error) {
            console.log(`Error: ${error.code}`, error.message);
        } else {
            console.log('Success', 'Payment complete');
        }
        
        setLoading(false);
    };
    
    React.useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <Button
            title="Buy Ticket"
            disabled={!loading}
            onPress={openPaymentSheet}
        />
    );
}
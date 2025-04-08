import { useStripe } from '@stripe/stripe-react-native';
import { useState, useEffect } from 'react';
import { Alert, Button } from 'react-native';
import * as Linking from 'expo-linking';

async function fetchPaymentSheetParams(amount) {
  try {
    const response = await fetch('/api/payment-sheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment params from backend');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching payment sheet params:', error);
    return null;
  }
}

export default function CheckoutForm({ amount }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initializePaymentSheet = async () => {
    console.log('[Stripe] Initializing payment sheet for amount:', amount);

    const params = await fetchPaymentSheetParams(amount);
    if (!params) {
      setErrorMessage('Failed to fetch payment details');
      return;
    }

    const { paymentIntent, ephemeralKey, customer } = params;

    if (!initPaymentSheet) {
      console.warn('[Stripe] initPaymentSheet is undefined (likely Expo Go)');
      setReady(true);
      return;
    }

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Your app name',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      returnURL: Linking.createURL('stripe-redirect'),
    });

    if (error) {
      console.error('[Stripe] Error initializing payment sheet:', error);
      setErrorMessage(error.message);
    } else {
      console.log('[Stripe] Payment sheet initialized successfully.');
      setReady(true);
    }
  };

  const openPaymentSheet = async () => {
    console.log('[Stripe] Attempting to present payment sheet...');

    if (!presentPaymentSheet) {
      Alert.alert(
        'Test Mode (Expo Go)',
        'Stripe payment sheet would appear here if using a custom dev client.'
      );
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.error('[Stripe] Payment failed:', error);
      Alert.alert('Payment Error', error.message);
    } else {
      Alert.alert('Success', 'Your payment was successful!');
    }

    setReady(false); // Reset after attempt
  };

  useEffect(() => {
    if (amount > 0) {
      initializePaymentSheet();
    }
  }, [amount]);

  return (
    <>
      {errorMessage !== '' && Alert.alert('Error', errorMessage)}
      <Button
        title={presentPaymentSheet ? 'Buy Ticket' : 'Simulate Buy (Expo Go)'}
        disabled={!ready}
        onPress={openPaymentSheet}
      />
    </>
  );
}

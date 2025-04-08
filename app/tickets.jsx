import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import CheckoutForm from '../components/Checkout-form';
import StripeProvider from '../components/StripeProvider';

export default function TicketsScreen() {
  const [amount, setAmount] = useState('');

  return (
    <StripeProvider>
      <View>
        <Text style={styles.title}>Enter Ticket Amount</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <CheckoutForm amount={parseFloat(amount) > 0 ? parseFloat(amount) : 0} />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});



 // <SafeAreaView style={{ flex: 1 }}>
    //     {/* <WebView 
    //         source={{ uri: 'https://zsllondonzoo.seetickets.com/zsl/zsl-london-zoo?_gl=1*1ad2eww*_gcl_au*MTcxMjM1MjUyNC4xNzI5NTg4NDE2*_ga*MTM4MjAzNTM0Ny4xNzI5NTg4NDE2*_ga_MWZNHV9X89*MTcyOTU4ODQxNS4xLjAuMTcyOTU4ODQxNS42MC4wLjA.'}}
    //         style={{ flex: 1 }} 
    //     /> */}
    // </SafeAreaView>
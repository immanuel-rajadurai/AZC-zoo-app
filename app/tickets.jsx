import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import WebView from 'react-native-webview';

const Tickets = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <WebView 
            source={{ uri: 'https://zsllondonzoo.seetickets.com/zsl/zsl-london-zoo?_gl=1*1ad2eww*_gcl_au*MTcxMjM1MjUyNC4xNzI5NTg4NDE2*_ga*MTM4MjAzNTM0Ny4xNzI5NTg4NDE2*_ga_MWZNHV9X89*MTcyOTU4ODQxNS4xLjAuMTcyOTU4ODQxNS42MC4wLjA.'}}
            style={{ flex: 1 }} 
        />
    </SafeAreaView>
  );
};

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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff', 
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tickets;

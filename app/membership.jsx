import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import WebView from 'react-native-webview';

const Membership = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <WebView 
            source={{ uri: 'https://www.londonzoo.org/plan-your-visit/london-zoo-membership'}}
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

export default Membership;

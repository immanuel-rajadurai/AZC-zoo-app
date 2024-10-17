import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
// import * as ImagePicker from 'expo-image-picker';


const Wallet = () => {

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      console.log('DocumentPicker result:', result);
  
    
        const { uri, name } = result.assets[0];
        console.log('URI:', uri, 'Name: ', name);
  
        const localPath = FileSystem.documentDirectory + name;
  
        await FileSystem.copyAsync({
          from: uri,
          to: localPath,
        });
  
        console.log('File saved to local cache:', localPath);

        const fileExists = await FileSystem.getInfoAsync(localPath);
        console.log('File exists in cache:', fileExists.exists);

    
    } catch (error) {
      console.error('Error picking or saving document:', error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Pick a Document</Text>
        <Button title="Choose File" onPress={pickDocument} />
      </View>
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

export default Wallet;

import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { icons } from '../constants';
import FileCard from '../components/FileCard'; // Import your FileCard component
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Pdf from 'react-native-pdf'; // Import Pdf for PDF viewing

const Wallet = () => {
  const [files, setFiles] = useState([]); // Store files
  const [selectedFile, setSelectedFile] = useState(null); // Store selected file for viewing
  const [showViewer, setShowViewer] = useState(false); // Modal state for showing selected file

  // Function to pick a document
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/png', 'image/jpeg', 'application/pdf'],
        copyToCacheDirectory: true,
      });
      console.log('DocumentPicker result:', result);

      if (result.type === 'cancel') {
        return; // If user cancels, do nothing
      }

      const { uri, name, mimeType } = result.assets[0]; // Access first asset
      console.log('URI:', uri, 'Name: ', name, 'mimeType: ', mimeType );
      const localPath = FileSystem.documentDirectory + name;

      const isDuplicate = files.some((file) => file.name === name || file.uri === uri);
      if (isDuplicate) {
      Alert.alert("Duplicate File", "This file has already been selected.");
      return; // Stop here if file is a duplicate
      }

      // Copy file to local filesystem
      await FileSystem.copyAsync({
        from: uri,
        to: localPath,
      });

      console.log('File saved to local cache:', localPath);

      const newFile = { uri: localPath, name, type: mimeType };

      // Add the new file to state and AsyncStorage
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, newFile];
        AsyncStorage.setItem('files', JSON.stringify(updatedFiles)); // Store updated files in AsyncStorage
        console.log('File stored in: ', newFile.uri);
        return updatedFiles;
      });
    } catch (error) {
      console.error('Error picking or saving document:', error);
    }
  };

  // Load files from AsyncStorage on component mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const storedFiles = await AsyncStorage.getItem('files');
        if (storedFiles) {
          setFiles(JSON.parse(storedFiles));
        }
      } catch (error) {
        console.error('Failed to load files from AsyncStorage', error);
      }
    };

    loadFiles();
  }, []);

  // Function to handle file press and show it in full screen
  const handleFilePress = (file) => {
    setSelectedFile(file);
    setShowViewer(true); // Show modal with file viewer
  };

  const deleteFile = async (fileUri) => {
    Alert.alert(
      "Delete File",
      "Are you sure you want to delete this file?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const updatedFiles = files.filter((file) => file.uri !== fileUri);
              setFiles(updatedFiles);
        
              // Update AsyncStorage with the remaining files
              await AsyncStorage.setItem('files', JSON.stringify(updatedFiles));
        
              // Optionally, delete the file from the local file system if needed
              await FileSystem.deleteAsync(fileUri);
              console.log('File deleted:', fileUri);
            } catch (error) {
              console.error('Error deleting file:', error);
            }
            

          }
        }
      ],
      { cancelable: true }
    )
    
  };

  const FileList = ({ files, onFilePress }) => {
    return (
      <FlatList
        data={files}
        keyExtractor={(item) => item.uri} // Unique key based on file URI
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onFilePress(item)}>
            <FileCard
              title={item.name}
              thumbnail={
                item.type.startsWith('image/')
                  ? item.uri
                  : item.type === 'application/pdf'
                    ? icons.pdf // Use your PDF icon here
                    : icons.file // Default file icon for other types
              }
              fileUri={item.uri} // Pass the file URI to FileCard for deletion
              onDelete={(deleteFile)}
            />
          </TouchableOpacity>
        )}
      />
    );
  };
  
  

  return (
    <SafeAreaView style={{ flex: 1 }} paddingTop={-100} >
      {/* If no files, show a message */}
      {files.length === 0 ? (
        <View style={styles.centeredView}>
          <Text style={styles.noFilesText}>Please select your Ticket</Text>
        </View>
      ) : (
        <FileList files={files} onFilePress={handleFilePress} />
      )}

      {/* Button to pick a new document */}
      <TouchableOpacity
        style={{ position: 'absolute', right: 20, bottom: 40 }}
        onPress={pickDocument}
      >
        <Image
          source={icons.plusButton}
          style={{ width: 110, height: 80 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Modal for showing selected image or PDF in full screen */}
      {selectedFile && (
        <Modal visible={showViewer} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowViewer(false)}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
            {selectedFile.type.startsWith('image/') ? (
              <Image source={{ uri: selectedFile.uri }} style={styles.fullScreenImage} />
            ) : (
              <Pdf source={{ uri: selectedFile.uri }} style={styles.fullScreenPdf} />
            )}
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

// FileList component to display list of files

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFilesText: {
    fontSize: 18,
    color: '#888',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'transparent',
    padding: 15,   
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  fullScreenPdf: {
    width: '90%',
    height: '80%',
  },
});

export default Wallet;

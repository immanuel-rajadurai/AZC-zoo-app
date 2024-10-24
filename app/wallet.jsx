import { View, Text, StyleSheet, Button, FlatList, Alert, Image, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

const Wallet = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedFileUri, setSelectedFileUri] = useState(null); // State to hold the selected file URI
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [base64PDF, setBase64PDF] = useState(null); // State to hold the Base64 PDF string

  // Function to fetch files from the document directory
  const fetchFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      const filteredFiles = files.filter(file =>
        file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.pdf')
      );
      console.log('Files in document directory:', filteredFiles);
      setFileList(filteredFiles);
    } catch (error) {
      console.error('Error reading document directory:', error);
    }
  };

  // Use effect to fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.fileItemContainer}>
      <Text style={styles.fileItem}>{item}</Text>
      <Button title="Open" onPress={() => openDocument(item)} />
    </View>
  );

  const openDocument = async (fileName) => {
    const fileUri = FileSystem.documentDirectory + fileName;
    console.log('Attempting to open:', fileUri);

    if (fileName.endsWith('.pdf')) {
      try {
        // Read the PDF file as Base64
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64PDF(base64); // Set the Base64 PDF string
        setSelectedFileUri(fileUri); // Set the selected file URI for reference
      } catch (error) {
        console.error('Error reading PDF file:', error);
        Alert.alert('Error', 'Unable to open the PDF file.');
        return;
      }
    } else if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
      setSelectedFileUri(fileUri); // Set the selected image URI
    } else {
      Alert.alert('File Format Not Supported', 'Currently, only PDF files and images can be opened.');
      return;
    }

    setModalVisible(true); // Show the modal
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      if (result.assets) {
        const { uri, name } = result.assets[0];
        const localPath = FileSystem.documentDirectory + name;

        await FileSystem.copyAsync({
          from: uri,
          to: localPath,
        });

        console.log('File saved to local cache:', localPath);
        fetchFiles(); // Refresh file list
      }
    } catch (error) {
      console.error('Error picking or saving document:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Pick a Document</Text>
        <Button title="Choose File" onPress={pickDocument} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>User Files in Document Directory</Text>
        {fileList.length > 0 ? (
          <FlatList
            data={fileList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No user files found</Text>
        )}
      </View>

      {/* Modal for displaying images and PDFs */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setBase64PDF(null); // Reset Base64 string when closing modal
        }}
      >
        <View style={styles.modalContainer}>
          {selectedFileUri && selectedFileUri.endsWith('.pdf') && base64PDF ? (
            <WebView 
              source={{ uri: `data:application/pdf;base64,${base64PDF}` }} 
              style={{ flex: 1 }} 
              onError={() => Alert.alert('Error loading PDF')}
              startInLoadingState={true}
            />
          ) : (
            selectedFileUri && <Image source={{ uri: selectedFileUri }} style={styles.image} />
          )}
          <Button title="Close" onPress={() => {
            setModalVisible(false);
            setSelectedFileUri(null); // Reset selected file URI when closing modal
          }} />
        </View>
      </Modal>
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
  fileItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  fileItem: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Wallet;

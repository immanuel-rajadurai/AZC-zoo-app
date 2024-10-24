import { View, Text, StyleSheet, Button, FlatList, Alert, Image, Modal, Linking } from 'react-native';
import { React, useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';

const Wallet = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  useEffect(() => {
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
      // Use Linking to open PDF files
      await Linking.openURL(fileUri);
    } else if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
      // Display image in a modal or new screen
      setSelectedImage(fileUri); // Set the selected image URI
      setModalVisible(true); // Show the modal
    } else {
      Alert.alert('File Format Not Supported', 'Currently, only PDF files can be opened in a browser.');
    }
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

      {/* Modal for displaying images */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
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

import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import * as FileSystem from 'expo-file-system';
import labels from '../../assets/labels.json'; 
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { animalImages, animalData } from '../../data/animals';
import { ModelContext } from '../modelContext';
import { fetch } from '@tensorflow/tfjs-react-native';
import { Asset } from 'expo-asset';
import peacock from '../../assets/animalImages/ostrich.jpg';


const Challenge = () => {

  const [model, setModel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(true);
  const [predictions, setPredictions] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [zooAnimals, setZooAnimals] = useState([]);
  const [scannedAnimals, setScannedAnimals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // const loadedModel = useContext(ModelContext);

  useEffect(() => {

    const loadZooAnimals = async () => {
      try {
        const storedAnimals = await AsyncStorage.getItem('zooAnimals');
  
        if (storedAnimals) {
          setZooAnimals(JSON.parse(storedAnimals));
        } else {
          const initialAnimals = ['Lion', 'Elephant', 'Giraffe', 'Zebra', 'Monkey'];
          setZooAnimals(initialAnimals);
          await AsyncStorage.setItem('zooAnimals', JSON.stringify(initialAnimals));
        }

      } catch (error) {
        console.error('Failed to load zoo animals', error);
      }

      try {
        const scannedAnimals = await AsyncStorage.getItem('scannedAnimals');
  
        if (scannedAnimals) {
          setScannedAnimals(JSON.parse(scannedAnimals));
        } else {
          const emptyScannedAnimals = [];
          setScannedAnimals(emptyScannedAnimals);
          await AsyncStorage.setItem('scannedAnimals', JSON.stringify(emptyScannedAnimals));
        }

      } catch (error) {
        console.error('Failed to load zoo animals', error);
      }
  
    };
    
    loadZooAnimals();
  }, []);  

  useEffect(() => {
    console.log("target animals: ", zooAnimals);
  }, [zooAnimals]);

  useEffect(() => {

    async function loadModel() {

        setModelLoaded(false);

        console.log("waiting for tf to be ready")
        await tf.ready();

        console.log("TF is successfully ready")

        const modelJson = require('../../assets/mobilenet_model/model.json');
        const shard1 = require('../../assets/mobilenet_model/group1-shard1of3.bin');
        const shard2 = require('../../assets/mobilenet_model/group1-shard2of3.bin');
        const shard3 = require('../../assets/mobilenet_model/group1-shard3of3.bin');

        // const shard4 = require('../../assets/model/group1-shard4of25.bin');
        // const shard5 = require('../../assets/model/group1-shard5of25.bin');
        // const shard6 = require('../../assets/model/group1-shard6of25.bin');
        // const shard7 = require('../../assets/model/group1-shard7of25.bin');
        // const shard8 = require('../../assets/model/group1-shard8of25.bin');
        // const shard9 = require('../../assets/model/group1-shard9of25.bin');
        // const shard10 = require('../../assets/model/group1-shard10of25.bin');
        // const shard11 = require('../../assets/model/group1-shard11of25.bin');
        // const shard12 = require('../../assets/model/group1-shard12of25.bin');
        // const shard13 = require('../../assets/model/group1-shard13of25.bin');
        // const shard14 = require('../../assets/model/group1-shard14of25.bin');
        // const shard15 = require('../../assets/model/group1-shard15of25.bin');
        // const shard16 = require('../../assets/model/group1-shard16of25.bin');
        // const shard17 = require('../../assets/model/group1-shard17of25.bin');
        // const shard18 = require('../../assets/model/group1-shard18of25.bin');
        // const shard19 = require('../../assets/model/group1-shard19of25.bin');
        // const shard20 = require('../../assets/model/group1-shard20of25.bin');
        // const shard21 = require('../../assets/model/group1-shard21of25.bin');
        // const shard22 = require('../../assets/model/group1-shard22of25.bin');
        // const shard23 = require('../../assets/model/group1-shard23of25.bin');
        // const shard24 = require('../../assets/model/group1-shard24of25.bin');
        // const shard25 = require('../../assets/model/group1-shard25of25.bin');

        // const combinedWeights = [
        //   shard1, shard2, shard3, shard4, shard5,
        //   shard6, shard7, shard8, shard9, shard10,
        //   shard11, shard12, shard13, shard14, shard15,
        //   shard16, shard17, shard18, shard19, shard20,
        //   shard21, shard22, shard23, shard24, shard25
        // ];

        const combinedWeights = [
          shard1, shard2, shard3
        ];

        console.log("Model files loaded. Creating model" )

        const loadedModel = await tf.loadGraphModel(bundleResourceIO(modelJson, combinedWeights));

        setModelLoaded(true);
        console.log("successfully created graph model");
        setModel(loadedModel);
    }
    loadModel();
  }, []);

  function decodeImage(imageData) {
    const pixels = jpeg.decode(imageData, true); 
    const tensor = tf.browser.fromPixels(pixels); 
    return tensor;
  }

  async function classifyImage2() {
    if (model) {

      console.log("loading image")
      const asset = Asset.fromModule(peacock);
      await asset.downloadAsync();
      const imageUri = asset.localUri || asset.uri;

      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });


      const imageBuffer = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

      const imageTensor = tf.tidy(() => {
        const decodedImage = decodeImage(imageBuffer);
        return decodedImage.resizeNearestNeighbor([224, 224]).toFloat().expandDims();
      });

      console.log("image loaded. classifying image")

      const prediction = await model.predict(imageTensor).data();
      const highestPredictionIndex = prediction.indexOf(Math.max(...prediction));
      const predictedClassEntry = labels[highestPredictionIndex];
      const predictedClass = predictedClassEntry ? predictedClassEntry[1] : 'Unknown'; // class name

      console.log("prediction: " + predictedClass)
      setPredictions(prediction);
    }
  }

  async function classifyImage(imageUri) {
    if (model) {
      try {
        const base64String = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const imageBuffer = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

        const imageTensor = tf.tidy(() => {
          const decodedImage = decodeImage(imageBuffer);
          return decodedImage.resizeNearestNeighbor([224, 224]).toFloat().expandDims();
        });
        
        console.log("classifying image...")
        const prediction = await model.predict(imageTensor).data();
        const highestPredictionIndex = prediction.indexOf(Math.max(...prediction));
        const predictedClassEntry = labels[highestPredictionIndex];
        const predictedClass = predictedClassEntry ? predictedClassEntry[1] : 'Unknown'; // class name

        console.log('Predicted Class:', predictedClass);
        console.log("highest prediction " + Math.max(...prediction))
        console.log("Predictions: " + prediction)

        console.log("type of predictions: " + typeof prediction)
        
        console.log("sorting predictions: ")
        const sortedPredictions = [...prediction].sort((a, b) => b - a);
        const firstHighestPrediction = sortedPredictions[0];
        const secondHighestPrediction = sortedPredictions[1];
        const thirdHighestPrediction = sortedPredictions[2];
        
        console.log("first highest prediction: " + firstHighestPrediction + " class: " + labels[prediction.indexOf(firstHighestPrediction)][1]);
        console.log("second highest prediction: " + secondHighestPrediction + " class: " + labels[prediction.indexOf(secondHighestPrediction)][1]);
        console.log("third highest prediction: " + thirdHighestPrediction + " class: " + labels[prediction.indexOf(thirdHighestPrediction)][1]);

        setPredictions(predictedClass);

      } catch (error) {
        console.error('Error classifying image:', error);
      }
    }
  }

  const takePicture = async () => {
    // Request camera permissions
    // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    // if (permissionResult.granted === false) {
    //   alert("You've refused to allow this app to access your camera!");
    //   return;
    // }

   

    // // Launch the camera to take a picture
    // const result = await ImagePicker.launchCameraAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: false,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.canceled) {
      // setImage(result.assets[0].uri);
      // classifyImage(result.assets[0].uri);

      classifyImage2();
      // console.log(result.assets[0].uri);
    // }
  };

  const showModal = () => {
    setSelectedAnimal({
      name: 'Lion',
      species: 'Panthera leo',
      diet: 'Carnivore',
      length: '1.8-2.1m',
      height: '1.2m',
      weightM: '190kg',
      weightF: '130kg',
      habitat: 'Savannah',
      conservationStatus: 'Vulnerable',
      funFacts: ['Lions are the only cats that live in groups.', 'A group, or pride, can be up to 30 lions, depending on how much food and water is available.'],
      image: 'lionImage'
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
    <Text>Below is experimental camera code</Text>

    {modelLoaded ? (
      <>
        <Text>Model Loaded Successfully</Text>
        <Button title="Take a picture" onPress={takePicture} />
      </>
    ) : (
      <ActivityIndicator size="large" color="#0000ff" />
    )}

    <Button title="Show popup" onPress={showModal} />

    {image && <Image source={{ uri: image }} style={styles.image} />}

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={modalStyle.modalContainer}>
        <View style={modalStyle.modalContent}>
          <ScrollView>
            {selectedAnimal && (
              <>
                <Text style={modalStyle.modalTitle}>{selectedAnimal.name} Exhibit</Text>
                <Image
                  source={animalImages[selectedAnimal.image]}
                />
                <Text style={modalStyle.animalName}>{selectedAnimal.name}</Text>
                <Text style={modalStyle.species}>{selectedAnimal.species}</Text>
                <Text>
                  <Text style={modalStyle.sectionTitle}>Diet: </Text>
                  <Text style={modalStyle.sectionText}>{selectedAnimal.diet}</Text>
                </Text>
                <Text>
                  <Text style={modalStyle.sectionTitle}>Length: </Text>
                  <Text style={modalStyle.sectionText}>{selectedAnimal.length}</Text>
                </Text>
                <Text>
                  <Text style={modalStyle.sectionTitle}>Height: </Text>
                  <Text style={modalStyle.sectionText}>{selectedAnimal.height}</Text>
                </Text>
                <Text>
                  <Text style={modalStyle.sectionTitle}>Weight:{"\n"}</Text>
                  <Text style={modalStyle.sectionText}>
                    {"\u2022"} Male: {selectedAnimal.weightM}
                  </Text>
                  {"\n"}
                  <Text style={modalStyle.sectionText}>
                    {"\u2022"} Female: {selectedAnimal.weightF}
                  </Text>
                </Text>
                <Text>
                  <Text style={modalStyle.sectionTitle}>Habitat: </Text>
                  <Text style={modalStyle.sectionText}>{selectedAnimal.habitat}</Text>
                </Text>
                <Text>
                  <Text style={modalStyle.sectionTitle}>Conservation Status: </Text>
                  <Text style={modalStyle.sectionText}>{selectedAnimal.conservationStatus}</Text>
                </Text>
                <Text>
                  <Text style={modalStyle.sectionTitle}>Fun Facts:{"\n"}</Text>
                  {selectedAnimal.funFacts.map((fact, index) => (
                    <Text key={index} style={modalStyle.sectionText}>
                      {"\u2022"} {fact}
                      {"\n"}
                    </Text>
                  ))}
                </Text>
              </>
            )}
          </ScrollView>
          <TouchableOpacity onPress={closeModal} style={modalStyle.closeButton}>
            <Text style={modalStyle.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  </View>
  )
}

export default Challenge

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
  },
  predictions: {
    fontSize: 16,
    marginTop: 20,
  },
});


const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  species: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

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
import Icon from 'react-native-vector-icons/MaterialIcons';
import animalPhoto from '../../assets/animalImages/lion.jpg';


const Challenge = () => {

  const [model, setModel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(true);
  const [predictions, setPredictions] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [targetAnimals, setTargetAnimals] = useState([]);
  const [scannedAnimals, setScannedAnimals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [predictedAnimal, setPredictedAnimal] = useState(null);

  const animalInfo = {
    leopard: {
      name: "Leopard",
      species: "Panthera Leo",
      diet: "Carnivore",
      length: "1.6 - 2.6 meters",
      height: "60 - 70 cm",
      weightM: "31 - 65 kg",
      weightF: "17 - 58 kg",
      conservationStatus: "Vulnerable",
      funFacts: [
        "Leopards are the only cats that live in groups.",
        "A group, or pride, can be up to 30 lions, depending on how much food and water is available."
      ],
      image: "https://cdn.britannica.com/30/136130-050-3370E37A/Leopard.jpg"
    },
    tiger: {
      name: "Tiger",
      species: "Panthera Tigris",
      diet: "Carnivore",
      length: "2.5 - 3.9 meters",
      height: "70 - 120 cm",
      weightM: "90 - 310 kg",
      weightF: "65 - 170 kg",
      conservationStatus: "Endangered",
      funFacts: [
        "Tigers are the largest cat species in the world.",
        "A tiger's roar can be heard as far as 3 kilometers away."
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg"
    },
    ostrich: {
      name: "Ostrich",
      species: "Struthio",
      diet: "Omnivore",
      length: "2.1 - 2.8 meters",
      height: "2.1 - 2.8 meters",
      weightM: "100 - 156 kg",
      weightF: "90 - 130 kg",
      conservationStatus: "Least Concern",
      funFacts: [
        "Ostriches are the largest flightless birds in the world.",
        "An ostrich's eye is bigger than its brain."
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Struthio_camelus_-_Etosha_2014_%283%29.jpg"
    },
    African_elephant: {
      name: "African Elephant",
      species: "Loxodonta",
      diet: "Herbivore",
      length: "5.5 - 6.5 meters",
      height: "2.7 - 3.3 meters",
      weightM: "4000 - 7000 kg",
      weightF: "2000 - 3500 kg",
      conservationStatus: "Vulnerable",
      funFacts: [
        "Elephants are the largest land animals on Earth.",
        "An elephant's trunk has over 40,000 muscles."
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
    },
    lion: {
      name: "Lion",
      species: "Panthera leo",
      diet: "Carnivore",
      length: "1.4 - 2.5 meters",
      height: "1.2 meters",
      weightM: "150 - 250 kg",
      weightF: "120 - 182 kg",
      conservationStatus: "Vulnerable",
      funFacts: [
        "Lions are the only cats that live in groups.",
        "A group, or pride, can be up to 30 lions, depending on how much food and water is available."
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
    }
  };


  // const loadedModel = useContext(ModelContext);

  useEffect(() => {

    const loadZooAnimals = async () => {
      try {
        const storedAnimals = await AsyncStorage.getItem('zooAnimals');

        console.log("stored animals: " + storedAnimals);
  
        if (storedAnimals) {
          setTargetAnimals(JSON.parse(storedAnimals));
        } else {
          const initialAnimals = ['Lion', 'Elephant', 'Leopard', 'Ostrich', 'Tiger'];
          setTargetAnimals(initialAnimals);
          await AsyncStorage.setItem('zooAnimals', JSON.stringify(initialAnimals));
        }

      } catch (error) {
        console.error('Failed to load zoo animals', error);
      }

      try {
        let scannedAnimals = await AsyncStorage.getItem('scannedAnimals');
  
        if (scannedAnimals) {
          setScannedAnimals(JSON.parse(scannedAnimals));
        } else {
          let emptyScannedAnimals = [];
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
    console.log("Target animals: ", targetAnimals);
  }, [targetAnimals]);

  useEffect(() => {
    console.log("Scanned animals: ", scannedAnimals);
  }, [scannedAnimals]);

  useEffect(() => {

    async function loadModel() {

        setModelLoaded(false);

        console.log("waiting for  resnet tf to be ready")
        await tf.ready();

        console.log("TF is successfully ready")

        const modelJson = require('../../assets/mobilenet_model/model.json');
        const shard1 = require('../../assets/mobilenet_model/group1-shard1of3.bin');
        const shard2 = require('../../assets/mobilenet_model/group1-shard2of3.bin');
        const shard3 = require('../../assets/mobilenet_model/group1-shard3of3.bin');

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
      const asset = Asset.fromModule(animalPhoto);
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
      const predictedAnimal = predictedClassEntry ? predictedClassEntry[1] : 'Unknown'; // class name

      console.log("prediction: " + predictedAnimal)

      //add scanned animal to scanned animals list

      try {
        let storedScannedAnimals = await AsyncStorage.getItem('scannedAnimals');
        storedScannedAnimals = storedScannedAnimals ? JSON.parse(storedScannedAnimals) : [];
        storedScannedAnimals.push(predictedAnimal);
        await AsyncStorage.setItem('scannedAnimals', JSON.stringify(storedScannedAnimals));
      
      } catch (error) {
        console.error("failed to save scanned animals", error);
      }

      setPredictedAnimal(predictedAnimal);

      console.log("showing popup")

      showModal(predictedAnimal); 
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

  const getAnimalInfo = (animal) => {
    // Replace this with actual logic to fetch animal information
    const animalData = {
      leopard: "Cats are small, carnivorous mammals that are often kept as pets.",
      tiger: "Dogs are domesticated mammals, not natural wild animals.",
      // Add more animals as needed
    };
    return animalData[animal] || "Information not available.";
  };

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

  const showModal = (predictedAnimal) => {

    setSelectedAnimal({
      name: animalInfo[predictedAnimal].name,
      species: animalInfo[predictedAnimal].species,
      diet: animalInfo[predictedAnimal].diet,
      length: animalInfo[predictedAnimal].length,
      height: animalInfo[predictedAnimal].height,
      weightM: animalInfo[predictedAnimal].weightM,
      weightF: animalInfo[predictedAnimal].weightF,
      habitat: animalInfo[predictedAnimal].habitat,
      conservationStatus: animalInfo[predictedAnimal].conservationStatus,
      funFacts: animalInfo[predictedAnimal].funFacts,
      image: animalInfo[predictedAnimal].image
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
    <Text>Image Classification Model MobileNet</Text>

    {modelLoaded ? (
      <>
        <Text>Model Loaded Successfully</Text>
        {/* <Button title="Take a picture" onPress={takePicture} /> */}

        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Icon name="camera-alt" size={30} color="#fff" />
        </TouchableOpacity>
   
      </>
    ) : (
      <ActivityIndicator size="large" color="#0000ff" />
    )}

    {/* <Button title="Show popup" onPress={showModal} /> */}

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
                <Text style={modalStyle.modalTitle}> Animal Unlocked! {selectedAnimal.name} </Text>
                <Image source={{ uri: selectedAnimal.image}} style={[styles.image, { height: 100, width:100}]} />
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
  cameraButton: {
    backgroundColor: '#068c08',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#068c08',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView, Modal, ImageBackground } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import * as FileSystem from 'expo-file-system';
import labels from '../assets/labels.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Asset } from 'expo-asset';
import { fetch } from '@tensorflow/tfjs-react-native';
import animalPhoto from '../assets/animalImages/tiger.jpg';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { images, icons } from '../constants';


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
  const [isInfoModal, setIsInfoModal] = useState(null);
  const [predictedAnimal, setPredictedAnimal] = useState(null);
  const [classifyingModalVisible, setClassifyingModalVisible] = useState(false);
  const [incorrectAnimalModalVisible, setIncorrectAnimalModalVisible] = useState(false);

  const animalInfo = {
    leopard: {
      name: "Leopard",
      species: "Panthera Leopardis",
      diet: "Carnivore",
      length: "1.6 - 2.6 meters",
      height: "60 - 70 cm",
      weightM: "31 - 65 kg",
      weightF: "17 - 58 kg",
      habitat: "Savannas, grasslands, and forests",
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
      habitat: "Tropical rainforests, grasslands, and savannas",
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
      habitat: "Savannas and open woodlands",
      conservationStatus: "Least Concern",
      funFacts: [
        "Ostriches are the largest flightless birds in the world.",
        "An ostrich's eye is bigger than its brain."
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Struthio_camelus_-_Etosha_2014_%283%29.jpg"
    },
    african_elephant: {
      name: "African Elephant",
      species: "Loxodonta",
      diet: "Herbivore",
      length: "5.5 - 6.5 meters",
      height: "2.7 - 3.3 meters",
      weightM: "4000 - 7000 kg",
      weightF: "2000 - 3500 kg",
      habitat: "Savannas, forests, and deserts",
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
      habitat: "Savannas, grasslands, and open woodlands",
      conservationStatus: "Vulnerable",
      funFacts: [
        "Lions are the only cats that live in groups.",
        "A group, or pride, can be up to 30 lions, depending on how much food and water is available."
      ],
      image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
    }
  };
  
  const ScannedAnimalsList = ({ targetAnimals, scannedAnimals }) => {

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.subTitleContainer}>
            <Text style={styles.subtitle}>Animals to snap</Text>
            </View>
            <ScrollView style={styles.scrollView} persistentScrollbar={true}>  
              {targetAnimals.map((animal, index) => {
                const info = animalInfo[animal.toLowerCase()];
                return (
                  <TouchableOpacity key={index} onPress={() => showModal({ predictedAnimal: animal, info: true })}>
                    <View key={index} style={styles.animalCard}>
                      <View style={styles.imageContainer}>
                        <Image source={{ uri: info.image }} style={styles.animalImage} />
                      </View>
                      <Text style={styles.animalName}>{info.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.verticalLine} />
          <View>
          <View style={styles.subTitleContainer}>
          <Text style={styles.subtitle}>Snapped Animals</Text>
          </View>
          <ScrollView style={styles.scrollView} persistentScrollbar={true}>
              {scannedAnimals.map((animal, index) => {
                console.log("animal: " + animal);
                
                const info = animalInfo[animal.toLowerCase()];

                console.log("animal info: " + info);

                return (
                  <TouchableOpacity key={index} onPress={() => showModal({predictedAnimal:animal, info:true})}>
                    <View key={index} style={styles.animalCard}>
                      <View style={styles.imageContainer}>
                        <Image source={{ uri: info.image }} style={styles.animalImage} />
                        <Icon name="check-circle" size={30} color="green" style={styles.tickIcon} />
                      </View>
                      <Text style={styles.animalName}>{info.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {

    const loadTargetAnimals = async () => {
      try {
        const storedAnimals = await AsyncStorage.getItem('targetAnimals');

        if (storedAnimals) {
          setTargetAnimals(JSON.parse(storedAnimals));
        } else {
          const initialTargetAnimals = ['lion', 'african_elephant', 'leopard', 'ostrich', 'tiger'];
          setTargetAnimals(initialTargetAnimals);
          await AsyncStorage.setItem('targetAnimals', JSON.stringify(initialTargetAnimals));
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
        
        //Experimental code to reset scanned animals
        // let emptyScannedAnimals = [];
        // setScannedAnimals(emptyScannedAnimals);
        // await AsyncStorage.setItem('scannedAnimals', JSON.stringify(emptyScannedAnimals));

        // await AsyncStorage.setItem('targetAnimals', JSON.stringify(['lion', 'african_elephant', 'leopard', 'ostrich', 'tiger']));

      } catch (error) {
        console.error('Failed to load zoo animals', error);
      }
  
    };
    
    loadTargetAnimals();
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

        const modelJson = require('../assets/mobilenet_model/model.json');
        const shard1 = require('../assets/mobilenet_model/group1-shard1of3.bin');
        const shard2 = require('../assets/mobilenet_model/group1-shard2of3.bin');
        const shard3 = require('../assets/mobilenet_model/group1-shard3of3.bin');

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

  async function classifyImageTest() {
    
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

      console.log("Predicted Animal: " + predictedAnimal)

      if (Object.values(targetAnimals).includes(predictedAnimal)) {

        showModal({predictedAnimal:predictedAnimal}); 
  
        try {
  
          if (!scannedAnimals.includes(predictedAnimal)) {
            scannedAnimals.push(predictedAnimal);
            setScannedAnimals(scannedAnimals);
  
            let updatedTargetAnimals = targetAnimals.filter(animal => animal !== predictedAnimal);
            setTargetAnimals(updatedTargetAnimals);
            await AsyncStorage.setItem('targetAnimals', JSON.stringify(updatedTargetAnimals));
          }
  
          await AsyncStorage.setItem('scannedAnimals', JSON.stringify(scannedAnimals));
  
        } catch (error) {
          console.error('Failed to load scanned animals', error);
        }
  
      } else {
        console.log(predictedAnimal + " is not in targetAnimals: " + targetAnimals)
      }

    }

  }

  async function classifyImage(imageUri) {
    if (model) {
      try {

        console.log("decoding image...");
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
        setPredictedAnimal(predictedClass);

        return predictedClass;

      } catch (error) {
        console.error('Error classifying image:', error);
        return null;
      }
    }
  }

  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    // Launch the camera to take a picture
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("image picker closed")

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      setClassifyingModalVisible(true);

      // let predictedAnimalResult = await classifyImage(result.assets[0].uri);
      const asset = Asset.fromModule(animalPhoto);
      await asset.downloadAsync();
      const imageUri = asset.localUri || asset.uri;
      let predictedAnimalResult = await classifyImage(imageUri);
      let predictedAnimal = predictedAnimalResult.toLowerCase()

      setClassifyingModalVisible(false);
      
      //check whether the animal is correct or not
      if (Object.values(targetAnimals).includes(predictedAnimal)) {

        showModal({predictedAnimal:predictedAnimal}); 
  
        try {
  
          if (!scannedAnimals.includes(predictedAnimal)) {
            scannedAnimals.push(predictedAnimal);
            setScannedAnimals(scannedAnimals);
  
            let updatedTargetAnimals = targetAnimals.filter(animal => animal !== predictedAnimal);
            setTargetAnimals(updatedTargetAnimals);
            await AsyncStorage.setItem('targetAnimals', JSON.stringify(updatedTargetAnimals));
          } 
  
          await AsyncStorage.setItem('scannedAnimals', JSON.stringify(scannedAnimals));
  
        } catch (error) {
          console.error('Failed to load scanned animals', error);
        }
  
      } else {
          console.log("IN takePicture: " + predictedAnimal + " is not in targetAnimals: " + targetAnimals)

          setIncorrectAnimalModalVisible(true);
      }

      console.log("file location: ", result.assets[0].uri);
    }

    // classifyImageTest();
  };

  const showModal = ({predictedAnimal="tiger", info=false} = {} ) => {

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
    setIsInfoModal(info);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showClassifyingModal = () => {
    setClassifyingModalVisible(true);
  };
  
  const closeClassifyingModal = () => {
    setClassifyingModalVisible(false);
  };

  const showIncorrectAnimalModal = () => {
    setIncorrectAnimalModalVisible(true);
  };

  const closeIncorrectAnimalModal = () => {
    setIncorrectAnimalModalVisible(false);
  }

  return (
    
    <View style={styles.container}>
    <ImageBackground source={images.easyAnimalChallengeBackground} style={styles.backgroundImage}>
    <ScannedAnimalsList targetAnimals={targetAnimals} scannedAnimals={scannedAnimals} />

    <View style={styles.cameraBar}>
    {modelLoaded ? (
      <>
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Image source={icons.camera} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
        
      </>
    ) : (
      <Text>Loading AI</Text>,
      <ActivityIndicator size="large" color="#0000ff" />
    )}
    </View>

    <Modal
      animationType="slide"
      transparent={true}
      visible={classifyingModalVisible}
      onRequestClose={closeClassifyingModal}
    >
      <SafeAreaView style={modalStyle.modalContainer}>
        <View style={modalStyle.modalContent}>
          <Text style={styles.title}>Classifying image...</Text>
        </View>
      </SafeAreaView>
    </Modal>

    <Modal
      animationType="slide"
      transparent={true}
      visible={incorrectAnimalModalVisible}
      onRequestClose={closeIncorrectAnimalModal}
    >
      <SafeAreaView style={modalStyle.modalContainer}>
        <View style={modalStyle.modalContent}>
          <Text style={styles.title}>Animal not on list</Text>
          <Text style={styles.subtitle}>You have either not photographed an animal on the list or your picture isn't clear enough</Text>
          <Button title="Close" onPress={closeIncorrectAnimalModal} />
        </View>
      </SafeAreaView>
    </Modal>


    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
    <SafeAreaView style={modalStyle.modalContainer}>
      <View style={modalStyle.modalContent}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {selectedAnimal && (
            <>
              <Text style={styles.title}>
                {isInfoModal ? 'Animal' : 'Well Done! Animal Unlocked'}
              </Text>
              <Image source={{ uri: selectedAnimal.image }} style={modalStyle.image} />
              <Text style={modalStyle.animalName}>{selectedAnimal.name}</Text>
              <Text style={modalStyle.species}>({selectedAnimal.species})</Text>
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
                <Text style={modalStyle.sectionTitle}>Fun Facts: </Text>
                <Text style={modalStyle.sectionText}>{selectedAnimal.funFacts}</Text>
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
  </ImageBackground>
  </View>
  )
}

export default Challenge

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    paddingBottom: 1,
  },
  verticalLine: {
    width: 2,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 110
  },
  titleContainer: {
    backgroundColor: '#d4edda', // Light green background
    borderRadius: 20, // Curved edges
    padding: 10, // Padding inside the box
    marginBottom: 20, // Space below the box
    alignItems: 'center', // Center the text horizontally
    marginTop:5,
    zIndex:10
  },
  subTitleContainer: {
    backgroundColor: '#d4edda', // Light green background
    borderRadius: 20, // Curved edges
    padding: 5, // Padding inside the box
    marginBottom: 0, // Space below the box
    alignItems: 'center', // Center the text horizontally
    marginTop:70,
    alignSelf: 'center',
    // width: '90%',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginBottom: 2,
    marginTop:1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    paddingRight: 17,
  },
  animalsLeft: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    color: 'darkgreen',
    textAlign: 'center',
    marginBottom: 10, // Added margin for spacing
  },
  animalsLeftContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraBar: {
    backgroundColor: '#e8f5e9',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0, // Ensure it starts from the left edge
    right: 0, 
  },
  cameraButton: {
    // borderRadius: 50,
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
  scrollView: {
    width: '100%',
    padding: 20,
    paddingBottom: 20
  },
  animalCard: {
    backgroundColor: '#5a8c66',
    borderRadius: 30,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mysteryAnimalCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  animalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  tickIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    transform: [{ translateX: 10 }, { translateY: -10 }],
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2, 
    borderColor: 'green', 
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#068c08',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 150, 
    height: 150,
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: 'green',
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  species: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
  },
});


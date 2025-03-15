import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, TouchableOpacity, ScrollView, SafeAreaView, Modal, ImageBackground, Linking } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as jpeg from 'jpeg-js';
import * as FileSystem from 'expo-file-system';
// import labels from '../assets/labels.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import questionmark from '../assets/icons/questionmark.png';
import { Asset } from 'expo-asset';
import { fetch } from '@tensorflow/tfjs-react-native';
import animalPhoto from '../assets/animalImages/ostrich.jpg';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { images, icons } from '../constants';


const Challenge = () => {

  const [model, setModel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(true);
  const [hardChallengeCompleted, setHardChallengeCompleted] = useState(false);
  const [hardChallengeCompletedModalVisible, setHardChallengeCompletedModalVisible] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [hardTargetAnimals, setHardTargetAnimals] = useState([]);
  const [hardScannedAnimals, setHardScannedAnimals] = useState([]);
  const [hardModalVisible, setHardModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [incorrectClassifiedObject, setIncorrectClassifiedObject] = useState(null);
  const [isInfoModal, setIsInfoModal] = useState(null);
  const [predictedAnimal, setPredictedAnimal] = useState(null);
  const [classifyingModalVisible, setClassifyingModalVisible] = useState(false);
  const [incorrectAnimalModalVisible, setIncorrectAnimalModalVisible] = useState(false);

  const animalInfo = {
    hippopotamus: {
      name: "Hippopotamus",
      species: "Hippopotamus amphibius",
      diet: "Herbivore",
      length: "3.3 - 5 meters",
      height: "1.3 - 1.6 meters",
      weightM: "1,500 - 1,800 kg",
      weightF: "1,300 - 1,500 kg",
      habitat: "Rivers, lakes, and swamps in sub-Saharan Africa",
      conservationStatus: "Vulnerable",
      funFacts: [
        "Hippos spend up to 16 hours a day submerged in rivers and lakes to keep their massive bodies cool.",
        "Despite being herbivores, hippos are highly aggressive and are considered one of the most dangerous animals in Africa."
      ],
      image: "https://t4.ftcdn.net/jpg/02/17/87/23/360_F_217872301_aFTJRtKZLTi66D6PT33FXoj9P43rhR18.jpg"
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

  const shareToFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      'https://www.londonzoo.org/'
    )}`;
    Linking.openURL(facebookShareUrl).catch((err) =>
      console.error('Error opening URL:', err)
    );
  };

  const openInstagram = () => {
    const instagramUrl = 'https://www.instagram.com/'; // Replace with your Instagram URL
    Linking.openURL(instagramUrl).catch((err) =>
      console.error('Error opening Instagram link:', err)
    );
  };

  const shareToTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      'I just completed an Animal challenge at London Zoo! Check out my acheivement!'
    )}&url=${encodeURIComponent('https://www.londonzoo.org/')}`;
    
    Linking.openURL(twitterShareUrl).catch((err) =>
      console.error('Error opening URL:', err)
    );
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
                    <View key={index} style={styles.mysteryAnimalCard}>
                      <View style={styles.imageContainer}>
                      <Image source={questionmark} style={styles.animalImage} />
                      </View>
                      <Text style={styles.animalName}>Mystery Animal</Text>
                    </View>
                );
              })}
            </ScrollView>
        </View>
        <View style={styles.verticalLine}/>
        <View>
        <View style={styles.subTitleContainer}>
        <Text style={styles.subtitle}>Snapped Animals</Text>
        </View>
        <ScrollView style={styles.scrollView} persistentScrollbar={true}>
            {scannedAnimals.map((animal, index) => {
              const info = animalInfo[animal.toLowerCase()];
              return (
                <TouchableOpacity key={index} onPress={() => showModal({predictedAnimal:animal, info:true})}>
                  <View style={styles.animalCard}>
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

    const initialiseChallenge = async () => {

      try {

        const challengeCompletedFlag = await AsyncStorage.getItem('hardChallengeCompletedFlag')

        console.log("Challenge completed flag: ", challengeCompletedFlag);

        if (challengeCompletedFlag && (challengeCompletedFlag == 'true')) {
          console.log("challenge completed")

          if (challengeCompletedFlag == "true") {
            console.log("Challenge completed from initial useEffect");
            console.log("The target animals at this stage are: ", hardTargetAnimals);
            console.log("The scanned animals at this stage are: ", hardScannedAnimals);

            let storedScannedAnimals2 = await AsyncStorage.getItem('hardScannedAnimals');

            console.log("The stored scanned animals at this stage are: ", storedScannedAnimals2);
            // setChallengeCompleted(true);
            setHardChallengeCompletedModalVisible(true);
          }

        } else {

          //challenge is still in progress
          console.log("Challenge in progress")

          AsyncStorage.setItem('hardChallengeCompletedFlag', 'false');

          const initialTargetAnimals = ['lion', 'african_elephant', 'hippopotamus', 'ostrich', 'tiger'];

          try {
            const storedTargetAnimals = await AsyncStorage.getItem('hardTargetAnimals');
            console.log("stored target animals: " + storedTargetAnimals);

            if (storedTargetAnimals) {
              console.log("setting target animals to initial configuration");
              setHardTargetAnimals(JSON.parse(storedTargetAnimals));
            } else {
              setHardTargetAnimals(initialTargetAnimals);
              await AsyncStorage.setItem('hardTargetAnimals', JSON.stringify(initialTargetAnimals));
            }
          } catch (error) {
            console.log("Error occured during targetAnimal retrieval", error);
          }
        }


      } catch (error) {
        console.error('Failed to load zoo animals', error);
      } finally {

        try {
          let storedScannedAnimals = await AsyncStorage.getItem('hardScannedAnimals');
          
          if (storedScannedAnimals) {
            setHardScannedAnimals(JSON.parse(storedScannedAnimals));
          } else {
            console.log("Found no storedScannedAnimals therefore initialising new empty storedScannedAnimals");
            let emptyScannedAnimals = [];
            setHardScannedAnimals(emptyScannedAnimals);
            await AsyncStorage.setItem('hardScannedAnimals', JSON.stringify(emptyScannedAnimals));
          }
          
        } catch (error) {
          console.error('Failed to load zoo animals', error);
        }


        try {
          let storedScannedAnimals = await AsyncStorage.getItem('hardScannedAnimals');
          
          if (storedScannedAnimals) {
            setHardScannedAnimals(JSON.parse(storedScannedAnimals));
          } else {
            console.log("Found no storedScannedAnimals therefore initialising new empty storedScannedAnimals");
            let emptyScannedAnimals = [];
            setHardScannedAnimals(emptyScannedAnimals);
            await AsyncStorage.setItem('hardScannedAnimals', JSON.stringify(emptyScannedAnimals));
          }
          
        } catch (error) {
          console.log('Failed to initialiseChallenge', error);
        }


        // await AsyncStorage.setItem('hardTargetAnimals', JSON.stringify(['tiger']));
        // setHardTargetAnimals(['tiger']) 

        // // let scannedAnimals = ['lion', 'african_elephant', 'leopard', 'ostrich'];
        // let scannedAnimals = [];
        // setHardScannedAnimals(scannedAnimals);
        // await AsyncStorage.setItem('hardScannedAnimals', JSON.stringify(scannedAnimals));

        // await AsyncStorage.setItem('hardChallengeCompletedFlag', 'false');
        // setHardChallengeCompleted(false);
        // setHardChallengeCompletedModalVisible(false); 

        // await AsyncStorage.removeItem('hardTargetAnimals') 
        // await AsyncStorage.removeItem('hardScannedAnimals') 
        // setHardScannedAnimals([])
        // setHardTargetAnimals([])
      }

    };
    
    initialiseChallenge();
  }, []);  

  useEffect(() => {
    console.log("Target animals: ", hardTargetAnimals);
  }, [hardTargetAnimals]);

  useEffect(() => {
    console.log("Scanned animals: ", hardScannedAnimals);
  }, [hardScannedAnimals]);

  useEffect(() => {

    async function loadModel() {

        setModelLoaded(false);

        console.log("waiting for  resnet tf to be ready")
        await tf.ready();

        console.log("TF is successfully ready")

        const modelJson = require('../assets/ldn_zoo_mobile_net_model/model.json');
        const shard1 = require('../assets/ldn_zoo_mobile_net_model/group1-shard1of3.bin');
        const shard2 = require('../assets/ldn_zoo_mobile_net_model/group1-shard2of3.bin');
        const shard3 = require('../assets/ldn_zoo_mobile_net_model/group1-shard3of3.bin');

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
          return decodedImage.resizeNearestNeighbor([180, 180]).toFloat().expandDims();
        });
        
        console.log("classifying image...")
        const labels =  ['Choloepus_Hoffmanni_images', 'Equus_Quagga_images', 'Giraffa_Camelopardalis_images', 'Panthera_leo_images', 'Phoenicopterus_Roseus_images'];
        

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

        return labels[prediction.indexOf(firstHighestPrediction)];

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

    console.log("image picker opened");

    // Launch the camera to take a picture
    // const result = await ImagePicker.launchCameraAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: false,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    
  

    //Launch the image library to picka photo
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // if (result.canceled) {
    //   console.log("image picker closed prematurely")
    //   setClassifyingModalVisible(false);
    // } 
    // console.log("image picker closed")

    setClassifyingModalVisible(true);

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!result.canceled) {

      // setClassifyingModalVisible(true);

      setImage(result.assets[0].uri);

      let predictedAnimalResult = await classifyImage(result.assets[0].uri);

      setClassifyingModalVisible(false);

      //code for camera photo taker to extract image
      // const asset = Asset.fromModule(animalPhoto);
      // await asset.downloadAsync();
      // const imageUri = asset.localUri || asset.uri;
      // let predictedAnimalResult = await classifyImage(imageUri);
      let predictedAnimal = predictedAnimalResult.toLowerCase()

      //check whether the animal is correct or not
      if (Object.values(hardTargetAnimals).includes(predictedAnimal)) {

        showModal({predictedAnimal:predictedAnimal}); 
  
        try {
  
          if (!hardScannedAnimals.includes(predictedAnimal)) {
            hardScannedAnimals.push(predictedAnimal);
            
  
            let updatedTargetAnimals = hardTargetAnimals.filter(animal => animal !== predictedAnimal);
            
            setHardScannedAnimals(hardScannedAnimals);
            setHardTargetAnimals(updatedTargetAnimals);

            if (updatedTargetAnimals.length === 0) {
              console.log("Challenge completed");
              setHardChallengeCompleted(true);
              setHardChallengeCompletedModalVisible(true);
              AsyncStorage.setItem('hardChallengeCompletedFlag', 'true');

              console.log("populating scannedAnimals with: " + hardScannedAnimals);
              await AsyncStorage.setItem('hardScannedAnimals', JSON.stringify(hardScannedAnimals));
            } else {
              setHardChallengeCompleted(false);
              setHardChallengeCompletedModalVisible(false);
            }


            await AsyncStorage.setItem('hardTargetAnimals', JSON.stringify(updatedTargetAnimals));
          } 
          
          console.log("populating scannedAnimals with: " + hardScannedAnimals);
          await AsyncStorage.setItem('hardScannedAnimals', JSON.stringify(hardScannedAnimals));
  
        } catch (error) {
          console.error('Failed to load scanned animals', error);
        }
  
      } else {
          console.log("IN takePicture: " + predictedAnimal + " is not in targetAnimals: " + hardTargetAnimals)
          setIncorrectClassifiedObject(predictedAnimal)
          setIncorrectAnimalModalVisible(true);
      }

      // console.log("file location: ", result.assets[0].uri);
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
    setHardModalVisible(true);
  };

  const closeModal = () => {
    setHardModalVisible(false);
  };

  const showClassifyingModal = () => {
    setClassifyingModalVisible(true);
  };
  
  const closeClassifyingModal = () => {
    setClassifyingModalVisible(false);
  };

  const closeChallengeCompletedModal = () => {
    setHardChallengeCompletedModalVisible(false);
  }

  const showIncorrectAnimalModal = () => {
    setIncorrectAnimalModalVisible(true);
  };

  const closeIncorrectAnimalModal = () => {
    setIncorrectAnimalModalVisible(false);
  }

  return (

    <View style={styles.container}>
    <ImageBackground source={images.hardAnimalChallengeBackground} style={styles.backgroundImage}>
    <ScannedAnimalsList targetAnimals={hardTargetAnimals} scannedAnimals={hardScannedAnimals} />

    <View style={styles.cameraBar}>
    {modelLoaded ? (
      // <>

          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Image source={icons.camera} style={{ width: 60, height: 60 }}/>
          </TouchableOpacity>
          
      // </>
    ) : (
      <Text>Loading AI</Text>,
      <ActivityIndicator size="large" color="green" />
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
      visible={hardChallengeCompletedModalVisible}
      onRequestClose={closeChallengeCompletedModal}
    >
      <SafeAreaView style={modalStyle.modalContainer}>
      <View style={modalStyle.modalContent}>
      <Text style={styles.title}>Mystert Challenge Completed!</Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text></Text>
          <Text style={modalStyle.rewardText}>Congratulations! You have completed the mystery challenge!</Text>
          <Text></Text>
          <Text style={modalStyle.rewardText}>Come collect your prize at the kiosk inside the gift shop</Text>
          <Text></Text>
          <Text style={modalStyle.rewardText}>Proud of this acheivement? Share this with your friends!</Text>

          <View style={modalStyle.shareButtonContainer}>
          <TouchableOpacity onPress={shareToTwitter} style={modalStyle.shareButton}>
              <Image source={icons.twitterIcon} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareToFacebook} style={modalStyle.shareButton}>
              <Image source={icons.facebookIcon} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openInstagram} style={modalStyle.shareButton}>
              <Image source={icons.instagramIcon} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
          </View>

        </ScrollView>
        <TouchableOpacity onPress={closeChallengeCompletedModal} style={modalStyle.closeButton}>
          <Text style={modalStyle.closeButtonText}>Close</Text>
        </TouchableOpacity>
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
          <Text style={styles.title}>Animal not classified</Text>
          <Text style={modalStyle.species}>You have either not photographed an animal on the list or your picture isn't clear enough</Text>
          <Text></Text>
          <Text></Text>
          <Text style={modalStyle.species}>Image detected: </Text>
          <Text style={modalStyle.species}>{incorrectClassifiedObject}</Text> 
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <TouchableOpacity onPress={closeIncorrectAnimalModal} style={modalStyle.closeButton}>
            <Text style={modalStyle.closeButtonText}>Close</Text>
           </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
    
    <Modal
      animationType="slide"
      transparent={true}
      visible={hardModalVisible}
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
    // backgroundColor: 'white',
    marginHorizontal: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 19
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
    borderRadius: 30, // Curved edges
    padding: 5, // Padding inside the box
    marginBottom: 0, // Space below the box
    alignItems: 'center', // Center the text horizontally
    marginTop:70,
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
    marginTop:1,
    textAlign: 'center',
    fontFamily: 'serif', // Suitable font
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 23,
    fontFamily: 'serif', // Suitable font
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
  cameraBar: {
    // backgroundColor: '#e8f5e9',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0, // Ensure it starts from the left edge
    right: 0, 
  },
  cameraButton: {
    // backgroundColor: '#068c08', 
    borderRadius: 50,
    padding: 20,
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
    padding: 10,
    // paddingBottom: 20,
    marginBottom: 170,
  },
  animalCard: {
    backgroundColor: '#5a8c66',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    padding: 0,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  mysteryAnimalCard: {
    backgroundColor: '#5a8c66',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    padding: 0,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  animalImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
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
    fontFamily: 'serif',
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
    backgroundColor: '#5a8c66',
    borderRadius: 30,
    padding: 0,
    // alignItems: 'center',
    position: 'relative',
    borderColor: 'green', 
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%', 
    height: 150,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    color: 'white',
  },
  species: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'serif',
    color: 'white',
    marginLeft: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'serif',
    color: 'white',
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'serif',
    color: 'white',
  },
  rewardText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'serif',
    color: 'white',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  shareButton: {
    // backgroundColor: '#3b5998', // Facebook blue color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    // alignItems: 'center',
  },
  shareButtonContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-evenly', // Space buttons evenly
    alignItems: 'center', // Center buttons vertically
    marginVertical: 10, // Add vertical margin
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
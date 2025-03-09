import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { animalImages, animalData } from '../../../data/animals';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import { icons } from '../../../constants';

import { generateClient } from 'aws-amplify/api';
import { listAnimals } from '../../../src/graphql/queries'; 

const client = generateClient(); 

const Animals = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [scheduledAnimals, setScheduledAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {

    const fetchAnimals = async () => { 
        try {
          const animalsResult = await client.graphql(
            {query: listAnimals}
          );

          setAnimals(animalsResult.data.listAnimals.items)
          
          console.log("");
          console.log("Animals");
          console.log("animals: ", animals)
        } catch (error) {
          console.log('error on fetching animals', error)
        }
    }
    fetchAnimals();
  }, []);


  const closeModal = () => {
    setModalVisible(false);
    setSelectedAnimal(null);
  };

  const NavigateToSchedule = () => {
    navigation.navigate('schedule'); 
  };

  const AnimalItem = ({ animal, onPress }) => {

    return (
      <TouchableOpacity style={styles.animalItem} onPress={() => onPress(animal)}>
        <View style={styles.header}>
        <View style={styles.column}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: animal.image }} style={styles.animalImage} />
              {scheduledAnimals.includes(animal.name) && <Icon name="heart" size={20} color="red" style={styles.icon} />}
              {!scheduledAnimals.includes(animal.name) && <Icon name="heart" size={20} color="lightgrey" style={styles.icon} />}
            </View>
          {/* {!scheduledAnimals.includes(animal.name) && ( */}
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => addToSchedule(animal.name)}
              >
                <Text style={styles.customButtonText}>
                  {scheduledAnimals.includes(animal.name) ? 'Added to Plan' : 'Add to Plan'}
                </Text>
                

              </TouchableOpacity>
          {/* )} */}
        </View>
        <View style={styles.column}>
            <Text style={styles.animalName}>{animal.name}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.cardSectionTitle}>Scientific Name: </Text>
              <Text style={styles.text}> {animal.scientificName}</Text>
            </View>
            
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.cardSectionTitle}>Habitat: </Text>
              <Text style={styles.text}>{animal.habitat}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const loadScheduledAnimals = async () => {
    try {
      const scheduledAnimals = await AsyncStorage.getItem('scheduledAnimals');

      console.log("scheduled animals in animals.jsx: " + scheduledAnimals);

      if (scheduledAnimals) {
        setScheduledAnimals(JSON.parse(scheduledAnimals));
      } else {
        const initialScheduledAnimals = [];
        setScheduledAnimals(initialScheduledAnimals);
        setLoading(false);
        await AsyncStorage.setItem('scheduledAnimals', JSON.stringify(initialScheduledAnimals));
      }

    } catch (error) {
      console.error('Failed to load zoo animals', error);
      setLoading(false);
    }

  };

  // useFocusEffect(() => {

  //   const loadScheduledAnimals = async () => {
  //     try {
  //       const scheduledAnimals = await AsyncStorage.getItem('scheduledAnimals');

  //       console.log("scheduled animals in animals.jsx: " + scheduledAnimals);

  //       if (scheduledAnimals) {
  //         setScheduledAnimals(JSON.parse(scheduledAnimals));
  //       } else {
  //         const initialScheduledAnimals = [];
  //         setScheduledAnimals(initialScheduledAnimals);
  //         await AsyncStorage.setItem('scheduledAnimals', JSON.stringify(initialScheduledAnimals));
  //       }

  //     } catch (error) {
  //       console.error('Failed to load zoo animals', error);
  //     }

  //   };
    
  //   loadScheduledAnimals();
  // }, []);  

  useFocusEffect(
    React.useCallback(() => {
      loadScheduledAnimals();
    }, [])
  );

  const handlePress = (animal) => {
    setSelectedAnimal(animal);
    setModalVisible(true);
  };

  // async function addToSchedule(animalName) {

  //   try {

  //     if (!scheduledAnimals.includes(animalName)) {

  //       let currentScheduledAnimals = scheduledAnimals

  //       currentScheduledAnimals.push(animalName)

  //       setScheduledAnimals(currentScheduledAnimals)

  //       await AsyncStorage.setItem('scheduledAnimals', JSON.stringify(currentScheduledAnimals));
  //     }

  //   } catch (error) {
  //     console.error('Failed to modify scheduled animals', error);
  //   }
  // };

  async function addToSchedule(animalName) {
    try {
      if (!scheduledAnimals.includes(animalName)) {
        const updatedAnimals = [...scheduledAnimals, animalName];
        setScheduledAnimals(updatedAnimals);
        await AsyncStorage.setItem('scheduledAnimals', JSON.stringify(updatedAnimals));
      }
    } catch (error) {
      console.error('Failed to modify scheduled animals', error);
    } 
  }

  const getConservationColor = (status) => {
    switch (status.toLowerCase()) {
      case 'vulnerable':
        return '#FFA500'; // Orange
      case 'endangered':
        return '#FF0000'; // Red
      case 'critically endangered':
        return '#8B0000'; // Dark Red
      case 'near threatened':
        return '#FFFF00'; // Yellow
      case 'least concern':
        return '#00FF00'; // Green
      default:
        return '#FFF'; // Default 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animals</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Make a plan of animals that you want to visit throughout the zoo
        </Text>

        <Image
          source={icons.listicon}
          style={{ width: 60, height: 60, tintColor: "#7BC144" }}
          resizeMode="contain"
        />
        <Image>

        </Image>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
                style={styles.planButton}
                onPress={NavigateToSchedule}
                >
                  <Text style={styles.customButtonText}>My Plan</Text>
      </TouchableOpacity>
        </View>
      <FlatList
        data={animals}
        renderItem={({ item }) => <AnimalItem animal={item} onPress={handlePress} />}
        keyExtractor={(item) => item.name}
        style={styles.animalList}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={modalStyle.modalContainer}>
          <View style={modalStyle.modalContent}>
            <View contentContainerStyle={{ paddingBottom: 100 }}>
              {selectedAnimal && (
                <>
                  {/* Image with Text Overlay */}
                  <View style={modalStyle.imageContainer}>
                    <Image source={{ uri: selectedAnimal.image }} style={modalStyle.image} />
                    <View style={modalStyle.textOverlay}>
                      <Text style={modalStyle.animalName}>{selectedAnimal.name}</Text>
                      <Text style={modalStyle.species}>{selectedAnimal.scientificName}</Text>
                    </View>
                  </View>

                  {/* Diet, Weight, Habitat Section */}
                  <View style={modalStyle.infoContainer}>
                    <View style={modalStyle.infoColumn}>
                      <Image source={require('../../../assets/icons/diet.png')} style={modalStyle.icon}/>
                      <Text style={modalStyle.sectionTitle}>Diet</Text>
                      <Text style={modalStyle.sectionText}>{selectedAnimal.diet}</Text>
                    </View>
                    <View style={modalStyle.infoColumn}>
                      <Image source={require('../../../assets/icons/weight.png')} style={modalStyle.icon}/>
                      <Text style={modalStyle.sectionTitle}>Weight</Text>
                      <Text style={modalStyle.sectionText}>
                        Male: {selectedAnimal.weightMale}
                      </Text>
                      <Text style={modalStyle.sectionText}>
                        Female: {selectedAnimal.weightFemale}
                      </Text>
                    </View>
                    <View style={modalStyle.infoColumn}>
                      <Image source={require('../../../assets/icons/habitat.png')} style={modalStyle.icon}/>
                      <Text style={modalStyle.sectionTitle}>Habitat</Text>
                      <Text style={modalStyle.sectionText}>{selectedAnimal.habitat}</Text>
                    </View>
                  </View>

                  {/* Conservation Status */}
                  <View
                    style={[
                      modalStyle.conservationContainer,
                      {
                        borderColor: getConservationColor(selectedAnimal.conservationStatus),
                      },
                    ]}
                  >
                    <Text style={modalStyle.ConservationTitle}>Conservation Status: </Text>
                    <Text
                      style={[
                        modalStyle.conservationText,
                        {
                          color: getConservationColor(selectedAnimal.conservationStatus),
                        },
                      ]}
                    >
                      {selectedAnimal.conservationStatus}
                    </Text>
                  </View>

                  {/* Fun Facts */}
                  <View style={modalStyle.additionalInfoContainer}>
                    <Text style={modalStyle.additionalInfoTitle}>Fun Facts:</Text>
                    <Text style={modalStyle.additionalInfoText}>{selectedAnimal.funFacts}</Text>
                  </View>
                </>
              )}
            </View>
            <TouchableOpacity onPress={closeModal} style={modalStyle.closeButton}>
              <Text style={modalStyle.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <View style={styles.halfCircle} />
    </View>
  );
};

export default Animals;

const styles = StyleSheet.create({
  infoBox: {
    borderWidth: 2,
    borderColor: 'darkgreen',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    backgroundColor: '#f0fff0', // Optional light green background for contrast
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 14,
    color: 'darkgreen',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between', // Ensure chevron stays within bounds
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'left',
    margin: 1,
    justifyContent: 'space-between', // Ensure chevron stays within bounds
    flex: 1,
  },
  halfCircle: {
    position: 'absolute',
    bottom: -40,  // Ensures it overlaps other components slightly
    width: 200,  // Width of the half-circle
    height: 80,  // Height of the half-circle
    backgroundColor: '#234e35',  // Dark green color
    borderTopLeftRadius: 80,  // Creates a rounded top left corner
    borderTopRightRadius: 80,  // Creates a rounded top right corner
    zIndex: 2,  // Ensure it stays above other components
    alignItems: 'center'
  },
  bottombar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10, // Adjust the thickness as needed
    backgroundColor: '#8BC33A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    flex: 1,
  },
  animalList: {
    width: '100%',
  },
  animalItem: {
    borderRadius: 10, // Rounded corners
    // shadowColor: '#000', // Shadow color
    // shadowOffset: { width: 0, height: 2 }, // Shadow offset
    // shadowOpacity: 0.25, // Shadow opacity
    // shadowRadius: 3.84, // Shadow radius
    // elevation: 5, // Elevation for Android shadow
    backgroundColor: '#fff', // Background color to make the shadow visible
    padding: 2, // Optional: Add padding to the component
    margin: 10, // Optional: Add margin to the component
  },
  animalImage: {
    width: 100,
    height: 100,
    marginRight: 1,
    borderRadius: 80
  },
  icon: {
    position: 'absolute',
    top: 5, // Adjust this value to position the icon vertically inside the image
    left: 4, // Adjust this value to position the icon horizontally inside the image
  },
  imageContainer: {
    position: 'relative', // Make the container relative for absolute positioning
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
    paddingRight: 17,
  },
  // buttonContainer: {
  //   flexDirection: 'row', // Arrange children in a row
  //   justifyContent: 'flex-end', // Move children to the far right
  // },
  checkboxText: {
    marginLeft: 8,
    fontSize: 12,
    color: 'gray',
  },
  planButton: {
    backgroundColor: 'darkgreen',
    borderRadius: 20,
    paddingVertical: 10, // Smaller vertical padding
    paddingHorizontal: 8, // Smaller horizontal padding
    alignItems: 'center',
    width: 150, // Reduce minimum width
  },
  customButton: {
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    paddingVertical: 3, // Smaller vertical padding
    paddingHorizontal: 8, // Smaller horizontal padding
    alignItems: 'center',
    width: 80,
    marginTop:10
  },
  customButtonText: {
    color: 'white',
    fontSize: 12, // Slightly smaller font size
    fontWeight: 'bold',
  },
  cardSectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 12,
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
    backgroundColor: '#5C8B67',
    borderRadius: 30,
    padding: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 16,
  },
  animalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'serif',
  },
  species: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'serif',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
    padding: 16,
    margin: 0,
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  icon:{
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
    color: 'black',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'serif',
    color: 'black',
    textAlign: 'center',
  },
  conservationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 10,
    borderWidth: 1.2,
  },
  ConservationTitle: {
    color: 'white',
    fontSize: 16,
  },
  conservationText: {
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  additionalInfoContainer: {
    paddingTop: 0,
    padding: 16,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  additionalInfoText: {
    fontSize: 16,
    fontFamily: 'serif',
    color: 'white',
  },
  closeButton: {
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontSize: 16,
  },
});


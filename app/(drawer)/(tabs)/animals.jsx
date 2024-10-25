import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { animalImages, animalData } from '../../../data/animals';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';


const Animals = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [scheduledAnimals, setScheduledAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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
          <Image source={{ uri: animal.image }} style={styles.animalImage} />
          {!scheduledAnimals.includes(animal.name) && (
                <TouchableOpacity
                style={styles.customButton}
                onPress={() => addToSchedule(animal.name)}
                >
                  <Text style={styles.customButtonText}>Add to Plan</Text>
                </TouchableOpacity>
          )}
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

  async function addToSchedule(animalName) {

    try {

      if (!scheduledAnimals.includes(animalName)) {

        let currentScheduledAnimals = scheduledAnimals

        currentScheduledAnimals.push(animalName)

        setScheduledAnimals(currentScheduledAnimals)

        await AsyncStorage.setItem('scheduledAnimals', JSON.stringify(currentScheduledAnimals));
      }

    } catch (error) {
      console.error('Failed to modify scheduled animals', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animals</Text>
      <View style={styles.buttonContainer}>
             <TouchableOpacity
                style={styles.customButton}
                onPress={NavigateToSchedule}
                >
                  <Text style={styles.customButtonText}>My Plan</Text>
              </TouchableOpacity>
        </View>
      <FlatList
        data={animalData}
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
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              {selectedAnimal && (
                <>
                  <Image source={{ uri: selectedAnimal.image }} style={modalStyle.image} />
                  <Text style={modalStyle.animalName}>{selectedAnimal.name}</Text>
                  <Text style={modalStyle.species}>{selectedAnimal.scientificName}</Text>
                  <Text>
                    <Text style={modalStyle.sectionTitle}>Diet: </Text>
                    <Text style={modalStyle.sectionText}>{selectedAnimal.diet}</Text>
                  </Text>
                  <Text>
                    <Text style={modalStyle.sectionTitle}>Height: </Text>
                    <Text style={modalStyle.sectionText}>{selectedAnimal.height}</Text>
                  </Text>
                  <Text>
                    <Text style={modalStyle.sectionTitle}>Weight:{"\n"}</Text>
                    <Text style={modalStyle.sectionText}>
                      {"\u2022"} Male: {selectedAnimal.weightMale}
                    </Text>
                    {"\n"}
                    <Text style={modalStyle.sectionText}>
                      {"\u2022"} Female: {selectedAnimal.weightFemale}
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
      <View style={styles.halfCircle} />
    </View>
  );
};

export default Animals;

const styles = StyleSheet.create({
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
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android shadow
    backgroundColor: '#fff', // Background color to make the shadow visible
    padding: 2, // Optional: Add padding to the component
    margin: 10, // Optional: Add margin to the component
  },
  animalImage: {
    width: 100,
    height: 100,
    marginRight: 1,
    borderRadius: 10
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
  customButton: {
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    paddingVertical: 3, // Smaller vertical padding
    paddingHorizontal: 8, // Smaller horizontal padding
    alignItems: 'center',
    width: 80, // Reduce minimum width
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
    alignSelf: 'center',
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  species: {
    fontSize: 18,
    fontStyle: 'italic',
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


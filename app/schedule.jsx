import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { animalImages, animalData } from '../data/animals';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Animals = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const [scheduledAnimals, setScheduledAnimals] = useState(null); 
  const [scheduledAnimalsDetails, setScheduledAnimalsDetails] = useState(null);  
  const [loading, setLoading] = useState(true); // Add loading state
  const [animalsRetrieved, setAnimalsRetrieved] = useState(false); // Add state to track retrieval

  const filterAnimalsByName = (name) => {
    return animalData.filter(animal => animal.name === name);
  };

  useEffect(() => {

    const filterScheduledAnimals = async () => {

       const retrievedScheduledAnimals = await AsyncStorage.getItem('scheduledAnimals');

       setScheduledAnimals(JSON.parse(retrievedScheduledAnimals));
       setAnimalsRetrieved(true)

    //    if (retrievedScheduledAnimals) {
    //     const filteredAnimals = retrievedScheduledAnimals.map(name => filterAnimalsByName(name)).flat();
    //     setScheduledAnimalsDetails(filteredAnimals);
    //    }

       setLoading(false);
    };
    
    filterScheduledAnimals();
  }, []); 

  useEffect(() => {
    if (animalsRetrieved) {
      const filteredAnimals = scheduledAnimals.map(name => filterAnimalsByName(name)).flat();
      setScheduledAnimalsDetails(filteredAnimals);
    }
  }, [animalsRetrieved, scheduledAnimals]);


  useEffect(() => {
    console.log("scheduled animals in schedule.jsx: " + scheduledAnimals);
  }, [scheduledAnimals]);

  const AnimalItem = ({ animal, onPress }) => {

    return (
      <TouchableOpacity onPress={() => onPress(animal)} style={styles.animalItem}>
        <Image source={animalImages[animal.image]} style={styles.animalImage} />
        <Text style={styles.animalName}>{animal.name}</Text>
        <View style={styles.buttonContainer}>
          <Button title="remove from schedule" color="green" onPress={() => removeFromSchedule(animal.name)}/>
        </View>
      </TouchableOpacity>
    );
  };
  
  

  async function removeFromSchedule(animalName) {

    console.log("calling removeFromSchedule");

    try {

      if (scheduledAnimals.includes(animalName)) {
        let updatedScheduledAnimals = scheduledAnimals.filter(animal => animal !== animalName);
        setScheduledAnimals(updatedScheduledAnimals);
        await AsyncStorage.setItem('scheduledAnimals', JSON.stringify(updatedScheduledAnimals));

        const updatedScheduledAnimalsDetails = updatedScheduledAnimals.map(name => filterAnimalsByName(name)).flat();
        setScheduledAnimalsDetails(updatedScheduledAnimalsDetails);

        
      }

      console.log("animal removed from schedule now: " + scheduledAnimals);

    } catch (error) {
      console.error('Failed to load scanned animals', error);
    }

   
  };

  const handlePress = (animal) => {
    setSelectedAnimal(animal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAnimal(null);
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading state
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduledAnimalsDetails}
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
            <ScrollView>
              {selectedAnimal && (
                <>
                  <Text style={modalStyle.modalTitle}>{selectedAnimal.name} Exhibit</Text>
                  <Image
                    source={animalImages[selectedAnimal.image]}
                    style={modalStyle.image}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginBottom: 20,
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
    padding: 10, // Optional: Add padding to the component
    margin: 10, // Optional: Add margin to the component
  },
  animalImage: {
    width: 100,
    height: 100,
    marginRight: 10,
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
  buttonContainer: {
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'flex-end', // Move children to the far right
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 12,
    color: 'gray',
  },
});

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    maxHeight: '75%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 15,
    marginTop: 30,
  },
  animalListElement: {
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // For Android shadow
  },
  animalImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  species: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'grey',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
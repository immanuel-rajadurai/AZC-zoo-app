import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, router} from 'react-native';
import React, { useState } from 'react';
import { animalImages, animalData } from '../../../data/animals';


const Animals = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handlePress = (animal) => {
    setSelectedAnimal(animal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAnimal(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animals</Text>
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
  );
};

const AnimalItem = ({ animal, onPress }) => {
  const animalImage = animalImages[animal.image];
  return (
    <TouchableOpacity style={styles.animal} onPress={() => onPress(animal)}>
      <Image source={animalImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{animal.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const handleGoHome = () => {
  router.push('/home');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center', 
    marginBottom: 2,
    marginTop: -30,
  },
  animalList: {
    marginTop: 20,
  },
  animal: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 25,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 5,
    alignItems: 'flex-start', 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
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

export default Animals
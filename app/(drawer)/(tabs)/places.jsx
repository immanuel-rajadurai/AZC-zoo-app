import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { animalImages, animalData } from '../../../data/animals';
import { placesData, images } from '../../../data/places';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { icons } from '../../../constants';


const Places = () => {
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

  const PlaceItem = ({ place, onPress }) => {
    return (
      <TouchableOpacity style={styles.placeItem}>

        <View style={styles.header}>
        <Image source={{ uri: place.image }} style={styles.placeImage} />
          <View style={styles.column}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.text}>{place.description}</Text>
          </View>
          <Image source={icons.rightChevron} style={styles.chevron} />
        </View>
      </TouchableOpacity>
    );
  }

  const handlePress = (animal) => {
    setSelectedAnimal(animal);
    setModalVisible(true);
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Places</Text>
      <FlatList
        data={placesData}
        renderItem={({ item }) => <PlaceItem place={item} onPress={handlePress} />}
        keyExtractor={(item) => item.name}
        style={styles.animalList}
      />

      <View style={styles.halfCircle} />
    </View>
  );
};

export default Places;

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
    alignItems: 'center',
    margin: 10,
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
  chevron: {
    tintColor: '#234e35',
    width: 24, // Adjust width
    height: 24, // Adjust height
    marginRight: 10, // Ensure it stays within bounds
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
  placeItem: {
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
  placeImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'left',
    paddingRight: 2,
    flexWrap: 'wrap',
    flex: 1, // Allows text to wrap correctly
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

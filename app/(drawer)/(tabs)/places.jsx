import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { animalImages, animalData } from '../../../data/animals';
import { placesData, images } from '../../../data/places';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { icons } from '../../../constants';

import { generateClient } from 'aws-amplify/api';
import { listPlaces } from '../../../src/graphql/queries'; 
import { listPlaceAnimals } from '../../../src/graphql/queries'; 


const client = generateClient(); 

const Places = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [placeAnimals, setPlaceAnimals] = useState([]);
  const [placesWithoutAnimals, setPlacesWithoutAnimals] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    
      const fetchPlaces = async () => { 
  
        try {
          const placesResult = await client.graphql(
            {query: listPlaces}
          );
  
          console.log(placesResult.data.listPlaces.items);
  
          setPlaces(placesResult.data.listPlaces.items)
          
          console.log("");
          console.log("Places");
          console.log(places[0])
        } catch (error) {
          console.log('error on fetching places', error)
        }
      }

      const fetchPlaceAnimals = async () => { 
  
        try {
          const placeAnimalsResult = await client.graphql(
            {query: listPlaceAnimals}
          );
  
          console.log(placeAnimalsResult.data.listPlaceAnimals.items);
  
          setPlaceAnimals(placeAnimalsResult.data.listPlaceAnimals.items)
          
          // console.log("");
          // console.log("PlaceAnimals");
          // console.log(placeAnimals[0])
        } catch (error) {
          console.log('error on fetching places', error)
        }
      }

      const fetchNonExhibitPlaces = async () => { 
        try {
          // Fetch places and placeAnimals simultaneously
          const [placesResult, placeAnimalsResult] = await Promise.all([
            client.graphql({ query: listPlaces }),
            client.graphql({ query: listPlaceAnimals }),
          ]);
      
          // Extract data directly from results
          const fetchedPlaces = placesResult.data.listPlaces.items;
          const fetchedPlaceAnimals = placeAnimalsResult.data.listPlaceAnimals.items;
      
          console.log("Fetched Places:", fetchedPlaces);
          console.log("Fetched Place Animals:", fetchedPlaceAnimals);
      
          // Compute filtered places
          const placeAnimalPlaceIds = fetchedPlaceAnimals.map(pa => pa.placeID);
          const filteredPlaces = fetchedPlaces.filter(place => !placeAnimalPlaceIds.includes(place.id));
      
          console.log("Filtered Places:", filteredPlaces);
      
          // Update state with computed values
          setPlaces(fetchedPlaces);
          setPlaceAnimals(fetchedPlaceAnimals);
          setPlacesWithoutAnimals(filteredPlaces);
        } catch (error) {
          console.error("Error fetching places or placeAnimals:", error);
        }
      };


      fetchNonExhibitPlaces();
      // fetchPlaces();
      // fetchPlaceAnimals();
    }, []);


  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlace(null);
  };

  const NavigateToSchedule = () => {
    navigation.navigate('schedule');
  };

  const PlaceItem = ({ place, onPress }) => {
    return (
      <TouchableOpacity style={styles.placeItem} onPress={() => onPress(place)}>
        <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: place.image }} style={styles.placeImage} />
          
          {/* Status below the image */}
          <View style={styles.statusContainer}>
            {place.isOpen ? (
              <Text style={[styles.statusText, styles.openStatus]}>
                Open <Icon name="check-circle" size={20} color="green" />
              </Text>
            ) : (
              <Text style={[styles.statusText, styles.closedStatus]}>
                Closed <Icon name="times-circle" size={20} color="red" />
              </Text>
            )}
          </View>
        </View>

          <View style={styles.column}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.text} numberOfLines={5}>{place.description}</Text>
          </View>
          <Image source={icons.rightChevron} style={styles.chevron} />
        </View>
      </TouchableOpacity>
    );
  };

  const handlePress = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food at the zoo</Text>
      <FlatList
        data={placesWithoutAnimals}
        renderItem={({ item }) => <PlaceItem place={item} onPress={handlePress} />}
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
              {selectedPlace && (
                <>
                
                  <Text style={modalStyle.placeName}>{selectedPlace.name}</Text>
                  <Image source={{ uri: selectedPlace.image }} style={modalStyle.image} />
                  <Text></Text>
                  <Text>
                    <Text style={modalStyle.sectionText}>{selectedPlace.description}</Text> 
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

export default Places;

const styles = StyleSheet.create({
  imageContainer: {
    // alignItems: 'center', // Center the image and status
    // marginRight: 10, // Add space between image/status and other content
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Adjust spacing as needed
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  openStatus: {
    color: 'green', // Green color for "Open"
  },
  closedStatus: {
    color: 'red', // Red color for "Closed"
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
  bottombar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10, // Adjust the thickness as needed
    backgroundColor: '#8BC33A',
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
    marginBottom: 30,
    marginTop: 47,
    textAlign: 'left', 
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
    // shadowColor: '#000', // Shadow color
    // shadowOffset: { width: 0, height: 2 }, // Shadow offset
    // shadowOpacity: 0.25, // Shadow opacity
    // shadowRadius: 3.84, // Shadow radius
    // elevation: 5, // Elevation for Android shadow
    backgroundColor: '#fff', // Background color to make the shadow visible
    padding: 2, // Optional: Add padding to the component
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
    marginTop: -11,
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


// const modalStyle = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: '#5a8c66',
//     // borderRadius: 30,
//     padding: 0,
//     // alignItems: 'center',
//     position: 'relative',
//     borderColor: 'green', 
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   animalListElement: {
//     borderRadius: 10, // Rounded corners
//     shadowColor: '#000', // Shadow color
//     shadowOffset: { width: 0, height: 2 }, // Shadow offset
//     shadowOpacity: 0.25, // Shadow opacity
//     shadowRadius: 3.84, // Shadow radius
//     elevation: 5, // For Android shadow
//   },
//   animalImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 15,
//   },
//   animalName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'black',
//   },
//   species: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     textAlign: 'center',
//     color: 'grey',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   sectionText: {
//     fontSize: 16,
//     color: 'black',
//   },
//   closeButton: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontFamily: 'serif',
//   },
// });


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
    // borderRadius: 30,
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
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    color: 'white',
  },
  description: {
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
});
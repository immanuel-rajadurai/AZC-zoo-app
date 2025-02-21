import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { animalImages, animalData } from '../../../data/animals';
import { placesData, images } from '../../../data/places';
import { showsData } from '../../../data/shows';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { icons } from '../../../constants';

import { generateClient } from 'aws-amplify/api';
import { listEvents } from '../../../src/graphql/queries'; 

const client = generateClient(); 


const Shows = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);


  useEffect(() => {
      const fetchEvents = async () => { 
        try {
          const eventsResult = await client.graphql(
            {query: listEvents}
          );
  
          console.log(eventsResult.data.listEvents.items);
  
          setEvents(eventsResult.data.listEvents.items)
  
          console.log("");
          console.log(events[0])
        } catch (error) {
          console.log('error on fetching events', error)
        }
      }
  
      fetchEvents();
    }, []);


  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const NavigateToSchedule = () => {
    navigation.navigate('schedule');
  };

  const EventItem = ({ event, onPress }) => {
    return (
      <TouchableOpacity style={styles.eventItem} onPress={() => onPress(event)}>
        <View style={styles.header}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={styles.column}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.text} numberOfLines={5}>{event.description}</Text>
          </View>
          <Image source={icons.rightChevron} style={styles.chevron} />
        </View>
      </TouchableOpacity>
    );
  };

  const handlePress = (place) => {
    setSelectedEvent(place); // Adjust to set the selected place
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shows</Text>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventItem event={item} onPress={handlePress} />}
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
                    {selectedEvent && (
                      <>
                        <Text style={modalStyle.eventName}>{selectedEvent.name}</Text>
                        <Image source={{ uri: selectedEvent.image }} style={modalStyle.image} />
                        <Text></Text>
                        <Text>
                          <Text style={modalStyle.sectionText}>{selectedEvent.description}</Text> 
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

export default Shows;

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
    marginBottom: 2,
    marginTop: 45,
    textAlign: 'left', 
  },
  text: {
    fontSize: 12,
    flex: 1,
    // marginLeft:15
  },
  animalList: {
    width: '100%',
  },
  eventItem: {
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
  eventImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: -3,
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
  eventName: {
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
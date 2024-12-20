import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { images } from '../../../constants'


import { generateClient } from 'aws-amplify/api';
import { listEvents } from '../../../src/graphql/queries'; 

const client = generateClient(); 
 
const generalEventsList = [
  { id: 1, name: "Classic zoo tour", image: "https://i.ytimg.com/vi/qg8DI7yGxB4/maxresdefault.jpg" },
  { id: 2, name: "Photography", image: "https://www.nczoo.org/sites/default/files/2024-06/zoo-tours-1.jpg" },
  { id: 3, name: "Zookeeper session", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxirguW66tX_jYE0qc0uu9srV7CfEs8e5ZZQ&s" }
];

const birdEventsList = [
  { id: 1, name: "Parrot showcase", image: "https://paradisepark.org.uk/wp-content/uploads/2018/09/Macaw-Header-Image-1024x404.jpg" },
  { id: 2, name: "Flying show", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKzVFGDmpR11mkHOZnzD3cdcfFUkBhH1x1LA&s" },
  { id: 3, name: "Bird handling", image: "https://www.wise-owl.co.uk/wp-content/uploads/2019/03/shows-1.jpg" }
];

const tigerEventsList = [
  { id: 1, name: "Learn about Tigers", image: "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop" },
  { id: 2, name: "Tiger feeding", image: "https://static01.nyt.com/images/2020/04/07/us/07xp-newtigerking/merlin_171122598_a64a8924-51f2-4010-a7a3-892b3e94513d-superJumbo.jpg" },
  { id: 3, name: "White tiger showcase", image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg" }
];

const HorizontalListItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.thumbnail} />
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TitleSection = ({ title, color }) => (
  <View style={[styles.titleContainer, { backgroundColor: color }]}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const InformationPage = () => {

  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handlePress = (item) => {
    setModalVisible(true);
    setSelectedEvent(item);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  

  useEffect(() => {
  
    const fetchEvents = async () => { 
      console.log("fetching events")

      try {
        const eventsResult = await client.graphql(
          {query: listEvents}
        );

        const retrievedEvents = eventsResult?.data?.listEvents?.items || [];


        console.log(retrievedEvents);

        setEvents(retrievedEvents)

      } catch (error) {
        console.log('error on fetching events', error)
      }
    }

    fetchEvents();
  }, []);


  const renderHorizontalList = (data) => (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <HorizontalListItem item={item} onPress={handlePress}/>}
      showsHorizontalScrollIndicator={false}
    />
  );

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container}>
      <TitleSection title="Experiences" color="#3e7a36" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(events)}
      </View>
      <TitleSection title="Bird Shows" color="#3e7a36" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(birdEventsList)}
      </View>
      <TitleSection title="Tiger Events" color="#3e7a36" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(tigerEventsList)}
      </View>
    </ScrollView>
    {/* <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <SafeAreaView style={modalStyle.modalContainer}>
        <View style={modalStyle.modalContent}>
          <ScrollView>
            {selectedEvent && (
              <>
                <Text style={modalStyle.modalTitle}>{selectedEvent.name}</Text>
                <Image source={{ uri: selectedEvent.image }} style={styles.placeImage} />
                <Text style={modalStyle.species}>{selectedEvent.description}</Text> 
              </>
            )}
          </ScrollView>
          <TouchableOpacity onPress={closeModal} style={modalStyle.closeButton}>
            <Text style={modalStyle.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal> */}

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
                  <Image source={{ uri: selectedEvent.image }} style={modalStyle.image} />
                  <Text style={modalStyle.animalName}>{selectedEvent.name}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#e8f5e9',
  },
  titleContainer: {
    padding: 5,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text color
    textAlign: 'left',
    fontFamily: 'serif',
    marginLeft: 10,
  },
  horizontalListContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  halfCircle: {
    position: 'absolute',
    bottom: -40,  // Ensures it overlaps other components slightly
    left: '53%',  // Start at the center of the screen
    marginLeft: -100, // Move back by half the width to center it
    width: 200,  // Width of the half-circle
    height: 80,  // Height of the half-circle
    backgroundColor: '#234e35',  // Dark green color
    borderTopLeftRadius: 80,  // Creates a rounded top left corner
    borderTopRightRadius: 80,  // Creates a rounded top right corner
    zIndex: 2,  // Ensure it stays above other components
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    padding: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 }, // Increase the height offset
    // shadowOpacity: 0.5, // Increase the opacity
    // shadowRadius: 6, // Increase the radius
    // elevation: 10, // Increase the elevation for Android
  },
  thumbnail: {
    width: 200,
    height: 130,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: '#2e7d32', // Green border
  },
  itemName: {
    marginTop: 10,
    marginRight: 10,
    fontSize: 16,
    // color: '#2e7d32', // Green color
    fontFamily: 'serif', // Suitable font
    textAlign: 'center',
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
});





export default InformationPage;
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions, Button } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Overlay } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router'; // Import useRouter
import CustomButton from '../../../components/CustomButton';
import { mapstyle1 } from "../../../styling/mapstyles";
import Events from "../../../components/Events"
import animals from "../../../data/animals";
import eventsDummy from "../../../data/events";
import ToggleShowInformationButton from '../../../components/ToggleShowInformationButton';
import accessibilityIcon from "../../../assets/icons/accessibility.png";
import { icons } from '../../../constants';

// import { generateClient } from 'aws-amplify/api';
// import { listEvents } from '../../src/graphql/queries';

// const client = generateClient();

const Home = () => {
  
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const router = useRouter(); // Initialize useRouter
  const [refreshing, setRefreshing] = useState(false)
  const [eventsVisible, setEventsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(200)).current;
  const { height: screenHeight } = Dimensions.get('window');
  const [eventButtonTitle, setButtonTitle] = useState("Challenge");
  const [accessibilityVisible, setAccessibilityVisible] = useState(false);
  const [isShowEventsButtonVisible, setShowEventsButtonVisible] = useState(true);
  
  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  }
 
  const [region, setRegion] = useState({
    latitude: 51.535121,
    longitude: -0.154131,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  const [events, setEvents] = useState([]);
  
  const toggleEvents = () => {
    
  
    if (eventsVisible) {
      setShowEventsButtonVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setEventsVisible(false);
        setButtonTitle("Challenge");
      });
    } else {
      setEventsVisible(true);
      
      setButtonTitle("Challenge");
      Animated.timing(translateY, {
        toValue: -10,
        duration: 5,
        useNativeDriver: true,
      }).start();
      setShowEventsButtonVisible(false);
    }
  };

  const toggleAccessibilityIcon = () => {
    if (accessibilityVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setAccessibilityVisible(false);
      });
    } else {
      setAccessibilityVisible(true);
      Animated.timing(translateY, {
        toValue: -10,
        duration: 5,
        useNativeDriver: true,
      }).start();
    }
  };

  const zooRegion = {
    latitude: 51.535121,
    longitude: -0.154131,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  useEffect(() => {

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, 
          distanceInterval: 1, 
        },
        (location) => {
          setCurrentLocation(location.coords);
          setRegion((prevRegion) => ({
            ...prevRegion,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }));
        }
      );

      // let location = await Location.getCurrentPositionAsync({
      //   accuracy: Location.Accuracy.BestForNavigation
      // });
      // setCurrentLocation(location.coords);

      // setRegion({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      //   latitudeDelta: 0.005,
      //   longitudeDelta: 0.005,
      // });
    };

    // const fetchEvents = async () => { 

    //   try {
    //     const eventsResult = await client.graphql(
    //       {query: listEvents}
    //     );

    //     console.log(eventsResult);

    //     setEvents(eventsResult.data.listEvents.items)
    //   } catch (error) {
    //     console.log('error on fetching events', error)
    //   }
    // }

    setRegion({
      latitude: 51.535121,
      longitude: -0.154131,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });

    // getLocation();
    // fetchEvents();
  }, []);

  const goToZoo = () => {
    mapRef.current.animateToRegion(zooRegion, 500);

    console.log(events);
  };

  const handleAnimalPress = (animal) => {
    setSelectedAnimal(animal);
    setModalVisible(true);
  };

  const handleShowMore = () => {
      setModalVisible(false);
      router.push({
          pathname: '/ExhibitDetails',
          params: { animalName: selectedAnimal.name }
      });
  };

  const imageBounds = [
    [51.532581594564654, -0.15931530103070354], //southwest
    [51.536631441307364, -0.15031572508956532], //northeast
  ];

  // const imageBounds = [
  //   [51.532581594564654, -0.1622530103070354], //southwest
  //   [51.536631441307364, -0.15011572508956532], //northeast
  // ];
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={zooRegion}
        showsUserLocation={true}
        // followsUserLocation={true}
        customMapStyle={mapstyle1}
        // onRegionChangeComplete={(region) => setRegion(region)}
        onRegionChangeComplete={(newRegion) => {
          // Set the region back to the specified bounds if the user tries to pan outside
          if (
            newRegion.latitude < 51.534 || // Lat min bound
            newRegion.latitude > 51.536 || // Lat max bound
            newRegion.longitude < -0.156 || // Lon min bound
            newRegion.longitude > -0.152 // Lon max bound
          ) {
            mapRef.current.animateToRegion(region, 200); // Reset to original region
          }
        }}
        provider={MapView.PROVIDER_GOOGLE}
      >
    
        <Overlay  
          image={require("../../../assets/mapoverlays/zoomap3.png")}
          bounds={imageBounds}
          bearing={0}
          style={styles.overlay}
          opacity={1}
        />
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            {selectedAnimal && (
              <>
                <Text style={modalStyles.topicText}>{selectedAnimal.name}</Text>
                <Text style={modalStyles.subTopicText}>( {selectedAnimal.species} )</Text>
                <Image
                  source={selectedAnimal.image} 
                  style={modalStyles.image}
                />

                <ScrollView style={modalStyles.scrollContainer}>
                  <Text style={modalStyles.modalText}>{selectedAnimal.facts}</Text>
                </ScrollView>

                <TouchableOpacity
                  style={[modalStyles.button, modalStyles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={modalStyles.textStyle}>Close</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={[modalStyles.button, modalStyles.buttonMore]}
                    onPress={handleShowMore}
                >
                    <Text style={modalStyles.textStyle}>Show More</Text>
                </TouchableOpacity> */}
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.halfCircle} />

      <View style={styles.bottombar} />
      
      {isShowEventsButtonVisible && (
        <View style={styles.eventButton}>
          <ToggleShowInformationButton title={eventButtonTitle}  handlePress={toggleEvents} />
        </View>
      )}

      {eventsVisible && (

        <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
          
          <View style={styles.eventsContainer}>
            {/* <Button title="Close" styles={styles.closeButton} onPress={toggleEvents} /> */}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={toggleEvents} // Pass the fileUri to the deleteFile function
            >
              <Image
                source={icons.pulldownbutton} // Replace with your delete icon
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
            <Events styles={styles.test} events={events} />
          </View>
        </Animated.View>

      )}

      {/* <TouchableOpacity style={styles.toggleButton} onPress={toggleAccessibilityIcon}>
        <Text style={styles.buttonText}>
          {accessibilityVisible ? "Hide Disabled" : "Show Disabled"}
        </Text>
      </TouchableOpacity> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, 
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    transform: [{ rotate: '90deg' }],
  },
  eventsContainer: {
    position: 'relative',
    top: 100, // Adjust this value to move the events component further down
    width: '100%',
    alignItems: 'center',
    padding: 0,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
  halfCircle: {
    position: 'absolute',
    bottom: -40,  // Ensures it overlaps other components slightly
    width: 200,  // Width of the half-circle
    height: 80,  // Height of the half-circle
    backgroundColor: '#162b4c',  // Dark green color
    borderTopLeftRadius: 80,  // Creates a rounded top left corner
    borderTopRightRadius: 80,  // Creates a rounded top right corner
    zIndex: 2,  // Ensure it stays above other components
  },
  bottombar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10, // Adjust the thickness as needed
    backgroundColor: 'grey',
  },
  eventButton: {
    width: "60%",
    padding: 5,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    alignItems: 'center', // Center horizontally
  },


  toggleButton: {
    position: "absolute",
    bottom: 8, 
    right: 8, 
    backgroundColor: "grey",
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    width: 84, 
    alignItems: "center", 
    zIndex: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#5a8c66',
    borderRadius: 30,
    padding: 0,
    // alignItems: 'center',
    position: 'relative',
    borderColor: 'green', 
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    position: 'relative',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  topicText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
    color: 'white',
  },
  subTopicText: {
    ontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'serif',
    color: 'white',
    marginLeft: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'serif',
    color: 'white',
  },
  image: {
    width: '100%', 
    height: 150,
  },
  scrollContainer: {
    maxHeight: 100, // Set a max height for the scrollable area
  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Home;
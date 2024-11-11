import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions, Button } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Overlay } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { mapstyle1 } from "../../../styling/mapstyles";
import Events from "../../../components/Events"
import animals from "../../../data/animals";
import eventsDummy from "../../../data/events";
import ToggleShowInformationButton from '../../../components/ToggleShowInformationButton';

// import { generateClient } from 'aws-amplify/api';
// import { listEvents } from '../../src/graphql/queries';

// const client = generateClient();

const Home = () => {
  
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const router = useRouter(); 
  const [refreshing, setRefreshing] = useState(false)
  const [eventsVisible, setEventsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(200)).current;
  const { height: screenHeight } = Dimensions.get('window');
  const [eventButtonTitle, setButtonTitle] = useState("Challenge");
  
  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  }
 
  const [region, setRegion] = useState({
    latitude: 48.7460,
    longitude: 2.66315,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [events, setEvents] = useState([]);
  
  const toggleEvents = () => {
    if (eventsVisible) {
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
      setButtonTitle("Hide Challenge");
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

  const overlayBoundCoords = [
    [51.532581594564654, -0.15931530103070354], //southwest
    [51.536631441307364, -0.15031572508956532], //northeast
  ];
  

  useEffect(() => {

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
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

    setEvents(eventsDummy)

    getLocation();
    // fetchEvents();
  }, []);

  const handleAnimalPress = (animal) => {
    setSelectedAnimal(animal);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={zooRegion}
        showsUserLocation={true}
        customMapStyle={mapstyle1}
        onRegionChangeComplete={(region) => setRegion(region)}
        provider={MapView.PROVIDER_GOOGLE}
        rotateEnabled={false}
      >

        <Overlay  
          image={require("../../../assets/mapoverlays/zoomap3.png")}
          bounds={overlayBoundCoords}
          bearing={0}
          style={styles.overlay}
          opacity={1}
        />

        {animals.map((animal, index) => (
          <Marker
            key={index}
            coordinate={animal.coordinates}
            onPress={() => handleAnimalPress(animal)}
          >
            <Image
              source={animal.image}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
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
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.halfCircle} />

      <View style={styles.eventButton}>
        <ToggleShowInformationButton title={eventButtonTitle} textStyles="text-white" handlePress={toggleEvents} />
      </View>

      {eventsVisible && (
        <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
          <Events events={events} />
        </Animated.View>
      )}
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
  text: {
    fontSize: 16,
    margin: 10,
  },
  halfCircle: {
    position: 'absolute',
    bottom: -40,  
    width: 200,  
    height: 80,  
    backgroundColor: '#234e35', 
    borderTopLeftRadius: 80,  
    borderTopRightRadius: 80, 
    zIndex: 2, 
  },
  eventButton: {
    width: "70%",
    padding: 5,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    alignItems: 'center', 
  }
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  topicText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  subTopicText: {
    color: "darkgreen",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  scrollContainer: {
    maxHeight: 100,
  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonMore: {
    
    backgroundColor: "green",
  },
});

export default Home;
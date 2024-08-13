import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions, Button } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Overlay } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router'; // Import useRouter
import CustomButton from '../../components/CustomButton';
import { mapstyle1 } from "../../styling/mapstyles";
import Events from "../../components/Events"

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
  const [eventButtonTitle, setButtonTitle] = useState("Show Events");
  
  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  }

  var posts = [{"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:03.558+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102a0003c95af39aa", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:03.558+00:00", "prompt": "Come and see our eagles as they fly in the sky", "thumbnail": "https://wildlife.foothillsclusters.com/wp-content/uploads/2023/05/230518-03.jpg", "title": "Eagle Show", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949581999?h=4672125b31"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:17:47.089+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102cc0021f55940c3", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:17:47.089+00:00", "prompt": "Help us feed our lovable animals", "thumbnail": "https://cms.whipsnadezoo.org/sites/default/files/styles/responsive/public/1024/1024/0/2022-12/Meet-the-Animals-24-Photo-by-Justin-Doherty.jpg.webp", "title": "Animal feeding", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949579770?h=897cd5e781"}, {"$collectionId": "668e5083002b3f534cf3", "$createdAt": "2024-07-12T10:18:22.338+00:00", "$databaseId": "668e503d0036733ee658", "$id": "669102ef003c49d4c7bd", "$permissions": [], "$tenant": "165998", "$updatedAt": "2024-07-12T10:18:22.338+00:00", "prompt": "Come and learn about the fascinating world of Tigers, enjoy a free Tiger snack the TigerTaste Cafe", "thumbnail": "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop", "title": "Tiger festival", "users": {"$collectionId": "668e5057003aed7c3b16", "$createdAt": "2024-07-10T14:46:56.037+00:00", "$databaseId": "668e503d0036733ee658", "$id": "668e9ee100305aae9daf", "$permissions": [Array], "$tenant": "165998", "$updatedAt": "2024-07-10T14:46:56.037+00:00", "accountId": "668e9edf001c2f7b6117", "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=immraj&project=668e4f04003bfae2a718", "email": "immanuelraj154@gmail.com", "username": "immraj"}, "video": "https://player.vimeo.com/video/949582778?h=d60220d68d"}]

  const animals = [
    {
      name: 'Hippopotamus',
      species: 'Hippopotamus amphibius',
      coordinates: { latitude: 51.535121, longitude: -0.154131 },
      image: require("../../assets/amimalicons/hippo.png"),
      facts: 'Hippos are the third largest land mammal after elephants and rhinos.\n\nHippos are found in Savannahs!\n\nOther Facts'
    },
    {
      name: 'Tiger',
      species: 'Panthera tigris',
      coordinates: { latitude: 51.535121, longitude: -0.1547 },
      image: require("../../assets/amimalicons/tiger.png"),
      facts: 'Tigers are the largest wild cats in the world.\n\nTigers are apex predators!\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts'
    },
    {
      name: 'Giraffe',
      species: 'Giraffa camelopardalis',
      coordinates: { latitude: 51.5355, longitude: -0.155 },
      image: require("../../assets/amimalicons/giraffe.png"),
      facts: 'Giraffes are the tallest mammals on Earth.\n\nGiraffes are herbivores!\n\nOther facts'
    },
  ];


  const [region, setRegion] = useState({
    latitude: 48.7460,
    longitude: 2.66315,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });


  const toggleEvents = () => {
    if (eventsVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setEventsVisible(false);
        setButtonTitle("Show Events");
      });
    } else {
      setEventsVisible(true);
      setButtonTitle("Hide Events");
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

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  const goToZoo = () => {
    mapRef.current.animateToRegion(zooRegion, 500);
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
    [51.53099938615087, -0.16020707102841678], //soutwest
    [51.53763097724814, -0.1493777865209378], //northeast
  ];
  
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
      >

        <Overlay  
          image={require("../../assets/mapoverlays/londonzoo2.png")}
          bounds={imageBounds}
          bearing={160}
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

      <CustomButton handlePress={() => goToZoo()} title="Go to Zoo" />
      <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text>

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

                <TouchableOpacity
                    style={[modalStyles.button, modalStyles.buttonMore]}
                    onPress={handleShowMore}
                >
                    <Text style={modalStyles.textStyle}>Show More </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.eventButton}>
        <Button title={eventButtonTitle} onPress={toggleEvents} />
      </View>

      {eventsVisible && (
        <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
          <Events posts={posts} />
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
  eventButton: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
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
    maxHeight: 100, // Set a max height for the scrollable area
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
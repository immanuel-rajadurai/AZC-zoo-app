import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions, Button, Linking } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Overlay } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router'; 
import CustomButton from '../../../components/CustomButton';
import { mapstyle1 } from "../../../styling/mapstyles";
import Events from "../../../components/Events"
import animals from "../../../data/animals";
import eventsDummy from "../../../data/events";
import ToggleShowInformationButton from '../../../components/ToggleShowInformationButton';
import accessibilityIcon from "../../../assets/icons/accessibility.png";
import { icons } from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const router = useRouter(); // Initialize useRouter
  const [refreshing, setRefreshing] = useState(false)
  const [eventsVisible, setEventsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(200)).current;
  const [eventButtonTitle, setButtonTitle] = useState("Challenge");
  const [isShowEventsButtonVisible, setShowEventsButtonVisible] = useState(true);
  const [accessibilityVisible, setAccessibilityVisible] = useState(false); 
  const [mobilityImpairments, setMobilityImpairments] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [buttonCount, setButtonCount] = useState(0)


  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
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

    if (!eventsVisible) {
      setButtonCount(currentCount => {
        const newCount = currentCount + 1;
        
        // Open modal when challenge button is pressed 20 times
        if (newCount % 20 === 0) {
          setFeedbackModalVisible(true);
        }

        return newCount;
      });
    }
    
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

  const openInstagram = () => {
    const instagramUrl = 'instagram://library?AssetPath=your_image_path'; // Replace with your Instagram URL
    Linking.openURL(instagramUrl).catch((err) =>
      console.error('Error opening Instagram link:', err)
    );
  };
  const shareToFacebook = () => {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        'https://www.londonzoo.org/'
      )}`;
      Linking.openURL(facebookShareUrl).catch((err) =>
        console.error('Error opening URL:', err)
      );
    };
  
  const shareToTwitter = () => {
      const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        'I just completed an Animal challenge at London Zoo! Check out my acheivement!'
      )}&url=${encodeURIComponent('https://www.londonzoo.org/')}`;
      
      Linking.openURL(twitterShareUrl).catch((err) =>
        console.error('Error opening URL:', err)
      );
    };

  const openTripadvisorReview = () => {
    const tripAdvisorUrl = 'https://www.tripadvisor.co.uk/UserReviewEdit-g186338-d187553-London_Zoo-London_England.html';
    Linking.openURL(tripAdvisorUrl).catch((err) =>
      console.error('Error opening Tripadvisor:', err)
    );
  };

  const openGoogleReview = () => {
    const googleReviewUrl = 'https://www.google.com/search?sca_esv=1c8765e962fa8ef3&rlz=1C1CHBF_en-GBGB920GB920&sxsrf=AHTn8zrwlnHV4qLszcfV6JMX4V0oKVeDBg:1742396068329&si=APYL9bu7VukcKqdQJcpqJ814fIvBo9o8YpjD-LmyKwznrVfwMevHUR7TfezoKIJvP9_BbQKRUJAFT0pKNYtiUWE7S0pTbThMpdsEg_t9_MGl7zklxd8cwPDwTRSkoKBT2GuTZQpBnGvP&q=London+Zoo+Reviews&sa=X&ved=2ahUKEwijyNeVs5aMAxVcT0EAHfvrJQoQ0bkNegQIOhAE&biw=1536&bih=695&dpr=1.25';
    Linking.openURL(googleReviewUrl).catch((err) =>
      console.error('Error opening Google review link:', err)
    );
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
    };

    setRegion({
      latitude: 51.535121,
      longitude: -0.154131,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });

   

    getLocation();
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

  const [options, setOptions] = useState([
    { id: 1, name: 'Mobility Impairments', isEnabled: false },
    { id: 2, name: 'Visual Impairments', isEnabled: false },
  ]);
  
  // Fetch toggle states from AsyncStorage and update options
  useEffect(() => {
    const initializeOptions = async () => {
      const updatedOptions = await Promise.all(
        options.map(async (option) => {
          const savedState = await AsyncStorage.getItem(option.name);
          return {
            ...option,
            isEnabled: savedState === 'true',
          };
        })
      );
      setOptions(updatedOptions);
    };

    initializeOptions();
  }, []);

  // Update toggle state in both state and AsyncStorage
  const toggleOption = async (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.id === id) {
          const newValue = !option.isEnabled;
          AsyncStorage.setItem(option.name, newValue.toString());
          return { ...option, isEnabled: newValue };
        }
        return option;
      })
    );
  };

  
  const isOptionEnabled = (id) => options.find((option) => option.id === id)?.isEnabled;  
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={zooRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        customMapStyle={mapstyle1}
        onRegionChangeComplete={(region) => setRegion(region)}
        provider={MapView.PROVIDER_GOOGLE}
      >
      
        <Overlay  
          image={
            isOptionEnabled(2) 
            ? require("../../../assets/mapoverlays/zoomap4.png")// Visual impairment map
            : require("../../../assets/mapoverlays/zoomap3.png")// Standard map
          }
          bounds={imageBounds}
          bearing={0}
          style={styles.overlay}
          opacity={0.8}
        />

        {/* {animals.map((animal, index) => (
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
        ))} */}

        {options.map((option) =>
          option.isEnabled && option.id !== 2 ? (
            <Marker
              key={`marker-${option.id}`}
              coordinate={{ latitude: 51.53480, longitude: -0.1535 }}
            >
              <Image
                source={
                  require('../../../assets/icons/accessibility.png')
                }
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </Marker>
          ) : null
        )}

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

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setAccessibilityVisible(!accessibilityVisible)}
      >
        <Image
          source={require('../../../assets/icons/accessibility-filter.png')} style={styles.toggleButton}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={accessibilityVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.accessibilityView}>
          <View style={modalStyles.accessibilityModal}>
            <Text style={modalStyles.accessibilityText}>Accessibility Options Overview</Text>

            
            <View style={modalStyles.optionContainer}>
              <Image source={require('../../../assets/icons/mobility-impairment.png')} style={modalStyles.icon} />
              <Text style={modalStyles.optionText}>Mobility Impairments</Text>
              <TouchableOpacity
                style={[
                  modalStyles.toggleButton,
                  isOptionEnabled(1) ? modalStyles.toggleButtonOn : modalStyles.toggleButtonOff, // Dynamic styles for ON/OFF states
                ]}
                onPress={() => toggleOption(1)} // Toggle function with an ID, you can adjust this based on your needs
              >
                <View style={modalStyles.toggleIndicator}>
                  <View
                    style={[
                      modalStyles.indicator,
                      isOptionEnabled(1) ? modalStyles.indicatorOn : modalStyles.indicatorOff, // Change indicator dynamically
                    ]}
                  />
                </View>  
              </TouchableOpacity>
            </View>


            
            <View style={modalStyles.optionContainer}>
              <Image source={require('../../../assets/icons/visual-impairment.png')} style={modalStyles.icon} />
              <Text style={modalStyles.optionText}>Visual Impairments</Text>
              <TouchableOpacity
                style={[
                  modalStyles.toggleButton,
                  isOptionEnabled(2) ? modalStyles.toggleButtonOn : modalStyles.toggleButtonOff, // Dynamic styles for ON/OFF states
                ]}
                onPress={() => toggleOption(2)}
              >
                <View style={modalStyles.toggleIndicator}>
                  <View
                    style={[
                      modalStyles.indicator,
                      isOptionEnabled(2) ? modalStyles.indicatorOn : modalStyles.indicatorOff, // Change indicator dynamically
                    ]}
                  />
                </View>  
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={modalStyles.accessibilityCloseButton}
              onPress={() => setAccessibilityVisible(false)} // Close the modal on button press
            >
              <Text style={modalStyles.accessibilityCloseButtonText}>Close</Text>
            </TouchableOpacity>
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
      <Modal
        visible={feedbackModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFeedbackModalVisible(false)}
            >
              <SafeAreaView style={modalStyle.modalContainer}>
                <View style={modalStyle.modalContent}>
                  <ScrollView style={modalStyle.scrollContainer}>
                  <Text style={modalStyle.modalTitle}>How did we zoo?</Text>
                  <Text style={modalStyle.textStyle}>Share your thoughts with others! {"\n"} Leave a review </Text>
                  <View style={modalStyle.reviewRow}>
                    <TouchableOpacity onPress={openTripadvisorReview}>
                      <Image source={require('../../../assets/icons/tripadvisor.png')} style={modalStyle.reviewIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openGoogleReview}>
                      <Image source={require('../../../assets/icons/Google-Review-logo.png')} style={modalStyle.reviewIcon} />
                    </TouchableOpacity>
                    
                  </View>
                  <Text style={modalStyle.textStyle}>You can also share your experience with your close friends!</Text>
                  <View style={modalStyle.socialIconsContainer}>
                    <TouchableOpacity onPress={openInstagram}>
                      <Image source={require('../../../assets/icons/instagramlogo.png')} style={modalStyle.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareToFacebook}>
                      <Image source={require('../../../assets/icons/facebook_icon.png')} style={modalStyle.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareToTwitter}>
                      <Image source={require('../../../assets/icons/twitterlogo.png')} style={modalStyle.socialIcon} />
                    </TouchableOpacity>
                    
                  </View>
                  </ScrollView>
                  <TouchableOpacity onPress={() => setFeedbackModalVisible(false)} style={modalStyle.closeButton}>
                    <Text style={modalStyle.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Modal>
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
    backgroundColor: '#234e35',  // Dark green color
    borderTopLeftRadius: 80,  // Creates a rounded top left corner
    borderTopRightRadius: 80,  // Creates a rounded top right corner
    zIndex: 2,  // Ensure it stays above other components
  },
  bottombar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10, // Adjust the thickness as needed
    backgroundColor: '#8BC33A',
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
    top: 16, 
    right: 16, 
    width: 32,
    height: 32,
    alignItems: "center", 
    zIndex: 2,
    marginTop:20
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
  accessibilityView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessibilityModal: {
    width: 340,
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  accessibilityText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 28,
    color: '#000000',
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    marginRight: 16,
    marginLeft: 8,
    width: 28,
    height: 30,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#000000', 
    marginRight: 20,
    flex: 1,
  },
  toggleButton: {
    width: 40,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
    marginTop: 20
  },
  toggleButtonOn: {
    backgroundColor: '#00533A', // background for ON
  },
  toggleButtonOff: {
    backgroundColor: '#000000', // background for OFF
  },
  toggleIndicator: {
    width: 36,
    height: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    position: 'relative',
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
  },
  indicatorOn: {
    backgroundColor: '#00533A', // for ON state
    right: 2,
  },
  indicatorOff: {
    backgroundColor: '#000000', // for OFF state
    left: 2,
  },
  buttonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accessibilityCloseButton: {
    backgroundColor: '#000000', // for close button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 20,
  },
  accessibilityCloseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollContainer: {
    paddingBottom: 70,
  },

  modalContent: {
    width: '90%',
    backgroundColor: '#5a8c66',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderColor: 'green', 
  },
  closeButton: {
    position: 'relative',
    bottom: 10,
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
    color: 'white',
  },
  image: {
    width: '100%', 
    height: 150,
  },
  
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 22,
    fontFamily: 'serif',
    color: 'white',
  },
  
  // sectionText: {
  //   fontSize: 16,
  //   marginBottom: 20,
  //   fontFamily: 'serif',
  //   color: 'white',
  // },
  textStyle: {
    color: "white",
    // fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'serif',  
    fontStyle: 'italic',
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
  reviewRow: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 50,
    justifyContent: "center",
  },
  reviewIcon: {
    width: 60,
    height: 60,
    marginHorizontal: 20,
    alignItems: "center",
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 15,
  },
  socialIconsContainer: {
    flexDirection: "row",
    marginTop: 25,
    // alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;

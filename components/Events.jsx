import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { images } from '../constants/'
import { icons } from '../constants'


const Events = () => {
  const [translateY] = useState(new Animated.Value(0));
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const [showAlternateHeader, setShowAlternateHeader] = useState(false);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAnimalPress = (event) => {
    console.log("event " + event.name + " has been pressed");
    setSelectedAnimal(event);
    setModalVisible(true);

    if (event.name === 'Young adventurer challenge') {
      navigation.navigate('easychallenge');
    } else if (event.name === 'Mystery animal challenge') {
      navigation.navigate('hardchallenge');
    } else if (event.name === 'Events') {
      navigation.navigate('events');
    }
  };

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  const toggleHeader = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowAlternateHeader(!showAlternateHeader);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const hardcodedEvents = [
    { id: '1', name: 'Young adventurer challenge', description: 'Events happening at the zoo', thumbnail: images.youngAdventurerChallenge },
    { id: '2', name: 'Mystery animal challenge', description: 'News about the zoo', thumbnail: images.mysteryChallenge},
  ];

  return (
    <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY }] }}>
      <Animated.View style={{ ...styles.headerBox, opacity: fadeAnim }}>
      {showAlternateHeader ? (
          <View style={[styles.headerContainer, styles.alternateHeaderContainer]}>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>A bit more about how it works</Text>
              <TouchableOpacity style={styles.chevronContainer} onPress={toggleHeader}>
                <Image source={icons.leftChevron} style={styles.chevron} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subHeaderText}>Discover the hidden secrets of the zoo!</Text>
            <Text style={styles.descriptionText}>
              You are given a list of animals to photograph. The left column shows the ones you have yet to capture, and the right column shows the ones you have already photographed.
            </Text>
            <Text style={styles.descriptionText}>
Please note that some animals may not be visible at times. This is because the exhibits are designed to give them the choice to hide or be visible. Simply come back at a later point to try your chance again, like a real adventurer!
            </Text>
            <Text style={styles.descriptionText}>
Once the challenge is completed, make your way to the gift shop to collect your prize! You will need to show the badge that appears when you complete a challenge. Best of luck!
            </Text>
          </View>
        ) : (
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Up for the challenge?</Text>
              <TouchableOpacity style={styles.chevronContainer} onPress={toggleHeader}>
                <Image source={icons.rightChevron} style={styles.chevron} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subHeaderText}>What about an animal scavenger hunt !!!</Text>
            <Text style={styles.descriptionText}>
              Complete the challenges by taking a picture of all the animals listed and win a unique experience
            </Text>
          </View>
        )}
      </Animated.View>
      <FlatList
        overScrollMode="never"
        data={hardcodedEvents}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(`Item pressed: ${item.name}`);
              handleAnimalPress(item);
            }}
            style={styles.itemContainer}
          >
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Image source={item.thumbnail} style={styles.thumbnail}/>
            </View>
          </TouchableOpacity>
        )}
        onViewableItemsChanged={viewableItemsChanged}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensure the container is positioned relatively
  },
  animatedContainer: {
    flex: 1,
    paddingTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    // Common header styles
    padding: 10,
    backgroundColor: '#fff',
  },
  alternateHeaderContainer: {
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
    height: 500, // Larger height for the alternate header
    position: 'absolute', // Position the header absolutely
    top: 0, // Position it at the top
    left: 0, // Align it to the left
    zIndex: 10,
  },
  headerBox: {
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
    height:190,
    position: 'relative', // Position the header absolutely
    top: 0, // Position it at the top
    left: 0, // Align it to the left
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  itemContainer: {
    padding: 5,
    margin: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: 250,
  },
  thumbnail: {
    width: '100%',
    height: '65%',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#107a04',
  },
  prompt: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  chevronContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  chevron: {
    width: 30,
    height: 30,
  },
});

export default Events;

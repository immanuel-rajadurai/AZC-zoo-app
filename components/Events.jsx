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

    if (event.name === 'News') {
      navigation.navigate('news');
    } else if (event.name === 'Information') {
      navigation.navigate('information');
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
    { id: '1', name: 'Events', description: 'Events happening at the zoo', thumbnail: images.eventsThumbnail },
    { id: '2', name: 'News', description: 'News about the zoo', thumbnail: images.newsThumbnail},
    // { id: '3', name: 'Information', description: 'Information about the zoo', thumbnail: images.informationThumbnail },
  ];

  return (
    <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY }] }}>
      <Animated.View style={{ ...styles.headerBox, opacity: fadeAnim }}>
        {showAlternateHeader ? (
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>Ready for a new adventure?</Text>
              <TouchableOpacity style={styles.chevronContainer} onPress={toggleHeader}>
                <Image source={icons.leftChevron} style={styles.chevron} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subHeaderText}>Discover the hidden secrets of the zoo!</Text>
            <Text style={styles.descriptionText}>
              Explore new areas and find hidden treasures to win exciting prizes.
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
              <Text style={styles.prompt}>{item.description}</Text>
              <Image source={item.thumbnail} style={styles.thumbnail} />
            </View>
          </TouchableOpacity>
        )}
        onViewableItemsChanged={viewableItemsChanged}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    paddingTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
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
    height:200
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
    padding: 10,
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
    width: 24,
    height: 24,
  },
});

export default Events;

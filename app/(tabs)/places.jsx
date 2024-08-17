import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import {placesData, images} from '../../data/places';


const PlaceItem = ({ place }) => {
  const placeImage = images[place.image]; 

  return (
    <View style={styles.place}>
      <Image source={placeImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{place.name}</Text>
      </View>
    </View>
  );
};

const Places = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Places</Text>
      <FlatList
        data={placesData}
        renderItem={({ item }) => <PlaceItem place={item} />}
        keyExtractor={(item) => item.name}
        style={styles.placesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center', 
    marginBottom: 2,
    marginTop: -30,
  },
  placesList: {
    marginTop: 20,
  },
  place: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 25,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 5,
    alignItems: 'flex-start', 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
});

export default Places
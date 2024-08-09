import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

//json file not full off data
const places = [
  {
    name: "Cafe Name Example",
    image: 'exampleimage',
    description: 'Description of cafe'
  },
  {
    name: 'Animal Exhibit Name',
    image: 'exampleimage',
    description: 'Description of Animal/exhibit'
  },
  {
    name: 'Café',
    image: 'exampleimage',
    description: ''
  },
  {
    name: '',
    image: 'exampleimage',
    description: ''
  },
  {
    name: '',
    image: 'exampleimage',
    description: ''
  }
];

const PlaceItem = ({ place }) => (
  <View style={styles.place}>
    <Image source={{ uri: place.image }} style={styles.image} /> 
    <View style={styles.textContainer}>
      <Text style={styles.name}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>
    </View>
  </View>
);

const Events = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
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
  placesList: {
    marginTop: 20,
  },
  place: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Events;
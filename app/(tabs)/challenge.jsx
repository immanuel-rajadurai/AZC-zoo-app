import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';

const snappedAnimals = [
    {
      "name": "llama",
      "path": require('../../assets/amimalicons/llama.png')
    },
    {
      "name": "monkey",
      "path": require('../../assets/amimalicons/monkey.png')
    },
    {
      "name": "panda",
      "path": require('../../assets/amimalicons/panda.png')
    },
    {
      "name": "tiger",
      "path": require('../../assets/amimalicons/tiger.png')
    }
];

const unsnappedAnimals = [
  {
    "name": "Camel",
    "path": require('../../assets/amimalicons/camel.png')
  },
  {
    "name": "Giraffe",
    "path": require('../../assets/amimalicons/giraffe.png')
  },
  {
    "name": "Hawk",
    "path": require('../../assets/amimalicons/hawk.png')
  },
  {
    "name": "Hippo",
    "path": require('../../assets/amimalicons/hippo.png')
  },
  {
    "name": "Lion",
    "path": require('../../assets/amimalicons/lion.png')
  }
];

const ImageDisplay = ({ imagePath, imageName }) => {
    return (
      <View style={styles.imageContainer}>
        <Image 
          source={imagePath}
          style={styles.image} 
        />
        <Text style={styles.text}>{imageName}</Text>
      </View>
    );
};

const challengeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Animals To Snap</Text>
        <ScrollView style={styles.scrollView}>
          {unsnappedAnimals.map((animal, index) => (
            <ImageDisplay 
              key={index} 
              imagePath={animal.path} 
              imageName={animal.name} 
            />
          ))}
        </ScrollView> 
      </View>
      
      <View style={styles.divider}></View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Snapped Animals</Text>
        <ScrollView style={styles.scrollView}>
          {snappedAnimals.map((animal, index) => (
            <ImageDisplay 
              key={index} 
              imagePath={animal.path}
              imageName={animal.name} 
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: "green"
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  divider: {
    width: 3,
    backgroundColor: '#000000',
    marginVertical: 10,
  },
});

export default challengeScreen;

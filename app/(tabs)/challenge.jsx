import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';

const snappedAnimals = [
    {
      "name": "llama",
      "path": "../../assets/amimalicons/llama.png"
    },
    {
      "name": "monkey",
      "path": "../../assets/amimalicons/monkey.png"
    },
    {
      "name": "panda",
      "path": "../../assets/amimalicons/panda.png"
    },
    {
      "name": "tiger",
      "path": "../../assets/amimalicons/tiger.png"
    }
];
const ImageDisplay = ({ imagePath, imageName }) => {
    return (
      <View style={styles.container}>
        <Text>{imageName}</Text>
        <Image 
          source={imagePath} // Not allowed, will cause an error
          style={{ width: 200, height: 200 }} 
        />
      </View>
    );
};

const challengeScreen = () => {
  const localImagePath = '../../assets/amimalicons/lion.png'; // Example path stored as a string
  const localImage = require('../../assets/amimalicons/lion.png'); // Static require
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Animals To Snap</Text>
        <ScrollView style={styles.scrollView}>
        <ImageDisplay imagePath={localImage}/>
        </ScrollView>
      </View>

 
      <View style={styles.section2}>
        <Text style={styles.title}>Snapped Animals</Text>
        <ScrollView style={styles.scrollView2}>

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
    padding: 10,
  },
  section2: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fafafa",
  },
  scrollView: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  scrollView2: {
    backgroundColor: '#fafafa',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: "green"
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default challengeScreen;

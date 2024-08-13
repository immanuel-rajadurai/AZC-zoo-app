import { View, Text,FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'


const animalData = [
  {
    "name": "Lion",
    "image": "lion"
  },
  {
    "name": "Giraffe",
    "image": "giraffe"
  },
  {
    "name": "Tiger",
    "image": "tiger"
  },
  {
    "name": "Monkey",
    "image": "monkey"
  },
  {
    "name": "Panda",
    "image": "panda"
  },
  {
    "name": "Camel",
    "image": "camel"
  },
  {
    "name": "Hawk",
    "image": "hawk"
  },
  {
    "name": "Hippopotamus",
    "image": "hippo"
  },
  {
    "name": "Llama",
    "image": "llama"
  }
];

const images = {
  lion: require('../../assets/amimalicons/lion.png'),
  giraffe: require('../../assets/amimalicons/giraffe.png'),
  tiger: require('../../assets/amimalicons/tiger.png'),
  monkey: require('../../assets/amimalicons/monkey.png'),
  panda: require('../../assets/amimalicons/panda.png'),
  camel: require('../../assets/amimalicons/camel.png'),
  hawk: require('../../assets/amimalicons/hawk.png'),
  hippo: require('../../assets/amimalicons/hippo.png'),
  llama: require('../../assets/amimalicons/llama.png'),
};

const AnimalItem = ({ animal }) => {
  const animalImage = images[animal.image]; 

  return (
    <View style={styles.animal}>
      <Image source={animalImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{animal.name}</Text>
      </View>
    </View>
  );
};

const Animals = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animals</Text>
      <FlatList
        data={animalData}
        renderItem={({ item }) => <AnimalItem animal={item} />}
        keyExtractor={(item) => item.name}
        style={styles.animalList}
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
  animalList: {
    marginTop: 20,
  },
  animal: {
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


export default Animals
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const newsList = [
  { id: '1', name: 'Our new app built by AquaZoo', description: 'Say hello to our new digital app', image: "https://static.wixstatic.com/media/190670_e72c9166405940d4939f926d38d4fa86~mv2.png/v1/fill/w_330,h_399,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/190670_e72c9166405940d4939f926d38d4fa86~mv2.png"},
  { id: '2', name: 'New parrot joining us', description: 'A new animal is joining us next week', image: "https://paradisepark.org.uk/wp-content/uploads/2018/09/Macaw-Header-Image-1024x404.jpg" },
  { id: '3', name: 'Plans for a new lion exhibit', description: 'Mystery changes coming to our zoo', image: "https://static.independent.co.uk/2024/08/19/18/Britain_Zoo_Weigh_In_72029.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp" },
];


const InformationPage = () => {
  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Information</Text>
      <FlatList
        data={newsList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  newsItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#4caf50',
  },
});

export default InformationPage;
import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';

const list = [
  { id: 1, name: "Event 1", image: "https://media.istockphoto.com/id/620423888/video/zebra-watching-at-savannah.jpg?b=1&s=640x640&k=20&c=hycC-pQhUQH7ih3cRpMag3vSTWylG2Qv1ZqMJAxwcyE=" },
  { id: 2, name: "Event 2", image: "https://media.istockphoto.com/id/620423888/video/zebra-watching-at-savannah.jpg?b=1&s=640x640&k=20&c=hycC-pQhUQH7ih3cRpMag3vSTWylG2Qv1ZqMJAxwcyE=" },
  { id: 3, name: "Event 3", image: "https://media.istockphoto.com/id/620423888/video/zebra-watching-at-savannah.jpg?b=1&s=640x640&k=20&c=hycC-pQhUQH7ih3cRpMag3vSTWylG2Qv1ZqMJAxwcyE=" }
];

const HorizontalListItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.image }} style={styles.thumbnail} />
    <Text style={styles.itemName}>{item.name}</Text>
  </View>
);

const TitleSection = ({ title, color }) => (
  <View style={[styles.titleContainer, { backgroundColor: color }]}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const EventsPage = () => {
  const renderHorizontalList = (data) => (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <HorizontalListItem item={item} />}
      showsHorizontalScrollIndicator={false}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <TitleSection title="General Events" color="#3e7a36" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(list)}
      </View>
      <TitleSection title="Bird Shows" color="#36527a" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(list)}
      </View>
      <TitleSection title="Tiger Events" color="#9c3b3b" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(list)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  titleContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text color
    textAlign: 'left',
    fontFamily: 'sans-serif-medium', // Suitable font
  },
  horizontalListContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Increase the height offset
    shadowOpacity: 0.5, // Increase the opacity
    shadowRadius: 6, // Increase the radius
    elevation: 10, // Increase the elevation for Android
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2e7d32', // Green border
  },
  itemName: {
    marginTop: 10,
    fontSize: 16,
    color: '#2e7d32', // Green color
    fontFamily: 'sans-serif', // Suitable font
    textAlign: 'center',
  },
});

export default EventsPage;
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { images } from '../../../constants'


import { generateClient } from 'aws-amplify/api';
import { listEvents } from '../../../src/graphql/queries'; 

const client = generateClient(); 
 
const generalEventsList = [
  { id: 1, name: "Classic zoo tour", image: "https://i.ytimg.com/vi/qg8DI7yGxB4/maxresdefault.jpg" },
  { id: 2, name: "Photography", image: "https://www.nczoo.org/sites/default/files/2024-06/zoo-tours-1.jpg" },
  { id: 3, name: "Zookeeper session", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxirguW66tX_jYE0qc0uu9srV7CfEs8e5ZZQ&s" }
];

const birdEventsList = [
  { id: 1, name: "Parrot showcase", image: "https://paradisepark.org.uk/wp-content/uploads/2018/09/Macaw-Header-Image-1024x404.jpg" },
  { id: 2, name: "Flying show", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKzVFGDmpR11mkHOZnzD3cdcfFUkBhH1x1LA&s" },
  { id: 3, name: "Bird handling", image: "https://www.wise-owl.co.uk/wp-content/uploads/2019/03/shows-1.jpg" }
];


const tigerEventsList = [
  { id: 1, name: "Learn about Tigers", image: "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop" },
  { id: 2, name: "Tiger feeding", image: "https://static01.nyt.com/images/2020/04/07/us/07xp-newtigerking/merlin_171122598_a64a8924-51f2-4010-a7a3-892b3e94513d-superJumbo.jpg" },
  { id: 3, name: "White tiger showcase", image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg" }
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

const InformationPage = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
  
    const fetchEvents = async () => { 

      try {
        const eventsResult = await client.graphql(
          {query: listEvents}
        );

        // console.log(eventsResult.data.listEvents.items);

        setEvents(eventsResult.data.listEvents.items)

        console.log("");
        console.log(events[0])
      } catch (error) {
        console.log('error on fetching events', error)
      }
    }

    fetchEvents();
  }, []);


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
    <View style={styles.container}>
    <ScrollView style={styles.container}>
      <TitleSection title="Experiences" color="#3e7a36" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(events)}
      </View>
      <TitleSection title="Bird Shows" color="#3e7a36" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(birdEventsList)}
      </View>
      <TitleSection title="Tiger Events" color="#3e7a36" />
      <View style={styles.horizontalListContainer}>
        {renderHorizontalList(tigerEventsList)}
      </View>
    </ScrollView>
    <View style={styles.halfCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#e8f5e9',
  },
  titleContainer: {
    padding: 5,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text color
    textAlign: 'left',
    fontFamily: 'serif',
    marginLeft: 10,
  },
  horizontalListContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  halfCircle: {
    position: 'absolute',
    bottom: -40,  // Ensures it overlaps other components slightly
    left: '53%',  // Start at the center of the screen
    marginLeft: -100, // Move back by half the width to center it
    width: 200,  // Width of the half-circle
    height: 80,  // Height of the half-circle
    backgroundColor: '#234e35',  // Dark green color
    borderTopLeftRadius: 80,  // Creates a rounded top left corner
    borderTopRightRadius: 80,  // Creates a rounded top right corner
    zIndex: 2,  // Ensure it stays above other components
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    padding: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 }, // Increase the height offset
    // shadowOpacity: 0.5, // Increase the opacity
    // shadowRadius: 6, // Increase the radius
    // elevation: 10, // Increase the elevation for Android
  },
  thumbnail: {
    width: 200,
    height: 130,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: '#2e7d32', // Green border
  },
  itemName: {
    marginTop: 10,
    fontSize: 16,
    // color: '#2e7d32', // Green color
    fontFamily: 'serif', // Suitable font
    textAlign: 'center',
  },
});

export default InformationPage;
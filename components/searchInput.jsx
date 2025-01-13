import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useState, forwardRef } from 'react';
import eventsDummy from '../data/events.js';
import { animalData , animalImages} from '../data/animals';
import { icons } from '../constants';
import { useRouter } from 'expo-router';
import { API, graphqlOperation } from 'aws-amplify';


const SearchInput = forwardRef(({ title, value, placeholder, handleChangeText, otherStyles, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [results, setEventResults] = useState([]);
  const [animalResults, setAnimalResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('events'); // State to track the active tab
  const router = useRouter();

  // Function to handle search submission
  const handleSearchSubmit = () => {

    testQuery();

    searchAnimalByName('Panda')
    .then((results) => {
        console.log('Found Animals:', results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    

    

    const filteredEvents = eventsDummy.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    const filteredAnimalResults = animalData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setEventResults(filteredEvents);
    setAnimalResults(filteredAnimalResults);
    setModalVisible(true);
  };

  const testQuery = async () => {
    const query = `
        query ListAnimals {
            listAnimals {
                items {
                    id
                    name
                }
            }
        }
    `;

    try {
        const response = await API.graphql(graphqlOperation(query));
        console.log('Test Query Result:', response.data);
    } catch (error) {
        console.error('Test Query Error:', error);
    }
  };

  const searchAnimalByName = async (name) => {
    const query = `
        query SearchAnimals($filter: ModelAnimalFilterInput) {
            listAnimals(filter: $filter) {
                items {
                    id
                    name
                    species
                    age
                }
            }
        }
    `;

    const variables = {
        filter: {
            name: {
                eq: name, // Exact match for the name
            },
        },
    };

    try {
        const response = await API.graphql(graphqlOperation(query, variables));
        console.log('Search Results:', response.data.listAnimals.items);
        return response.data.listAnimals.items;
    } catch (error) {
        console.error('Error during search:', error);
        throw error;
    }
  };


  const handleAnimalPress = (animalData) => {
    setModalVisible(false);
    router.push({
      pathname: '../animals',
      params: { animalName: animalData.name },
    });
  };
  
  const handleEventPress = (eventData) => {
    setModalVisible(false);
    router.push({
      pathname: '../home',
      params: { eventName: eventData.name },
    });
  };

  
return (
  <View
    style={{
      height: 64,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
    }}
    className="border-0 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4"
  >
    <View style={styles.searchBarContainer}>
      <TextInput
        ref={ref}
        style={styles.textInput}
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder="Search for something"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSearchSubmit}
        secureTextEntry={title === 'Passsword' && !showPassword}
      />
    </View>

    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Search Results</Text>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'events' && styles.activeTab]}
              onPress={() => setActiveTab('events')} 
            >
              <Text style={styles.tabButtonText}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'animals' && styles.activeTab]}
              onPress={() => setActiveTab('animals')} 
            >
              <Text style={styles.tabButtonText}>Animals</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {activeTab === 'events' ? (
              <View style={styles.section}>
                {results.length > 0 ? (
                  <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.touchableItem}
                        onPress={() => handleEventPress(item)}
                      >
                        <View style={styles.imageView}>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.animalImage}
                          />
                          <View style={styles.textView}>
                            <Text style={styles.sectionTitle}>{item.name}</Text>
                            <Text style={styles.sectionText}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <Text>No results found</Text>
                )}
              </View>
            ) : (
              <View style={styles.section}>
                {animalResults.length > 0 ? (
                  <FlatList
                    data={animalResults}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.touchableItem}
                        onPress={() => handleAnimalPress(item)}
                      >
                        <View style={styles.imageView}>
                          <Image
                            source={animalImages[item.image]}
                            style={styles.animalImage}
                          />
                          <View style={styles.textView}>
                            <Text style={styles.sectionTitle}>{item.name}</Text>
                            <Text numberOfLines={3} style={styles.sectionText}>
                              {item.species}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <Text>No results found</Text>
                )}
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  </View>
);
  
})

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the container to the bottom
    paddingTop: 10, // Adjust this value to control how low the input opens
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    backgroundColor: '#fff', // Add background color if needed
    padding: 10, // Add padding if needed
    borderRadius: 5, // Add border radius if needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  modalContent: {
    width: '95%',
    height: '75%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  imageView:{
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10
  },
  textView:{
    flexDirection: 'column', 
    alignItems: 'left', 
    marginVertical: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center"
  },
  animalImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 14,
    color: 'black',
    textAlign: "left",
    maxWidth: 270
  },
  closeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: "green"
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'green',
  },
  tabButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "green"
  },
});
export default SearchInput
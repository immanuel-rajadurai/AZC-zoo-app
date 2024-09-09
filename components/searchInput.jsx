import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useState, forwardRef } from 'react';
import eventsDummy from '../data/events.js';
import { icons } from '../constants';

const SearchInput = forwardRef(({ title, value, placeholder, handleChangeText, otherStyles, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [results, setResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle search submission
  const handleSearchSubmit = () => {
    const filteredResults = eventsDummy.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
    setModalVisible(true);
  };

  return (

      <View style={{
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: '#fff', 
      }}
      
      className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary
      items-center flex-row space-x-4">
        <TextInput
            ref={ref}
            style={{
              fontSize: 16,
              color: '#000', 
              flex: 1,
            }}
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={value}
            placeholder="Search for something"
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            onSubmitEditing={handleSearchSubmit}
            secureTextEntry={title === 'Passsword' && !showPassword}
        />
        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search Results</Text>
            <ScrollView>
            {results.length > 0 ? (
              <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.imagView}>
                    <Image 
                      source={{ uri: item.image }} 
                      style={styles.animalImage} 
                    />
                    <View style={styles.textView}> 
                      <Text style={styles.sectionTitle}>{item.name}</Text>
                      <Text numberOfLines={3} style={styles.sectionText}>{item.description}</Text>
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text>No results found</Text>
            )}
            </ScrollView>
            <TouchableOpacity  onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      </View>
  )
})

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    height: '75%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  imagView:{
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10
  },
  textView:{
    flexDirection: 'column', 
    alignItems: 'left', 
    marginVertical: 10
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center"
  },
  animalImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 12,
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
});
export default SearchInput
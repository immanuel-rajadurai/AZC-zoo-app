import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';

const Events = ({ events }) => {
  const [activeItem, setActiveItem] = useState(events[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(200)).current; // Start position
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAnimalPress = (event) => {
    console.log("event " + event + " has been pressed")
    setSelectedAnimal(event);
    setModalVisible(true);
  };

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY }] }}>
      <FlatList
      overScrollMode="never"
      data={events}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            console.log(`Item pressed: ${item.name}`);
            handleAnimalPress(item);
          }}
          style={styles.itemContainer}
        >
          <View >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.prompt}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            {selectedAnimal && (
              <>
                <Text style={modalStyles.topicText}>{selectedAnimal.name}</Text>
                {/* <Text style={modalStyles.subTopicText}>( {selectedAnimal.description} )</Text> */}
                <Image
                  source={selectedAnimal.image} 
                  style={modalStyles.image}
                />

                <ScrollView style={modalStyles.scrollContainer}>
                  <Text style={modalStyles.modalText}>{selectedAnimal.description}</Text>
                </ScrollView>

                <TouchableOpacity
                  style={[modalStyles.button, modalStyles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={modalStyles.textStyle}>Close </Text>
                </TouchableOpacity>

              </>
            )}
          </View>
        </View>
      </Modal>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    paddingTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  itemContainer: {
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
    width: 250,
    marginBottom: 30,
  },
  thumbnail: {
    width: '100%',
    height: '50%',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  prompt: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});


const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  topicText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  subTopicText: {
    color: "darkgreen",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  scrollContainer: {
    maxHeight: 100, // Set a max height for the scrollable area
  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonMore: {
    
    backgroundColor: "green",
  },
});

export default Events;
import React, { useState } from 'react';
import { Animated, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import eventsDummy from '../data/events';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = new Animated.Value(200);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeEventModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <View>
      <FlatList
        overScrollMode="never"
        data={eventsDummy} // Use passed posts or dummy data
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEventModal(item)}>
            <View style={styles.itemContainer}>
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

      {selectedEvent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeEventModal}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.title}>{selectedEvent.name}</Text>
              <Image source={{ uri: selectedEvent.image }} style={modalStyles.image} />
              <Text style={modalStyles.description}>{selectedEvent.description}</Text>
              <Text style={modalStyles.details}>Time: {selectedEvent.time}</Text>
              <Text style={modalStyles.details}>Location: {selectedEvent.location}</Text>
              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={closeEventModal}
              >
                <Text style={modalStyles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    zIndex: 1,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  details: {
    fontSize: 12,
    color: "#555",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Events;
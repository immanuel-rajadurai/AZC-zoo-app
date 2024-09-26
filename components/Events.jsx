import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { images } from '../constants/'

// const Events = ({ events }) => {
//   const [activeItem, setActiveItem] = useState(events[0]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const translateY = useRef(new Animated.Value(200)).current; // Start position
//   const [selectedAnimal, setSelectedAnimal] = useState(null);

//   useEffect(() => {
//     Animated.timing(translateY, {
//       toValue: 0,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleAnimalPress = (event) => {
//     console.log("event " + event + " has been pressed")
//     setSelectedAnimal(event);
//     setModalVisible(true);
//   };

//   const viewableItemsChanged = ({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setActiveItem(viewableItems[0].key);
//     }
//   };

//   return (
//     <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY }] }}>
//       <FlatList
//       overScrollMode="never"
//       data={events}
//       horizontal
//       keyExtractor={(item) => item.$id}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           onPress={() => {
//             console.log(`Item pressed: ${item.name}`);
//             handleAnimalPress(item);
//           }}
//           style={styles.itemContainer}
//         >
//           <View >
//             <Image source={{ uri: item.image }} style={styles.thumbnail} />
//             <Text style={styles.title}>{item.name}</Text>
//             <Text style={styles.prompt}>{item.description}</Text>
//           </View>
//         </TouchableOpacity>
//       )}
//       onViewableItemsChanged={viewableItemsChanged}
//       viewabilityConfig={{
//         itemVisiblePercentThreshold: 70,
//       }}
//       contentOffset={{ x: 170 }}
//     />

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={modalStyles.centeredView}>
//           <View style={modalStyles.modalView}>
//             {selectedAnimal && (
//               <>
//                 <Text style={modalStyles.topicText}>{selectedAnimal.name}</Text>
//                 {/* <Text style={modalStyles.subTopicText}>( {selectedAnimal.description} )</Text> */}
//                 <Image
//                   source={selectedAnimal.image} 
//                   style={modalStyles.image}
//                 />

//                 <ScrollView style={modalStyles.scrollContainer}>
//                   <Text style={modalStyles.modalText}>{selectedAnimal.description}</Text>
//                 </ScrollView>

//                 <TouchableOpacity
//                   style={[modalStyles.button, modalStyles.buttonClose]}
//                   onPress={() => setModalVisible(!modalVisible)}
//                 >
//                   <Text style={modalStyles.textStyle}>Close </Text>
//                 </TouchableOpacity>

//               </>
//             )}
//           </View>
//         </View>
//       </Modal>

//     </Animated.View>
//   );
// };


const Events = () => {
  const [translateY] = useState(new Animated.Value(0));
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAnimalPress = (event) => {
    console.log("event " + event.name + " has been pressed");
    setSelectedAnimal(event);
    setModalVisible(true);

    if (event.name === 'News') {
      navigation.navigate('news');
    } else if (event.name === 'Information') {
      navigation.navigate('information');
    } else if (event.name === 'Events') {
      navigation.navigate('events');
    }
  };

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  const hardcodedEvents = [
    { id: '1', name: 'Events', description: 'Events happening at the zoo', thumbnail: images.eventsThumbnail },
    { id: '2', name: 'News', description: 'News about the zoo', thumbnail: images.newsThumbnail},
    { id: '3', name: 'Information', description: 'Information about the zoo', thumbnail: images.informationThumbnail },
  ];

  return (
    <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY }] }}>
      <FlatList
        overScrollMode="never"
        data={hardcodedEvents}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(`Item pressed: ${item.name}`);
              handleAnimalPress(item);
            }}
            style={styles.itemContainer}
          >
            {/* <Text>{item.name}</Text> */}

            <View >
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.prompt}>{item.description}</Text>
              <Image source={ item.thumbnail } style={styles.thumbnail} />
            </View>
          </TouchableOpacity>
        )}
        onViewableItemsChanged={viewableItemsChanged}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    paddingTop: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  itemContainer: {
    padding: 10,
    margin: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width: 250, // Adjust the width as needed
  },
  thumbnail: {
    width: '100%',
    height: '65%',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#107a04',
  },
  prompt: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});



export default Events;
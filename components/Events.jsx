import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const Events = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const translateY = useRef(new Animated.Value(200)).current; // Start position

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY }] }}>
      <FlatList
        overScrollMode="never"
        data={posts}
        horizontal
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.thumbnail}  />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.prompt}>{item.description}</Text>
          </View>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x:170 }}
      />
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

export default Events;
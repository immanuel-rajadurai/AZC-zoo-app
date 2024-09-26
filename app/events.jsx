import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventsPage = () => {
  return (
    <View style={styles.container}>
      <Text>Events Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventsPage;
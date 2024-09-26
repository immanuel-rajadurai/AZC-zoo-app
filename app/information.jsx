import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InformationPage = () => {
  return (
    <View style={styles.container}>
      <Text>Information Page</Text>
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

export default InformationPage;
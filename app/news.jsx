import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsPage = () => {
  return (
    <View style={styles.container}>
      <Text>News Page</Text>
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

export default NewsPage;
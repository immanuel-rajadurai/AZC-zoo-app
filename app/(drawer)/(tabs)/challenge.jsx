import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Challenge = () => {
  const navigation = useNavigation();

  const NavigateToEasyChallenge = () => {
    navigation.navigate('easychallenge'); 
  };

  const NavigateToHardChallenge = () => {
    navigation.navigate('hardchallenge'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Animal Photo Snap Challenge</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>

      <TouchableOpacity style={styles.easyButton} onPress={NavigateToEasyChallenge}>
        <ImageBackground source={require('../../../assets/thumbnails/easy_background.png')} style={styles.imageBackground}>
          <Text style={styles.buttonText}>Easy Challenge</Text>
        </ImageBackground>
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity style={styles.hardButton} onPress={NavigateToHardChallenge}>
        <ImageBackground source={require('../../../assets/thumbnails/hard_background.png')} style={styles.imageBackground}>
          <Text style={styles.buttonText}>Hard Challenge</Text>
        </ImageBackground>
      </TouchableOpacity>
      </ScrollView>
      <View style={styles.halfCircle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  easyButton: {
    width: '100%',
    height: 100,
    width: 300,
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden', 
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hardButton: {
    width: '100%',
    height: 100,
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden', 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  halfCircle: {
    position: 'absolute',
    bottom: -40,  // Ensures it overlaps other components slightly
    width: 200,  // Width of the half-circle
    height: 80,  // Height of the half-circle
    backgroundColor: '#234e35',  // Dark green color
    borderTopLeftRadius: 80,  // Creates a rounded top left corner
    borderTopRightRadius: 80,  // Creates a rounded top right corner
    zIndex: 2,  // Ensure it stays above other components
    alignItems: 'center'
  },
  bottombar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 10, // Adjust the thickness as needed
    backgroundColor: '#8BC33A',
  },
});

export default Challenge;
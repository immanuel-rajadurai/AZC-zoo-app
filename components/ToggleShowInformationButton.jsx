import { View, Text, TouchableOpacity, StyleSheet, Image  } from 'react-native'
import React from 'react'
import { icons } from '../constants'


const ToggleShowInformationButton = ({ title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={[
        styles.button,
        containerStyles,
        isLoading ? styles.loading : null
      ]}
    >
      <Image source={icons.upcareticon} />
      <Text style={styles.text}>
        {title}
      </Text>
      <Text style={styles.spacedText}></Text>
      <Text className={`text-primary font-pbold text-sm ${textStyles}`}>
      
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center', // Center horizontally
    zIndex: 1000,
  },
  button: {
    backgroundColor: '#8BC33A',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20, // Higher border-radius for arch effect
    borderBottomRightRadius: 20, // Higher border-radius for arch effect
    height: 100,
    width: '80%', // Adjust width as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    opacity: 0.5,
  },
  text: {
    color: 'black ',
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacedText: {
    color: 'black ',
    fontSize: 10,
    fontWeight: 'bold',
  },
});


export default ToggleShowInformationButton
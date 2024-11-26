import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'

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
      <Text className={`text-primary font-pbold text-lg ${textStyles}`}>
        ^ ^
      </Text>
      <Text className={`text-primary font-pbold text-lg ${textStyles}`}>
        {title}
      </Text>
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
    backgroundColor: '#8BC34A',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 30, // Higher border-radius for arch effect
    borderBottomRightRadius: 30, // Higher border-radius for arch effect
    height: 100,
    width: '80%', // Adjust width as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ToggleShowInformationButton
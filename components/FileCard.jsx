import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { icons } from '../constants';
// import { deleteFile } from '../app/wallet'; // Ensure this is correctly imported

const FileCard = ({ title, thumbnail, fileUri, onDelete }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(fileUri)} // Pass the fileUri to the deleteFile function
      >
        <Image
          source={icons.deleteX} // Replace with your delete icon
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column', // Change from 'row' to 'column'
    alignItems: 'center', // Center the content horizontally
    padding: 10,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  thumbnail: {
    width: '100%', // Adjust width and height to have consistent size
    height: 120,
    marginBottom: 10, // Add some space between the thumbnail and title
    borderRadius: 10, // Make the thumbnail rounded (half of width/height for circle)
  },
  title: {
    fontSize: 16,
    textAlign: 'center', // Center the title text
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 5, // Position the delete button at the top-right corner
  },
  deleteIcon: {
    width: 24,
    height: 24, // Set the size of the delete icon
  },
});

export default FileCard;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import * as tflite from 'tflite-react-native';


export default function CameraPage() {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        // Load your .tflite model
        const model = await tflite.loadModel({
          model: '../../assets/ResNet50.tflite', 
        });
        setTfliteModel(model);
        console.log('TFLite model loaded successfully');
      } catch (error) {
        console.error('Failed to load TFLite model:', error);
      }
    }
    loadModel();
  }, []);

  const classifyImage = async (uri) => {
    if (!tfliteModel) {
      console.log('Model not loaded yet');
      return;
    }

    try {
      // Run inference on the image
      const results = await tfliteModel.runModelOnImage({
        path: uri,
        imageMean: 128,           // These values might need adjustment
        imageStd: 128,            // based on your model's requirements
        numResults: 3,
        threshold: 0.05,
      });

      // Get the top prediction
      const topPrediction = results[0];
      
      // If no labels, we just display the raw output
      Alert.alert('Classification Result', `Top prediction has ${topPrediction.confidence * 100}% confidence. Raw result: ${JSON.stringify(topPrediction)}`);
    } catch (error) {
      console.error('Classification error:', error);
      Alert.alert('Error', 'Failed to classify the image. Please try again.');
    }
  };
  
  const handleTakePhoto = async () => {
    // Request permission to access the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      await classifyImage(result.assets[0].uri);
      
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Page</Text>
      <Button title="Take a Photo" onPress={handleTakePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

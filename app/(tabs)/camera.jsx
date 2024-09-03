import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as tflite from '@tensorflow/tfjs-tflite';
import { Asset } from 'expo-asset';

export default function CameraPage() {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        await tflite.loadTFLiteModel();
        
        const modelPath = Asset.fromModule(require('../../assets/ResNet50.tflite')).uri;

        const modelExists = await FileSystem.getInfoAsync(modelPath);
        
        if (!modelExists.exists) {
          await FileSystem.downloadAsync(
            Asset.fromModule(require('../../assets/ResNet50.tflite')).uri,
            modelPath
          );
        }
        
        const tfliteModel = await tflite.loadTFLiteModel(modelPath);
        setModel(tfliteModel);
        console.log('TFLite model loaded successfully');
      } catch (error) {
        console.error("Error loading TFLite model:", error);
      }
    }
    loadModel();
  }, []);


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
      classifyImage(result.assets[0].uri);
    }
  };

  const classifyImage = async (uri) => {
    if (!model) {
      Alert.alert('Model Not Ready', 'The classification model is not loaded yet. Please try again in a moment.');
      return;
    }

    try {
      const imgB64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);

      const imageTensor = tf.tidy(() => {
        const decodedImage = decodeJpeg(raw);
        return tf.image.resizeBilinear(decodedImage, [224, 224])
          .expandDims(0)
          .toFloat()
          .div(tf.scalar(255));
      });

      const outputTensor = await model.predict(imageTensor);
      const predictions = await outputTensor.array();
      const topPrediction = Array.from(predictions[0])
        .map((p, i) => ({ probability: p, classIndex: i }))
        .sort((a, b) => b.probability - a.probability)[0];

     
      const animalNames = ['dog', 'cat', 'bird', 'fish', 'elephant',];
      const predictedAnimal = animalNames[topPrediction.classIndex] || 'Unknown animal';

      Alert.alert('Animal Recognized', `The image appears to be a ${predictedAnimal}`);
    } catch (error) {
      console.error('Error during classification:', error);
      Alert.alert('Classification Error', 'An error occurred while trying to classify the image.');
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

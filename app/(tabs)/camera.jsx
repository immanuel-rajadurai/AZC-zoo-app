import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import * as FileSystem from 'expo-file-system';
import * as cocoSsd from '@tensorflow-models/coco-ssd';



export default function CameraPage() {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        await tf.ready();  // makes sure tensorFlow is ready
        console.log('TensorFlow is ready');

        // loads coco ssd model
        const cocoModel = await cocoSsd.load();
        console.log('Coco SSD model loaded successfully');
        setModel(cocoModel);
        setIsModelLoading(false);
      } catch (error) {
        console.error('Failed to load the model:', error);
        Alert.alert('Error', `Failed to load the model: ${error.message}`);
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);



  
   
  const classifyImage = async (uri) => {
    if (isModelLoading) {
      Alert.alert('Please wait', 'Model is still loading...');
      return;
    }
  
    if (!model) {
      Alert.alert('Error', 'Model failed to load. Please restart the app.');
      return;
    }
  
    try {
      // reads image file
      const imgB64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
  
      // decodes and preprocesses the image
      let imageTensor = decodeJpeg(raw);
      imageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
      imageTensor = imageTensor.reshape([224, 224, 3]);
      imageTensor = tf.cast(imageTensor, 'int32');
  
      // runs inference 
      const predictions = await model.detect(imageTensor);
  
      
      const boxes = predictions.map(p => p.bbox);
      const scores = predictions.map(p => p.score);
  
      const selectedIndices = await tf.image.nonMaxSuppressionAsync(
        tf.tensor2d(boxes, [boxes.length, 4]),
        tf.tensor1d(scores),
        10, // max number of boxes to keep
        0.5, // IoU threshold
        0.5  // score threshold
      );
  
      
      const filteredPredictions = selectedIndices.arraySync().map(i => predictions[i]);
  
      // showthe results
      if (filteredPredictions.length === 0) {
        Alert.alert('No objects detected');
      } else {
        const topPrediction = filteredPredictions[0];
        Alert.alert('Classification Result', `Detected: ${topPrediction.class} with score: ${topPrediction.score}`);
      }
  
      // clean up tensors to free memory
      tf.dispose([imageTensor, selectedIndices]);
    } catch (error) {
      console.error('Classification error:', error);
      Alert.alert('Error', `Failed to classify the image: ${error.message}`);
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await classifyImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Page</Text>
       <Button title={isModelLoading ? "Loading Model..." : "Take a Photo"} onPress={handleTakePhoto} disabled={isModelLoading} />
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

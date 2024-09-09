import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';


const Profile = () => {

  useEffect(() => {

    const loadModel = async () => {
      // const mobilenet = require('@tensorflow-models/mobilenet');
  
      console.log(mobilenet);

      console.log("loading model...");
  
      const model = await mobilenet.load();

      console.log("model loaded: " + model);
    };
  

    loadModel();
  }, []);


  
  
  
  return (
    <View>
      <Text>Profile page</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Redirect, router, Router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../constants/';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import { ModelProvider } from './modelContext';
import CustomButtonBlack from '../components/CustomButtonBlack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';



import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

//command to start up the app
// npx expo start --tunnel
//com.jsm.app_v1
export default function App() {

  const navigation = useNavigation();

  useEffect(() => {
    // Print the current router stack
    console.log('Current Router Stack:', navigation.getState());
  }, [navigation]);

    return (
          <SafeAreaView className="h-full" backgroundColor='#234e35'>
            <ScrollView contentContainerStyle={{ height: '100%'}}>
              <View className="w-full justify-center items-center min-h-[85vh] px-4" backgroundColor='#234e35'>
                <Image
                  source={images.londonZooIcon}
                  className="max-w--[380px] w-full h-[200px] mt-[240px]"
                  resizeMode="contain"
                />

                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text> 

                {/* <View style={styles.container}>
                  <View style={styles.iconButtonContainer}>
                    <Image
                      source={icons.elephantlogo}
                      style={styles.icon}
                      resizeMode="contain"
                    />

                    <TouchableOpacity style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity> */}


                    {/* <CustomButtonBlack
                      title="Continue"
                      handlePress={() => router.push('/home')}
                      containerStyles={styles.button}
                    /> */}
                  {/* </View>
                </View> */}

                <View style={styles.container}>
                    <View style={styles.iconButtonContainer}>
                      <Image
                        source={icons.elephantlogo}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <TouchableOpacity style={styles.closeButton} onPress={() => router.push('/home')}>
                        <Text style={styles.closeButtonText}>Continue</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                <Text></Text>
                <Text></Text>
                
              </View>
            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light'/>
          </SafeAreaView>
      )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonContainer: {
    alignItems: 'center',
    marginTop: 40, 
  },
  icon: {
    width: 380,
    height: 100,
    marginBottom: -10, // Adjust this value to ensure the icon touches the button
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center'
  },
});


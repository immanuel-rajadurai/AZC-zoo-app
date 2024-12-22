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

import messaging from '@react-native-firebase/messaging';


//command to start up the app
// npx expo start --tunnel
//com.jsm.app_v1
export default function App() {

  const navigation = useNavigation();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('ENABLED Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log('retrieved FCM Token:', token);
        });
    } else {
      console.log('FCM Permission Denied', authStatus);
    }

    //check whether initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });

    //assume a message-notification contains a "type" property in the data payload of the screen to open
    // handles when notification is open from background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    //register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


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


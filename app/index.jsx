import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, Alert } from 'react-native';
import { Redirect, router, Router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants/';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';

// import { Amplify } from 'aws-amplify';
// import amplifyconfig from '../src/amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);

//command to start up the app
// npx expo start --tunnel
//com.jsm.app_v1
export default function App() {

    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }

    useEffect(() => {
      if (requestUserPermission()) {
        //return the token of the device

        messaging().getToken().then(token => {
          console.log(token);
        });
      } else {
        console.log("Failed token status", authStatus);
      }

      messaging()
        .getInitialNotification()
        .then( async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
      });

      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      //Register background handler
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });

      //Listen to messages in the foreground

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });


    }, [])

    return (
        <SafeAreaView className="bg-white h-full">
          <ScrollView contentContainerStyle={{ height: '100%'}}>
            <View className="w-full justify-center items-center min-h-[85vh] px-4">
          
               <Image
                source={images.zooIcon}
                className="max-w--[380px] w-full h-[300px]"
                resizeMode="contain"
               />

               <View className="relative mt-5">
                 <Text className="text-3xl text-green-500 font-bold text-center">
                   Welcome to the zoo
                 </Text>
               </View>

               <Text className="text-sm font-pregular text-green-600 mt-7 text-center">
                  Join the zoo on this digital app 
               </Text>

               <CustomButton
                title="Continue"
                // handlePress={() => router.push('/sign-in')}
                handlePress={() => router.push('/home')}

                containerStyles="w-full mt-6"
               />
               <Text></Text>
               <Text></Text>
            </View>
          </ScrollView>

          <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>
      )
}

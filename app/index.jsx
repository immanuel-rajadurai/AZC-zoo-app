import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react'
import { Text, View, Image, ScrollView } from 'react-native';
import { Redirect, router, Router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

import { images } from '../constants/';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

// import { Amplify } from 'aws-amplify';
// import amplifyconfig from '../src/amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);

//command to start up the app
// npx expo start --tunnel
//com.jsm.app_v1
export default function App() {


  //  const { isLoading, isLoggedIn } = useGlobalContext();

  //  if (!isLoading && isLoggedIn) return <Redirect href="/home"/>
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [lastLogTime, setLastLogTime] = useState(Date.now());

  useEffect(() => {
    let locationSubscription;

    async function setupLocationTracking() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      logLocation(currentLocation.coords);

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // 10 seconds
          distanceInterval: 0,
        },
        (newLocation) => logLocation(newLocation.coords)
      );
    }

    function logLocation(coords) {
      const currentTime = Date.now();
      if (currentTime - lastLogTime >= 10000) {
        console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
        setLastLogTime(currentTime);
      }
    }

    setupLocationTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [lastLogTime]);
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

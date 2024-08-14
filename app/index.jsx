import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { Redirect, router, Router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants/';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'; // Adjust the path as necessary
Amplify.configure(awsconfig);

//command to start up the app
// npx expo start --tunnel
//com.jsm.app_v1
export default function App() {

  //  const { isLoading, isLoggedIn } = useGlobalContext();

  //  if (!isLoading && isLoggedIn) return <Redirect href="/home"/>

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

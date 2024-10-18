import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { Redirect, router, Router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../constants/';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import { ModelProvider } from './modelContext';
import CustomButtonBlack from '../components/CustomButtonBlack';



// import { Amplify } from 'aws-amplify';
// import amplifyconfig from '../src/amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);

//command to start up the app
// npx expo start --tunnel
//com.jsm.app_v1
export default function App() {

    return (
        // <ModelProvider>
          <SafeAreaView className="h-full" backgroundColor='#234e35'>
            <ScrollView contentContainerStyle={{ height: '100%'}}>
              <View className="w-full justify-center items-center min-h-[85vh] px-4" backgroundColor='#234e35'>
            
                <Image
                  source={images.londonZooIcon}
                  className="max-w--[380px] w-full h-[200px]"
                  resizeMode="contain"
                />

                {/* <View className="relative mt-5">
                  <Text className="text-3xl text-green-500 font-bold text-center">
                    Welcome to London zoo
                  </Text>
                </View> */}

                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>

                {/* <Text className="text-sm font-pregular text-green-600 mt-7 text-center">
                    Join the zoo on this digital zoo app 
                </Text> */}

                <Image
                  source={icons.elephantlogo}
                  className="max-w--[380px] w-full h-[100px]"
                  resizeMode="contain"
                />

                <CustomButtonBlack
                  title="Continue"
                  handlePress={() => router.push('/home')}
                  containerStyles="w-full mt-6"
                />
                
                <Text></Text>
                <Text></Text>
                
              </View>
            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light'/>
          </SafeAreaView>
        // </ModelProvider>
      )
}

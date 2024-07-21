import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import GlobalProvider from '../context/GlobalProvider'
import { images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const CustomHeader = ({ navigation, route }) => {
  // Customize the header content here (e.g., add logo, buttons, etc.)
  return (
    <SafeAreaView className="items-center bg-green-700">
        <View>
            <Text className="text-2xl font-psemibold text-white mb-3 mt-3">
              Zoo  App
            </Text>
            {/* <Image
                className = "mb-1 mt-1"
                source={images.zooIcon}
                style={{ width: 70, height: 65, marginRight: 0 }}
                // resizeMode='contain'
            /> */}
        </View>
    </SafeAreaView>
  );
};

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;

  return (
    // <GlobalProvider>
      <Stack >
        <Stack.Screen name="index" options={{
            headerShown:false
        }} />
        <Stack.Screen name="(auth)" options={{
            headerShown:true
        }} />
        <Stack.Screen name="(tabs)" options={{
            // headerShown:true
            header: CustomHeader
        }} />
        {/* <Stack.Screen name="/search/[query]" options={{
            headerShown:false
        }} /> */}
      </Stack>
    // </GlobalProvider>
    )
}

export default RootLayout

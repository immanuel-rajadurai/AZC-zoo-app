import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font'
import GlobalProvider from '../context/GlobalProvider'
import { images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../constants'
import SearchInput from "../components/searchInput";

SplashScreen.preventAutoHideAsync();

const CustomHeader = ({ navigation, route }) => {
  // Customize the header content here (e.g., add logo, buttons, etc.)
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null); 
  
  const handleSearchToggle = () => {
    if (isSearchVisible) {
      setSearchQuery('');
    }
    setIsSearchVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus(); 
    }
  }, [isSearchVisible]);
  return (
    <SafeAreaView className="bg-green-700">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 15, position: 'relative'}}>
        {!isSearchVisible ? (
          <Text className="text-2xl font-psemibold text-white mb-3 mt-3 f">
          Zoo  App
        </Text>
        ) : (
          <SearchInput
            ref={searchInputRef} 
            value={searchQuery}
            handleChangeText={(text) => setSearchQuery(text)}
          />
        )}
   
          <TouchableOpacity style={{
              position: 'absolute',
              right: 50, 
            }} 
            onPress={handleSearchToggle} 
          >
          <Image
            source={isSearchVisible ? icons.close : icons.search} 
            className="w-5 h-5"
            style={{
              width: 20,
              height: 20,
              tintColor: isSearchVisible ? 'black' : 'white', 
            }}
            resizeMode="contain"
          />
            </TouchableOpacity>
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

        <Stack.Screen name="news" options={{ title: 'News' }} />
        <Stack.Screen name="information" options={{ title: 'Information' }} />
        <Stack.Screen name="events" options={{ title: 'Events' }} />

        <Stack.Screen name="easychallenge" options={{ title: 'Easy Challenge' }} />

        <Stack.Screen name="hardchallenge" options={{ title: 'Mystery Challenge (hard)' }} />

        <Stack.Screen name="schedule" options={{ title: 'Your Scheduled Animals' }} />
        
      </Stack>
    // </GlobalProvider>
    )
}

export default RootLayout

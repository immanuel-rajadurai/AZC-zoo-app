import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import GlobalProvider from '../context/GlobalProvider';
import { images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../constants';
import SearchInput from '../components/searchInput';
import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import Wallet from './wallet';
import { useNavigation } from '@react-navigation/native';
import { customGrad } from '@tensorflow/tfjs';
import DrawerNavigator from './(drawer)/_layout';



SplashScreen.preventAutoHideAsync();


const CustomHeader = ({ route }) => {
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

  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#234e35' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 1, paddingHorizontal: 15, position: 'relative'}}>
        {!isSearchVisible ? (
          <>
            <TouchableOpacity
              style={{ position: 'absolute', left: 50 }}
              onPress={toggleDrawer}
            >
              <Image
                source={icons.sidetabgreen}
                style={{ width: 40, height: 35, tintColor: "#7BC144" }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* <Text className="text-2xl font-psemibold text-white mb-3 mt-3">Zoo App</Text> */}
            <Image
                source={icons.londonzooheader}
                style={{ width: 160, height: 50, tintColor: "#7BC144" }}
                resizeMode="contain"
              />
          </>
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
            source={isSearchVisible ? icons.close : icons.searchgreen} 
            className="w-5 h-5"
            style={{
              width: 20,
              height: 20,
              tintColor: isSearchVisible ? 'black' : '#7BC144', 
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
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    // <GlobalProvider>
    <>
      <Stack>
        <Stack.Screen name="index" options={{
            headerShown:false
        }} />

        {/* <Stack.Screen name="easychallenge" options={{ title: 'Easy Challenge' }} /> */}

        <Stack.Screen
            name="easychallenge"
            // component={EasyChallengeScreen}
            options={{
              title: 'Easy Animal Scavenger Hunt',
              headerStyle: {
                backgroundColor: '#5a8c66', // Custom background color for this screen
              },
              headerTintColor: '#fff', // Custom color of the back arrow and title for this screen
              headerTitleStyle: {
                fontWeight: 'bold', // Custom title style for this screen
              },
            }}
          />

        <Stack.Screen name="hardchallenge" options={{ title: 'Mystery Challenge (hard)' }} />

        <Stack.Screen name="schedule" options={{
              title: 'Your zoo plan',
              headerStyle: {
                backgroundColor: '#5a8c66', // Custom background color for this screen
              },
              headerTintColor: '#fff', // Custom color of the back arrow and title for this screen
              headerTitleStyle: {
                fontWeight: 'bold', // Custom title style for this screen
              },
            }} 
        />
        

      <Stack.Screen
        name="(drawer)"
        options={{header: CustomHeader }}
      />

      <Stack.Screen name="wallet" options={{ title: 'Wallet', headerStyle: { backgroundColor: '#234e35' } }} />

      <Stack.Screen name="news" options={{ title: 'News' }} />
      <Stack.Screen name="information" options={{ title: 'Information' }} />
      <Stack.Screen name="events" options={{ title: 'Events' }} />
    </Stack>
    </>
  );
};

export default RootLayout;

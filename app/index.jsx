import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../constants/';
import CustomButtonBlack from '../components/CustomButtonBlack';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

// Function to determine if the device is a tablet
const UnsupportedDeviceScreen = () => {
  return (
    <SafeAreaView className="h-full" backgroundColor='#234e35'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.modalContainer}>
          <Text style={styles.closeButtonText}>
            This app is designed for iPhone only. Please use an iPhone to continue.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function App() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading (e.g., fetching data)
        await new Promise(resolve => setTimeout(resolve, 5000)); 
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync(); // Hide splash screen when ready
      }
    }

    prepare();
  }, []);


  useEffect(() => {
    if (Platform.OS === "ios") {
      if (Platform.isPad) {
        setShowModal(true);
      }
    }
  }, []);

  return (
    <>
      {/* Non-closable Modal for unsupported devices */}
      <Modal visible={showModal} transparent={false} animationType="none" onRequestClose={() => {}}>
        <UnsupportedDeviceScreen />
      </Modal>

      {!showModal && (
        <SafeAreaView className="h-full" backgroundColor='#234e35'>
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="w-full justify-center items-center min-h-[85vh] px-4" backgroundColor='#234e35'>
              <Image
                source={images.londonZooIcon}
                className="max-w-[380px] w-full h-[200px] mt-[240px]"
                resizeMode="contain"
              />

              <View style={styles.container}>
                <View style={styles.iconButtonContainer}>
                  <Image source={icons.elephantlogo} style={styles.icon} resizeMode="contain" />
                  <TouchableOpacity style={styles.closeButton} onPress={() => router.push('/sign-up')}>
                    <Text style={styles.closeButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>
      )}
    </>
  );
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
    marginBottom: -10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

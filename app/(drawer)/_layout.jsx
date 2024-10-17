import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem  } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useNavigation } from 'expo-router';


//const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {

    const navigation = useNavigation();


    return(
      <DrawerContentScrollView {...props} screenOptions={{headerShown: false}} >
          <DrawerItem
          label={"Wallet"}
          onPress={() => {
              // router.push('wallet');
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />

      </DrawerContentScrollView>
    )
}

const DrawerNavigator = () => {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions = {{headerShown:false}} >

    </Drawer>
    
  

  );
}

export default DrawerNavigator;
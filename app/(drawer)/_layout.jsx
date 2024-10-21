import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem  } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useNavigation } from 'expo-router';
import { icons, images } from '../../constants';

//const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {

    const navigation = useNavigation();

    return(
      <DrawerContentScrollView {...props} screenOptions={{headerShown: false}} >

          <View style={styles.header}>
            <Image source={icons.zoodrawericon} style={styles.icon} />
            <Text style={styles.topicText}>Your Visit</Text>
          </View>
          <DrawerItem
          label={"Wallet"}
          onPress={() => {
              // router.push('wallet');
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />

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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  topicText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default DrawerNavigator;
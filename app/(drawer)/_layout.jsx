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
          label={() => (
            <Text style={styles.drawerLabel}>
              Tickets
            </Text>
          )}
          onPress={() => {
              navigation.navigate('tickets');
          }}
          options={{ headerShown: false }}
        />

        <DrawerItem
          label={"Membership"}
          onPress={() => {
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />

        <DrawerItem
          label={() => (
            <Text style={styles.drawerLabel}>
              Experiences
            </Text>
          )}
          onPress={() => {
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />

        <DrawerItem
          label={() => (
            <Text style={styles.drawerLabel}>
              Venue hire
            </Text>
          )}
          onPress={() => {
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />

        <DrawerItem
          label={() => (
            <Text style={styles.drawerLabel}>
              Wallet (Add and see your tickets)
            </Text>
          )}
          onPress={() => {
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />

        <View style={styles.header}>
          <Image source={icons.supporticon} style={styles.icon} />
          <Text style={styles.topicText}>Support</Text>
        </View>

        <DrawerItem
          label={() => (
            <Text style={styles.drawerLabel}>
              FAQs
            </Text>
          )}
          onPress={() => {
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />

        <DrawerItem
          label={() => (
            <Text style={styles.drawerLabel}>
              Contact us
            </Text>
          )}
          onPress={() => {
              navigation.navigate('wallet');
          }}
          options={{ headerShown: false }}
        />


        <View style={styles.header}>
          <Image source={icons.privacyicon} style={styles.icon} />
          <Text style={styles.topicText}>Privacy & Legal</Text>
        </View>

        <DrawerItem
          label={() => (
            <Text style={styles.drawerLabel}>
              Policies
            </Text>
          )}
          onPress={() => {
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
    width: 40,
    height: 40,
    marginRight: 10,
  },
  topicText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
  },
  drawerLabel: {
    flexWrap: 'wrap', 
    color: 'grey',
    fontWeight: "bold",
  },
});

export default DrawerNavigator;
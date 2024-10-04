import { View, Text, Image } from 'react-native';
import { Tabs, Redirect, Stack } from 'expo-router';
import { icons, images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

//green CSS colour #187c3c

const TabIcon = ({ icon, color, name, focused, style }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMethod='contain'
        tintColor={color}
        className="w-15 h-15"
        style={[{ tintColor: color }, style]}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#2d4a29',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#187c3c',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height:84,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title:'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home1}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="places"
          options={{
            title:'Places',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.eye}
                color={color}
                name="Places"
                focused={focused}
                style={{ width: 65, height: 40}}
              />
            )
          }}
        />
        <Tabs.Screen
          name="animals"
          options={{
            title:'Animals',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.paw}
                color={color}
                name="Animals"
                focused={focused}
                className="w-52 h-72"
                style={{ width: 45, height: 40}}
              />
            )
          }}
        />
        <Tabs.Screen
          name="challenge"
          options={{
            title:'Challenge',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.binoculars}
                color={color}
                name="Challenge"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
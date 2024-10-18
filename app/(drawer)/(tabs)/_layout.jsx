import { View, Text, Image } from 'react-native';
import { Tabs, Redirect, Stack } from 'expo-router';
import { icons, images } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomHeader } from '../_layout';

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
          tabBarActiveTintColor: '#619837',
          tabBarInactiveTintColor: '#7BC144',
          tabBarStyle: {
            backgroundColor: '#234e35',
            borderTopWidth: 0,
            borderTopColor: '#232533',
            height:80,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title:'Home',
            headerShown: false,
            //header: CustomHeader,
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
            //header: CustomHeader,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.showsgreen}
                color={color}
                name="Places"
                focused={focused}
                style={{ width: 35, height: 35}}
              />
            )
          }}
        />
        <Tabs.Screen
          name="animals"
          options={{
            title:'Animals',
            headerShown: false,
            //header: CustomHeader,
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
            //header: CustomHeader,
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

export default TabsLayout;
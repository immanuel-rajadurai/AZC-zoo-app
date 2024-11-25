import { View, Text, Image } from 'react-native';
import { Tabs, Redirect, Stack } from 'expo-router';
import { icons, images } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomHeader } from '../_layout';

//green CSS colour #187c3c

const TabIcon = ({ icon, color, name, focused, style, textColor }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Image
        source={icon}
        resizeMethod='contain'
        tintColor={color}
        className="w-15 h-15"
        style={[{ tintColor: color }, style]}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: textColor }}>
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
          height: 80,
          paddingBottom: 0,
          paddingTop: 20,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto',
        },
        tabBarLabelStyle: {
          flex: 1,
          flexWrap: 'nowrap',
          textAlign: 'center',
        },
      }}
      >
        <Tabs.Screen
          name="shows"
          options={{
            title:'Shows',
            headerShown: false,
            //header: CustomHeader,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.showsgreen}
                color={color}
                textColor="#619837"
                name="Shows"
                focused={focused}
                style={{ width: 35, height: 35}}
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
                icon={icons.cafe}
                // color={color}
                textColor="#619837"
                name="Food"
                focused={focused}
                style={{ width: 35, height: 35}}
              />
            )
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title:'Home',
            headerShown: false,
            //header: CustomHeader,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.mapicon}
                // color={color}
                textColor="#234e35"
                name="Home"
                focused={focused}
                style={{ width: 85, height: 100}}
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
                icon={icons.challengegreen}
                // color={color}
                textColor="#619837"
                name="Challenge"
                style={{ width: 45, height: 40}}
                focused={focused}
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
                textColor="#619837"
                name="Animals"
                focused={focused}
                className="w-52 h-72"
                style={{ width: 45, height: 40}}
              />
            )
          }}
        />
       
      </Tabs>
    </>
  )
}

export default TabsLayout;
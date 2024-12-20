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
        resizeMethod="contain"
        style={[{ tintColor: color, width: 35, height: 35 }, style]}
      />
      <Text
        numberOfLines={1} // Prevent wrapping to a new line
        style={{
          color: textColor,
          fontSize: 12,
          textAlign: 'center',
          fontWeight: focused ? 'bold' : 'normal',
           width: '100%'
        }}
      >
        {name}
      </Text>
    </View>
  );
};

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
                icon={icons.showsicon}
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
                style={{ width: 85, height: 80, marginBottom: 30}}
              />
            )
          }}
        />
        <Tabs.Screen
          name="info"
          options={{
            title:'Info',
            headerShown: false,
            //header: CustomHeader,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.infoIcon}
                color={color}
                textColor="#619837"
                name="Info"
                style={{ width: 35, height: 35}}
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
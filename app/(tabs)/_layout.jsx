import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants'; // Ensure this path is correct

const TabIcon = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center gap-2">
    <Image
      source={icon}
      resizeMethod="contain"
      tintColor={color}
      className="w-15 h-15"
    />
    <Text
      className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      style={{ color: color }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => (
  <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#2d4a29',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        backgroundColor: '#187c3c',
        borderTopWidth: 1,
        borderTopColor: '#232533',
        height: 84,
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
            icon={icons.home1}
            color={color}
            name="Home"
            focused={focused}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="notifications"
      options={{
        title: 'Notifications',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
            icon={icons.notification}
            color={color}
            name="Notifications"
            focused={focused}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="camera"
      options={{
        title: 'Camera',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
            icon={icons.eye} // Ensure the path is correct
            color={color}
            name="Camera"
            focused = {focused}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="challenge"
      options={{
        title: 'Challenge',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
            icon={icons.binoculars}
            color={color}
            name="Challenge"
            focused={focused}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <TabIcon
            icon={icons.profile1}
            color={color}
            name="Profile"
            focused={focused}
          />
        ),
      }}
    />
  </Tabs>
);

export default TabsLayout;

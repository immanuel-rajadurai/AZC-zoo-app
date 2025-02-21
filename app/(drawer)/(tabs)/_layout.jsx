import { View, Text, Image, StyleSheet } from 'react-native';
import { Tabs, Redirect, Stack } from 'expo-router';
import { icons, images } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomHeader } from '../_layout';

//green CSS colour #187c3c

const TabIcon = ({ icon, color, name, focused, style, textColor, textMarginRight }) => {
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
          width: '100%',
          marginRight: textMarginRight,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

// const TabIcon = ({ icon, textColor, name, focused, style, textStyle }) => {
//   return (
//     <View style={[styles.container, style]}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={[styles.text, { color: textColor }, textStyle]}>{name}</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    textAlign: 'center', // Center text
  },
});

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
                style={{marginLeft: 0, width: 32, height: 32}}
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
                style={{ marginBottom: 2, marginRight: 5, width: 30, height: 30}}
                textMarginRight={5} 
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
                style={{ width: 60, height: 60, marginBottom: 60}}
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
                textColor="#619837"
                name="      Animals"
                focused={focused}
                className="w-52 h-72"
                style={{marginLeft: 20, width: 32, height: 32, marginBottom: 1}}
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
                style={{ marginBottom: 2,  width: 30, height: 30}}
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
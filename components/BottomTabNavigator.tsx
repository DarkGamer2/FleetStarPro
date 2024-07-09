import * as React from 'react';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import Management from '../screens/Management';
import Catalog from '../screens/Catalog';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const MyTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor='#e91e63'
      barStyle={{backgroundColor: 'white'}}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontFamily: 'Lato-SemiBold',
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={Catalog}
        options={{
          tabBarLabel: 'Vehicle Catalog',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          ),
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Tab.Screen
        name="Management"
        component={Management}
        options={{
          tabBarLabel: 'Vehicle Management',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="truck" color={color} size={26} />
          ),
          headerShown: false, // Hide the header for this screen
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
          headerShown: false, // Hide the header for this screen
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabNav;

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import myTabNav from './BottomTabNavigator';
import Details from '../screens/Details';
import DriverDetails from '../screens/DriverDetails';
import CreateAccount from '../screens/CreateAccount';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="FleetStar Pro"
        component={myTabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Driver Details"
        component={DriverDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Create Account"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

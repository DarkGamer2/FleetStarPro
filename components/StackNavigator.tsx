import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import myTabNav from './BottomTabNavigator';
import Details from '../screens/Details';
import DriverDetails from '../screens/DriverDetails';
import CreateAccount from '../screens/CreateAccount';
import Profile from '../screens/Profile';
import AddCompany from '../screens/AddCompany';
import EditCompany from '../screens/EditCompany';
import ManageCompany from '../screens/ManageCompany';
import Catalog from '../screens/Catalog';
import AddTruckDetails from '../screens/AddTruckDetails';
import AddDriverDetails from '../screens/AddDriverDetails';
import RecruitmentDetails from '../screens/RecruitmentDetails';
type Props = {
  route: any;
  navigation: any;
};

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
        component={DriverDetails as React.FunctionComponent<Props>}
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
      <Stack.Screen
        name="Add Company"
        component={AddCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit Company"
        component={EditCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Manage Company"
        component={ManageCompany}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Catalog"
        component={Catalog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add Truck"
        component={AddTruckDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add Driver"
        component={AddDriverDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recruitment Details"
        component={RecruitmentDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './views/Login';
import RegisterScreen from './views/Register';
import NavigationBarScreen from './views/NavigationBar';
import AccountScreen from './views/Account';
import CarParksScreen from './views/CarParks';
import HistoryScreen from './views/History';
import InformationScreen from './views/Information';
import MapScreen from './views/Map';
import MetaDataScreen from './views/MetaData';
//Create a navigator of all the different views possible to access.
const Stack = createStackNavigator();
//This function incorporated all the views into the stack perviously created.
function MyStack() {
  //TODO: Remove On Production.
  console.disableYellowBox = true; 
  return (
    <Stack.Navigator initialRouteName="Login" headerMode = 'none' >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="NavigationBar" component={NavigationBarScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="CarParks" component={CarParksScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="MetaData" component={MetaDataScreen} />
    </Stack.Navigator>
  );
}
//Exports this function that includes the view that includes the stack of views.
export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './views/Login';
import RegisterScreen from './views/Register';
import NagivationBarScreen from './views/NagivationBar';
import AccountScreen from './views/Account';
import CarParksScreen from './views/CarParks';
import HistoryScreen from './views/History';
import InformationScreen from './views/Information';
import MapScreen from './views/Map';
import MetaDataScreen from './views/MetaData';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode = 'none' >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="NagivationBar" component={NagivationBarScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="CarParks" component={CarParksScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="MetaData" component={MetaDataScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
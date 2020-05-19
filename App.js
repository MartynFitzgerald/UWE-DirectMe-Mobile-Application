import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './views/Login';
import RegisterScreen from './views/Register';
import NagivationBarScreen from './views/NagivationBar';
import MetaData from './views/MetaData';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode = 'none' >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="NagivationBar" component={NagivationBarScreen} />
      <Stack.Screen name="MetaData" component={MetaData} />
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
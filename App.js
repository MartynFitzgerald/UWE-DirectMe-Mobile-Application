import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './views/Login';
import RegisterScreen from './views/Register';
import NavigationBarScreen from './views/NavigationBar';
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
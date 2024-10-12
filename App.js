import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './components/Splash';
import Home from './components/Home';
import Pulsa from './components/Pulsa';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pulsa" component={Pulsa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

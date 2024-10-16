import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './components/Splash';
import Home from './components/Home';
import Pulsa from './components/Pulsa';
import PaymentConfirmation from './components/PaymentConfirmation';
import Success from './components/Success';
import Transaksi from './components/Transaksi';
import Profile from './components/Profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pulsa" component={Pulsa} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Transaksi" component={Transaksi} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

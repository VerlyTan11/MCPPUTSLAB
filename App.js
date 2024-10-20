import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './components/Splash';
import Home from './components/Home';
import Pulsa from './components/Pulsa';
import PaymentConfirmation from './components/PaymentConfirmation';
import Success from './components/Success';
import Transaksi from './components/Transaksi';
import Profile from './components/Profile';
import DetailTransaksi from './components/DetailTransaksi';
import Listrik from './components/Listrik';
import BPJS from './components/BPJS';
import Gagal from './components/Gagal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View className="flex-1">
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Pulsa" component={Pulsa} />
          <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="Transaksi" component={Transaksi} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="DetailTransaksi" component={DetailTransaksi} />
          <Stack.Screen name="Listrik" component={Listrik} />
          <Stack.Screen name="BPJS" component={BPJS} />
          <Stack.Screen name="Gagal" component={Gagal} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Card from './Card';
import Body from './Body';
import Menu from './Menu';

const Home = () => {
  return (
    <View className="flex-1 bg-gray-100">
      <Header />
      <Card />
      <Body />
      <Menu />
    </View>
  );
};

export default Home;

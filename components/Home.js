import React, { useContext } from 'react';
import { View } from 'react-native';
import Header from './Header';
import Card from './Card';
import Body from './Body';
import Menu from './Menu';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext); // Mendapatkan status dark mode

  return (
    <View className={`flex-1 pt-10 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Header />
      <Card />
      <Body />
      <Menu />
    </View>
  );
};

export default Home;

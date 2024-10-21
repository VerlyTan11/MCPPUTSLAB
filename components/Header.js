import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const Header = () => {
  const { isDarkMode } = useContext(ThemeContext); // Mendapatkan status dark mode

  return (
    <View className={`flex-row items-center p-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <TouchableOpacity className="flex-row items-center">
        <Image 
          source={require('../assets/union.png')}
          className="w-12 h-12"
          resizeMode="contain"
        />
        <Text className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>All-U-Need</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

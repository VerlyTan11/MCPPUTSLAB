import React, { useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Pastikan untuk menyesuaikan path

const Splash = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext); // Ambil isDarkMode dari ThemeContext

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');  // Ganti screen setelah 1 detik
    }, 1000); // Waktu splash screen (1 detik)

    return () => clearTimeout(timer); // Bersihkan timer
  }, [navigation]);

  return (
    <View className={`flex-1 justify-center items-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Image 
        source={require('../assets/umn.png')}
        className="w-48 h-48"
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

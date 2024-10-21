import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { ThemeContext } from './ThemeContext'; // Pastikan untuk menyesuaikan path

const Menu = () => {
  const navigation = useNavigation(); // Get the navigation object
  const { isDarkMode } = useContext(ThemeContext); // Ambil isDarkMode dari ThemeContext

  return (
    <View className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'bg-black' : 'bg-white'} p-4`}>
      <View className="flex flex-row justify-around items-center">
        <TouchableOpacity 
          className="items-center"
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={require('../assets/home.png')}
            className="w-6 h-6" // Icon size
            resizeMode="contain"
          />
          <Text className={`mt-2 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => navigation.navigate('Transaksi')} // Navigate to Transaksi
        >
          <Image
            source={require('../assets/file.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className={`mt-2 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>File</Text>
        </TouchableOpacity>

        <View className="items-center">
          <Image
            source={require('../assets/qris.png')}
            className="w-16 h-16"
            resizeMode="contain"
          />
        </View>

        <View className="items-center">
          <Image
            source={require('../assets/email.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className={`mt-2 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Email</Text>
        </View>

        <TouchableOpacity 
          className="items-center" 
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={require('../assets/user.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
          <Text className={`mt-2 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

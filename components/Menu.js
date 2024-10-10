import React from 'react';
import { View, Text, Image } from 'react-native';

const Menu = () => {
  return (
    <View className="flex flex-row justify-around items-center bg-white">
      <View className="items-center">
        <Image
          source={require('../assets/home.png')}
          className="w-6 h-6" // Ukuran untuk icon
          resizeMode="contain"
        />
        <Text className="mt-2 text-center">Home</Text>
      </View>
      <View className="items-center">
        <Image
          source={require('../assets/file.png')}
          className="w-6 h-6"
          resizeMode="contain"
        />
        <Text className="mt-2 text-center">File</Text>
      </View>
      <View className="items-center">
        <Image
          source={require('../assets/qris.png')}
          className="w-16 h-16" // Gambar lebih besar untuk qris
          resizeMode="contain"
        />
      </View>
      <View className="items-center">
        <Image
          source={require('../assets/email.png')}
          className="w-6 h-6"
          resizeMode="contain"
        />
        <Text className="mt-2 text-center">Email</Text>
      </View>
      <View className="items-center">
        <Image
          source={require('../assets/user.png')}
          className="w-6 h-6"
          resizeMode="contain"
        />
        <Text className="mt-2 text-center">User</Text>
      </View>
    </View>
  );
};

export default Menu;

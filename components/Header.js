import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

const Header = () => {
  return (
    <View className="flex-row items-center p-4">
        <TouchableOpacity className="flex-row items-center">
            <Image 
                source={require('../assets/union.png')}
                className="w-12 h-12"
                resizeMode="contain"
            />
            <Text className="text-lg">All-U-Need</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Header;

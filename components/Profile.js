import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Profile = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <View className="flex-1 bg-white p-4 pt-12">
        <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
                source={require('../assets/left.png')} 
                className="w-6 h-6" 
                resizeMode="contain" 
            />
            </TouchableOpacity>
            <Text className="text-lg font-bold ml-4">Profile</Text>
        </View>
    </View>
  );
};

export default Profile;

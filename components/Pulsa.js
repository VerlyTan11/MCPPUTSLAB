import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pulsa = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white p-4">
        {/* Header Section */}
        <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image 
                source={require('../assets/left.png')} 
                className="w-6 h-6" 
                resizeMode="contain" 
            />
            </TouchableOpacity>
            <Text className="text-lg font-bold ml-4">Pulsa & Paket Data</Text>
        </View>

        {/* Input Field Section */}
        <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
            <TextInput 
            placeholder="Masukkan nomor telepon" 
            className="flex-1 text-base p-2" 
            keyboardType="numeric"
            />
            <Image 
            source={require('../assets/contact-book.png')} 
            className="w-6 h-6 ml-2" 
            resizeMode="contain" 
            />
        </View>

        {/* Menu Section */}
        <View className="mt-8 flex-row justify-center space-x-4 bg-default-blue">
            <TouchableOpacity className="flex-1 max-w-[45%] bg-blue-500 rounded-lg p-4 items-center">
                <Text className="text-white text-lg">Isi Pulsa</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 max-w-[50%] bg-blue-500 rounded-lg p-4 items-center">
                <Text className="text-white text-lg">Isi Data</Text>
            </TouchableOpacity>
        </View>

        {/* Information */}
        <View className="bg-white flex-1 mt-8">
            <View className="flex-row bg-grey rounded-md p-4">
                <Image source={require('../assets/contact-form.png')}/>
                <Text className="px-2 text-center">Isi ID Pelanggan yang valid untuk menampilkan menu pembelian.</Text>
            </View>
        </View>

    </View>
  );
};

export default Pulsa;

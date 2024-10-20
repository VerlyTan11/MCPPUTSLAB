import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Menu from './Menu'; // Import Menu
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Profile = () => {
  const navigation = useNavigation();
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [newPin, setNewPin] = useState('');
  
  // Function to handle PIN change and save it to AsyncStorage
  const handlePinChange = async () => {
    if (newPin === '110625') {
      Alert.alert('Error', 'PIN ini tidak diperbolehkan. Silakan pilih PIN lain.');
    } else if (newPin.length === 6) {
      try {
        await AsyncStorage.setItem('userPin', newPin); // Save the new PIN
        setNewPin(''); // Reset input
        setPinModalVisible(false); // Close modal
        Alert.alert('Success', 'PIN berhasil diatur.');
      } catch (error) {
        Alert.alert('Error', 'Gagal menyimpan PIN.');
      }
    } else {
      Alert.alert('Error', 'PIN harus 6 digit.');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 pt-12">
        {/* Header Section */}
        <View className="flex-row items-center mb-4">
          <Text className="text-lg font-bold ml-4">Profile</Text>
        </View>

        {/* Profile Information */}
        <View className="justify-center mt-8 items-center flex-col">
          <Image 
            source={require('../assets/profiledummy.png')} 
            className="w-44 h-44 rounded-full" 
          />
          <View className="mt-4 items-center">
            <Text className="text-lg font-semibold">Beverly Vladislav Tan</Text>
            <Text className="text-lg font-semibold">00000074964</Text>
            <Text className="text-sm font-semibold">(11 Juni 2005)</Text>
          </View>
        </View>

        {/* Set PIN Button */}
        <View className="mt-8 items-center">
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-md"
            onPress={() => setPinModalVisible(true)}
          >
            <Text className="font-bold">Atur PIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PIN Setup Modal */}
      <Modal visible={isPinModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-md items-center w-72">
            <Text className="text-lg font-bold mb-4 text-black">Atur PIN Baru</Text>

            <TextInput
              className="border border-gray-300 rounded-md p-2 text-center w-40 mb-4"
              keyboardType="numeric"
              maxLength={6}
              secureTextEntry
              value={newPin}
              onChangeText={setNewPin}
              placeholder="Masukkan 6 Digit PIN"
            />

            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-md mb-2"
              onPress={handlePinChange}
            >
              <Text className="font-bold">Simpan PIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPinModalVisible(false)}>
              <Text className="text-red-500">Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Menu />
    </View>
  );
};

export default Profile;

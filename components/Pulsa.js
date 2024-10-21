import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Pastikan untuk menyesuaikan path

const Pulsa = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeOption, setActiveOption] = useState('');
  const { isDarkMode } = useContext(ThemeContext); // Access Theme Context


  const validatePhoneNumber = () => {
    const regex = /^08[1-9][0-9]{8,11}$/; // Validasi nomor telepon diawali 08, minimal 10 digit, maksimal 13 digit
    const validOperators = ['081', '082', '083', '085', '087', '089']; // Prefix operator resmi
    const prefix = phoneNumber.slice(0, 3);
    return regex.test(phoneNumber) && validOperators.includes(prefix);
  };

  const handleOptionPress = (option) => {
    if (!validatePhoneNumber()) {
      setErrorMessage('Nomor telepon tidak valid. Harus dimulai dengan 08 dan prefix operator resmi.');
      setActiveOption('');
    } else {
      setErrorMessage('');
      setActiveOption(option);
    }
  };

  const goToPaymentConfirmation = (label, price) => {
    navigation.navigate('PaymentConfirmation', {
      label,
      price,
      phoneNumber,
    });
  };

  return (
    <View className={`flex-1 p-4 pt-12 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <View className={`flex-row items-center mb-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/left.png')} 
            className="w-6 h-6" 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text className={`text-lg font-bold ml-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Pulsa & Paket Data</Text>
      </View>

      <View className={`flex-row items-center border border-grey rounded-lg p-2 mb-4 ${isDarkMode ? 'bg-grey' : 'bg-white'}`}>
        <TextInput
          placeholder="Masukkan nomor telepon"
          className={`flex-1 text-base p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Image 
          source={require('../assets/contact-book.png')} 
          className="w-6 h-6 ml-2" 
          resizeMode="contain" 
        />
      </View>

      <View className="mt-4 flex-row justify-center space-x-4 bg-default-blue">
        <TouchableOpacity
          className={`flex-1 max-w-[45%] rounded-lg p-4 items-center ${
            activeOption === 'pulsa' ? 'bg-grey' : 'bg-default-blue'
          }`}
          onPress={() => handleOptionPress('pulsa')}
        >
          <Text className="text-white text-lg">Isi Pulsa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 max-w-[45%] rounded-lg p-4 items-center ${
            activeOption === 'data' ? 'bg-grey' : 'bg-default-blue'
          }`}
          onPress={() => handleOptionPress('data')}
        >
          <Text className="text-white text-lg">Isi Data</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-8">
        <View className={`flex-row rounded-md p-4 items-center ${isDarkMode ? 'bg-gray-800' : 'bg-grey'}`}>
          <Image 
            source={require('../assets/contact-form.png')} 
            className="w-6 h-6 mr-2" 
            resizeMode="contain" 
          />
          <Text className={`flex-1 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {errorMessage || 'Isi nomor telepon yang valid untuk menampilkan menu pembelian.'}
          </Text>
        </View>

        {activeOption === 'pulsa' && (
          <View className="mt-8">
            <View className="flex-row justify-around bg-gray-100 p-4 rounded-lg">
              <OptionItem label="5.000" price="Rp. 6.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="10.000" price="Rp. 10.500" onPress={goToPaymentConfirmation} />
            </View>
            <View className="flex-row justify-around bg-gray-100 p-4 rounded-lg">
              <OptionItem label="15.000" price="Rp. 16.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="20.000" price="Rp. 21.500" onPress={goToPaymentConfirmation} />
            </View>
          </View>
        )}

        {activeOption === 'data' && (
          <View className="mt-8">
            <View className="flex-row justify-around bg-gray-100 p-4 rounded-lg">
              <OptionItem label="1GB" price="Rp. 12.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="2.5GB" price="Rp. 25.000" onPress={goToPaymentConfirmation} />
            </View>
            <View className="flex-row justify-around bg-gray-100 p-4 rounded-lg">
              <OptionItem label="5GB" price="Rp. 45.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="7GB" price="Rp. 60.000" onPress={goToPaymentConfirmation} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const OptionItem = ({ label, price, onPress }) => (
  <TouchableOpacity onPress={() => onPress(label, price)} className="bg-grey rounded-sm p-4 px-10">
    <Text className="font-semibold text-lg">{label}</Text>
    <Text className="mt-4">Harga</Text>
    <Text className="font-semibold">{price}</Text>
  </TouchableOpacity>
);

export default Pulsa;

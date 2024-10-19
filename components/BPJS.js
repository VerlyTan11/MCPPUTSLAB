import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BPJS = () => {
  const navigation = useNavigation();
  const [bpjsNumber, setBpjsNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeOption, setActiveOption] = useState('');

  const validateBpjsNumber = () => /^[0-9]{11}$/.test(bpjsNumber);

  const handleOptionPress = (option) => {
    if (!validateBpjsNumber()) {
      setErrorMessage('Nomor BPJS tidak valid. Pastikan 11 digit.');
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
      bpjsNumber,
    });
  };

  return (
    <View className="flex-1 bg-white p-4 pt-12">
      {/* Header Section */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/left.png')} 
            className="w-6 h-6" 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4">Pembayaran BPJS</Text>
      </View>

      {/* Input Field Section */}
      <View className="flex-row items-center border border-gray-300 rounded-lg p-2 mb-4">
        <TextInput
          placeholder="Masukkan nomor BPJS"
          className="flex-1 text-base p-2"
          keyboardType="numeric"
          value={bpjsNumber}
          onChangeText={(text) => setBpjsNumber(text)}
        />
        <Image 
          source={require('../assets/contact-book.png')} 
          className="w-6 h-6 ml-2" 
          resizeMode="contain" 
        />
      </View>

      {/* Menu Section */}
      <View className="mt-4 flex-row justify-center space-x-4 bg-default-blue">
        <TouchableOpacity
          className={`flex-1 max-w-[45%] rounded-lg p-4 items-center ${
            activeOption === 'kelas1' ? 'bg-grey' : 'bg-default-blue'
          }`}
          onPress={() => handleOptionPress('kelas1')}
        >
          <Text className="text-white text-lg">Kelas 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 max-w-[45%] rounded-lg p-4 items-center ${
            activeOption === 'kelas2' ? 'bg-grey' : 'bg-default-blue'
          }`}
          onPress={() => handleOptionPress('kelas2')}
        >
          <Text className="text-white text-lg">Kelas 2</Text>
        </TouchableOpacity>


        <TouchableOpacity
          className={`flex-1 max-w-[45%] rounded-lg p-4 items-center ${
            activeOption === 'kelas3' ? 'bg-grey' : 'bg-default-blue'
          }`}
          onPress={() => handleOptionPress('kelas3')}
        >
          <Text className="text-white text-lg">Kelas 3</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-8">
        <View className="flex-row bg-grey rounded-md p-4 items-center">
          <Image 
            source={require('../assets/contact-form.png')} 
            className="w-6 h-6 mr-2" 
            resizeMode="contain" 
          />
          <Text className="flex-1 text-center">
            {errorMessage || 'Isi nomor BPJS yang valid untuk menampilkan menu pembayaran.'}
          </Text>
        </View>

        {activeOption && (
          <View className="mt-8">
            <View className="flex-row justify-around bg-grey p-4 rounded-lg">
              <OptionItem label="Kelas 1" price="Rp. 150.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="Kelas 2" price="Rp. 100.000" onPress={goToPaymentConfirmation} />
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

export default BPJS;

import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BPJS = () => {
  const navigation = useNavigation();
  const [bpjsNumber, setBpjsNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateBpjsNumber = () => /^0[0-9]{12}$/.test(bpjsNumber); // Nomor BPJS diawali nol dan tepat 13 digit

  const handleOptionPress = (kelas, months) => {
    const price = months * 50000;
    if (!validateBpjsNumber()) {
      setErrorMessage('Nomor BPJS tidak valid. Harus dimulai dengan 0 dan 13 digit.');
    } else {
      setErrorMessage('');
      goToPaymentConfirmation(kelas, `Rp. ${price.toLocaleString()}`);
    }
  };

  const goToPaymentConfirmation = (label, price) => {
    navigation.navigate('PaymentConfirmation', {
      label,
      price,
      bpjsNumber, // Mengirim nomor BPJS untuk preview
      paymentType: 'BPJS' // Mengirim jenis pembayaran
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
          className="flex-1 max-w-[45%] rounded-lg p-4 items-center bg-default-blue"
          onPress={() => handleOptionPress('Kelas 1', 6)} // Kelas 1 untuk 6 bulan
        >
          <Text className="text-white text-lg">Kelas 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 max-w-[45%] rounded-lg p-4 items-center bg-default-blue"
          onPress={() => handleOptionPress('Kelas 2', 4)} // Kelas 2 untuk 4 bulan
        >
          <Text className="text-white text-lg">Kelas 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 max-w-[45%] rounded-lg p-4 items-center bg-default-blue"
          onPress={() => handleOptionPress('Kelas 3', 2)} // Kelas 3 untuk 2 bulan
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
            {errorMessage || 'Isi nomor BPJS yang valid untuk memilih kelas pembayaran.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BPJS;

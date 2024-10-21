import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const Listrik = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext); // Mendapatkan status dark mode
  const [customerId, setCustomerId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeOption, setActiveOption] = useState('');

  const validateCustomerId = () => /^[1-9][0-9]{5,11}$/.test(customerId); // ID Pelanggan PLN diawali angka selain nol dan maksimal 12 digit

  const handleOptionPress = (option) => {
    if (!validateCustomerId()) {
      setErrorMessage('ID pelanggan tidak valid.');
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
      customerId, // Mengirim ID pelanggan untuk preview
      paymentType: 'Listrik' // Mengirim jenis pembayaran
    });
  };

  return (
    <View className={`flex-1 p-4 pt-12 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Header Section */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/left.png')} 
            className="w-6 h-6" 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text className={`text-lg font-bold ml-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Isi Listrik</Text>
      </View>

      {/* Input Field Section */}
      <View className={`flex-row items-center border border-grey rounded-lg p-2 mb-4 ${isDarkMode ? 'bg-grey' : 'bg-white'}`}>
        <TextInput
          placeholder="Masukkan ID Pelanggan"
          className="flex-1 text-base p-2"
          keyboardType="numeric"
          value={customerId}
          onChangeText={(text) => setCustomerId(text)}
        />
        <Image 
          source={require('../assets/contact-book.png')} 
          className="w-6 h-6 ml-2" 
          resizeMode="contain" 
        />
      </View>

      {/* Menu Section */}
      <View className= "mt-4 flex-row justify-center space-x-4 bg-default-blue">
        <TouchableOpacity
          className="flex-1 max-w-[45%] rounded-lg p-4 items-center bg-default-blue"
          onPress={() => handleOptionPress('listrik')}
        >
          <Text className="text-white text-lg">Isi Listrik</Text>
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
            {errorMessage || 'Isi ID Pelanggan yang valid untuk menampilkan menu pembelian.'}
          </Text>
        </View>

        {activeOption === 'listrik' && (
          <View className="mt-8">
            <View className={`flex-row justify-around bg-gray-100 p-4 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
              <OptionItem label="20.000" price="Rp. 20.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="50.000" price="Rp. 50.000" onPress={goToPaymentConfirmation} />
            </View>
            <View className={`flex-row justify-around bg-gray-100 p-4 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
              <OptionItem label="100.000" price="Rp. 100.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="200.000" price="Rp. 200.000" onPress={goToPaymentConfirmation} />
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

export default Listrik;

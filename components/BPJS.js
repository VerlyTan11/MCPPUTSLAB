import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const BPJS = () => {
  const navigation = useNavigation();
  const [bpjsNumber, setBpjsNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedClass, setSelectedClass] = useState(null); // Untuk menyimpan kelas yang dipilih
  const [months, setMonths] = useState(null); // Menyimpan jumlah bulan yang dipilih
  const { isDarkMode } = useContext(ThemeContext); // Mengakses status dark mode

  // Daftar harga per bulan per kelas
  const classPrices = {
    'Kelas 1': 80000, // Harga per bulan untuk Kelas 1
    'Kelas 2': 60000, // Harga per bulan untuk Kelas 2
    'Kelas 3': 40000, // Harga per bulan untuk Kelas 3
  };

  const validateBpjsNumber = () => /^0[0-9]{12}$/.test(bpjsNumber); // Nomor BPJS diawali nol dan tepat 13 digit

  const handleClassSelection = (kelas) => {
    if (!validateBpjsNumber()) {
      setErrorMessage('Nomor BPJS tidak valid. Harus dimulai dengan 0 dan 13 digit.');
    } else {
      setErrorMessage('');
      setSelectedClass(kelas); // Set kelas yang dipilih
      setMonths(null); // Reset jumlah bulan saat memilih kelas baru
    }
  };

  const handleMonthSelection = (months) => {
    if (selectedClass) {
      const pricePerMonth = classPrices[selectedClass];
      const totalPrice = pricePerMonth * months;
      goToPaymentConfirmation(selectedClass, months, totalPrice);
    } else {
      Alert.alert('Error', 'Silakan pilih kelas terlebih dahulu.');
    }
  };

  const goToPaymentConfirmation = (kelas, months, totalPrice) => {
    navigation.navigate('PaymentConfirmation', {
      label: `${kelas} - ${months} Bulan`,
      price: `Rp. ${totalPrice.toLocaleString()}`, // Format harga dengan ribuan
      bpjsNumber, // Mengirim nomor BPJS untuk preview
      paymentType: 'BPJS' // Mengirim jenis pembayaran
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
        <Text className={`text-lg font-bold ml-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Pembayaran BPJS</Text>
      </View>

      {/* Input Field Section */}
      <View className={`flex-row items-center border border-grey rounded-lg p-2 mb-4 ${isDarkMode ? 'bg-grey' : 'bg-white'}`}>
        <TextInput
          placeholder="Masukkan nomor BPJS"
          className={`flex-1 text-base p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
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

      {/* Kelas Selection Section */}
      <View className="mt-4 flex-row justify-center space-x-4">
        <TouchableOpacity
          className={`flex-1 max-w-[30%] rounded-lg p-4 items-center ${selectedClass === 'Kelas 1' ? 'bg-grey' : 'bg-default-blue'}`}
          onPress={() => handleClassSelection('Kelas 1')}
        >
          <Text className="text-white text-lg">Kelas 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 max-w-[30%] rounded-lg p-4 items-center ${selectedClass === 'Kelas 2' ? 'bg-grey' : 'bg-default-blue'}`}
          onPress={() => handleClassSelection('Kelas 2')}
        >
          <Text className="text-white text-lg">Kelas 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 max-w-[30%] rounded-lg p-4 items-center ${selectedClass === 'Kelas 3' ? 'bg-grey' : 'bg-default-blue'}`}
          onPress={() => handleClassSelection('Kelas 3')}
        >
          <Text className="text-white text-lg">Kelas 3</Text>
        </TouchableOpacity>
      </View>

      {/* Month Selection Section */}
      {selectedClass && (
        <View className="mt-4">
          <Text className={`text-lg font-bold text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Pilih Jumlah Bulan</Text>

          <View className="flex-row justify-center space-x-4 mt-4">
            <TouchableOpacity
              className={`flex-1 max-w-[30%] rounded-lg p-4 items-center ${months === 1 ? 'bg-grey' : 'bg-default-blue'}`}
              onPress={() => setMonths(1)} // Untuk 1 bulan
            >
              <Text className="text-white text-lg">1 Bulan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 max-w-[30%] rounded-lg p-4 items-center ${months === 3 ? 'bg-grey' : 'bg-default-blue'}`}
              onPress={() => setMonths(3)} // Untuk 3 bulan
            >
              <Text className="text-white text-lg">3 Bulan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 max-w-[30%] rounded-lg p-4 items-center ${months === 6 ? 'bg-grey' : 'bg-default-blue'}`}
              onPress={() => setMonths(6)} // Untuk 6 bulan
            >
              <Text className="text-white text-lg">6 Bulan</Text>
            </TouchableOpacity>
          </View>

          {months && (
            <TouchableOpacity
              className="mt-4 bg-default-blue p-4 rounded-lg items-center"
              onPress={() => handleMonthSelection(months)}
            >
              <Text className="text-white font-bold">Lanjutkan Pembayaran</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Error Message Section */}
      <View className="flex-1 mt-8">
        <View className={`flex-row rounded-md p-4 items-center ${isDarkMode ? 'bg-gray-800' : 'bg-grey'}`}>
          <Image 
            source={require('../assets/contact-form.png')} 
            className="w-6 h-6 mr-2" 
            resizeMode="contain" 
          />
          <Text className={`flex-1 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {errorMessage || 'Isi nomor BPJS yang valid dan pilih kelas serta jumlah bulan.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BPJS;

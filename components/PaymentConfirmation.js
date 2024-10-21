import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PinInputModal from './PinInputModal'; // Import the modal
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const PaymentConfirmation = ({ route, navigation }) => {
  const { label, price, phoneNumber, customerId, bpjsNumber } = route.params;
  const [isPinModalVisible, setPinModalVisible] = useState(false); // Perbaikan: Menggunakan isPinModalVisible
  const [operatorImage, setOperatorImage] = useState();
  const [savedPin, setSavedPin] = useState(''); // State to store the saved PIN

  // Only apply this effect if it's Pulsa order
  useEffect(() => {
    if (phoneNumber) {
      const prefix = phoneNumber.substring(0, 4); // Get the first 4 digits
      const operatorImages = {
        telkomsel: require('../assets/telkomsel.png'),
        indosat: require('../assets/indosat.png'),
        tri: require('../assets/tri.png'),
        xl: require('../assets/xl.png'),
        axis: require('../assets/axis.png'),
        smartfren: require('../assets/smartfren.png'),
      };

      if (['0811', '0812', '0813', '0821', '0822', '0852', '0853'].includes(prefix)) {
        setOperatorImage(operatorImages.telkomsel);
      } else if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) {
        setOperatorImage(operatorImages.indosat);
      } else if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) {
        setOperatorImage(operatorImages.tri);
      } else if (['0817', '0818', '0819', '0859', '0877', '0878'].includes(prefix)) {
        setOperatorImage(operatorImages.xl);
      } else if (['0838', '0831', '0832', '0833'].includes(prefix)) {
        setOperatorImage(operatorImages.axis);
      } else if (['0881', '0882', '0883', '0884', '0885', '0886', '0887'].includes(prefix)) {
        setOperatorImage(operatorImages.smartfren);
      }
    }
  }, [phoneNumber]); // Re-run whenever phoneNumber changes

  // Load the saved PIN from AsyncStorage when the component mounts
  useEffect(() => {
    const loadPin = async () => {
      try {
        const pin = await AsyncStorage.getItem('userPin'); // Get PIN from AsyncStorage
        if (pin) {
          setSavedPin(pin); // Store the retrieved PIN in the state
        }
      } catch (error) {
        console.log('Failed to load PIN', error);
      }
    };

    loadPin();
  }, []);

  const handleConfirmation = () => {
    setPinModalVisible(true); // Open the PIN modal
  };

  const handleSuccess = async () => {
    setPinModalVisible(false); // Close the modal

    const transaction = {
      id: Date.now().toString(), // Unique transaction ID
      trace: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'), // Random trace number
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price,
    };

    // Save the transaction to AsyncStorage
    try {
      const savedTransactions = await AsyncStorage.getItem('transactions');
      const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
      transactions.push(transaction);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      
      navigation.navigate('Success', { price, phoneNumber, customerId, bpjsNumber }); // Navigate to Success
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4 pt-12 items-center">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/left.png')}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4">Konfirmasi Pembayaran</Text>
      </View>

      {/* Display operator image and phone number for Pulsa */}
      {phoneNumber && (
        <View className="bg-grey rounded-md p-4 flex-row">
          <Image source={operatorImage} className="w-10 h-14" />
          <View className="px-4">
            <Text className="font-bold text-lg">{phoneNumber}</Text>
            <Text className="text-base mb-2">{phoneNumber}</Text>
          </View>
          <Text className="text-base ml-10 mt-3 font-semibold">{price}</Text>
        </View>
      )}

      {/* Display customer ID for Listrik */}
      {customerId && (
        <View className="bg-grey rounded-md p-4 flex-row items-center">
          <View className="flex-col flex-1">
            <Text className="font-bold text-lg mt-3">ID Pelanggan Listrik:</Text>
            <Text className="text-base mt-3">{customerId}</Text>
          </View>
          <Text className="text-base mt-3 font-semibold">{price}</Text>
        </View>
      )}

      {/* Display BPJS number for BPJS */}
      {bpjsNumber && (
        <View className="bg-grey rounded-md p-4 flex-row items-center">
          <View className="flex-col flex-1">
            <Text className="font-bold text-lg mt-3">Nomor BPJS:</Text>
            <Text className="text-base mt-3">{bpjsNumber}</Text>
          </View>
          <Text className="text-base mt-3 font-semibold">{price}</Text>
        </View>
      )}

      <View className="pt-8">
        <Text className="text-lg font-bold">Metode Pembayaran</Text>
        <View className="flex-row mt-3 items-center">
          <Image source={require('../assets/wallet.png')} />
          <View className="flex-col mx-3">
            <Text>Saldo Saya</Text>
            <Text className="text-sm">Rp. 900.000</Text>
          </View>
          <Text className="text-base ml-28 font-semibold">{price}</Text>
        </View>
      </View>

      <View className="pt-8">
        <Text className="text-lg font-bold">Detail Pembayaran</Text>
        <View className="flex-row mt-3 items-center justify-between">
          <Text>Harga {label}</Text>
          <Text className="text-base">{price}</Text>
        </View>
        <View className="flex-row mt-3 items-center">
          <Text>Biaya Transaksi</Text>
          <Text className="text-base ml-40 pl-6">Rp 0</Text>
        </View>
      </View>

      <View className="flex-row pt-8">
        <Text className="font-semibold text-sm">Total Pembayaran</Text>
        <Text className="text-sm font-semibold ml-32 pl-4">{price}</Text>
      </View>

      <TouchableOpacity
        className="bg-default-blue mt-52 rounded-lg justify-center items-center"
        onPress={handleConfirmation}
      >
        <Text className="p-4 text-white">Konfirmasi</Text>
      </TouchableOpacity>

      <PinInputModal
        visible={isPinModalVisible} // <--- Memperbaiki nama state di sini
        onClose={() => setPinModalVisible(false)} // <--- Memperbaiki nama state di sini
        onSuccess={handleSuccess}
        savedPin={savedPin}
        onTransactionFail={() => navigation.navigate('Gagal')}
      />
    </View>
  );
};

export default PaymentConfirmation;

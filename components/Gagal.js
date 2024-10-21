import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const Gagal = ({ route, navigation }) => {
  const { price, trace, date, time } = route.params || {};
  const { isDarkMode } = useContext(ThemeContext); // Mendapatkan status dark mode

  useEffect(() => {
    if (price && trace && date && time) {
      const saveFailedTransaction = async () => {
        try {
          const savedTransactions = await AsyncStorage.getItem('transactions');
          const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];

          // Tambahkan transaksi gagal
          transactions.push({
            id: Date.now().toString(), // Unique transaction ID
            trace,
            date,
            time,
            price,
            status: 'failed',
          });

          await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
        } catch (error) {
          console.error('Error saving failed transaction:', error);
        }
      };

      saveFailedTransaction();
    }
  }, [price, trace, date, time]);

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'} justify-center items-center p-4`}>
      {/* Gambar sticky-notes */}
      <Image source={require('../assets/sticky-notes.png')} style={{ width: 100, height: 100 }} />
      
      <Text className={`text-lg font-bold mt-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Transaksi Gagal</Text>
      <Text className={`mt-4 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Silakan periksa kembali transaksi Anda.
      </Text>

      {/* Tombol untuk kembali ke halaman Transaksi */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Transaksi')}
        className="mt-8 bg-blue-500 rounded-lg p-2"
      >
        <Text className="text-black">Kembali ke Transaksi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Gagal;

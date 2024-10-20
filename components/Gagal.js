import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gagal = ({ route, navigation }) => {
  const { price, trace, date, time } = route.params || {}; // Tambahkan fallback ke objek kosong

  // Simpan transaksi gagal di AsyncStorage
  useEffect(() => {
    if (price && trace && date && time) { // Pastikan semua parameter ada
      const saveFailedTransaction = async () => {
        try {
          const savedTransactions = await AsyncStorage.getItem('transactions');
          const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];

          // Tambahkan transaksi gagal
          transactions.push({
            id: Date.now().toString(), // Unique transaction ID
            trace, // Menggunakan trace dari params
            date, // Menggunakan date dari params
            time, // Menggunakan time dari params
            price, // Menggunakan price dari params
            status: 'failed', // Status untuk transaksi gagal
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
    <View className="flex-1 bg-white justify-center items-center p-4">
      {/* Gambar sticky-notes */}
      <Image source={require('../assets/sticky-notes.png')} style={{ width: 100, height: 100 }} />
      
      <Text className="text-lg font-bold mt-4">Transaksi Gagal</Text>
      <Text className="mt-4 text-center">Silakan periksa kembali transaksi Anda.</Text>

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

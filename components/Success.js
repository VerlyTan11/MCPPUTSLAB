import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import { ThemeContext } from './ThemeContext'; // Pastikan untuk menyesuaikan path

const Success = ({ route, navigation }) => {
  const { price, phoneNumber } = route.params;
  const dateTime = moment().format('DD MMMM YYYY, HH:mm'); // Current date and time
  const remainingBalance = 900000 - parseInt(price.replace(/\D/g, '')); // Calculate remaining balance
  const { isDarkMode } = useContext(ThemeContext); // Ambil isDarkMode dari ThemeContext

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'} justify-center items-center p-6`}>
      <Text className={`text-2xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-black'}`}>Pembayaran Berhasil</Text>
      <Image 
        source={require('../assets/check.png')} 
        className="w-24 h-24 mb-6"
        resizeMode="contain" 
      />
      <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{price}</Text>
      <Text className={`text-base mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{dateTime}</Text>
      <Text className={`text-base mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>Sisa Saldo: Rp {remainingBalance.toLocaleString()}</Text>

      <TouchableOpacity
        className="bg-grey p-3 rounded-md"
        onPress={() => navigation.navigate('Home', { phoneNumber, price })}
      >
        <Text className={`text-black ${isDarkMode ? 'text-white' : 'text-black'}`}>Tutup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-md"
        onPress={() => {
          // Navigasi ke tab Transaksi dan pass phoneNumber ke Transaksi
          navigation.navigate('Transaksi', { phoneNumber });
        }}
      >
        <Text className={`text-black ${isDarkMode ? 'text-white' : 'text-black'}`}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

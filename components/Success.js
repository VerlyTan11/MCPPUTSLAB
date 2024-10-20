import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';

const Success = ({ route, navigation }) => {
  const { price, phoneNumber } = route.params;
  const dateTime = moment().format('DD MMMM YYYY, HH:mm'); // Current date and time
  const remainingBalance = 900000 - parseInt(price.replace(/\D/g, '')); // Calculate remaining balance

  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Text className="text-2xl font-bold mb-10">Pembayaran Berhasil</Text>
      <Image 
        source={require('../assets/check.png')} 
        className="w-24 h-24 mb-6"
        resizeMode="contain" 
      />
      <Text className="text-lg font-semibold mb-2">{price}</Text>
      <Text className="text-base mb-4">{dateTime}</Text>
      <Text className="text-base mb-8">Sisa Saldo: Rp {remainingBalance.toLocaleString()}</Text>

      <TouchableOpacity
        className="bg-grey p-3 rounded-md"
        onPress={() => navigation.navigate('Home', { phoneNumber, price })}
      >
        <Text className="text-black">Tutup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-md"
        onPress={() => {
          // Navigasi ke tab Transaksi dan pass phoneNumber ke Transaksi
          navigation.navigate('Transaksi', { phoneNumber });
        }}
      >
        <Text className="text-black">Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

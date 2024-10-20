import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailTransaksi = ({ route }) => {
  const { transaction, approvalCode, phoneNumber } = route.params || {}; // Memastikan parameter diterima
  const [operatorImage, setOperatorImage] = useState(null); // Default null jika tidak ada
  const navigation = useNavigation();

  // Cek nomor telepon untuk mendapatkan prefix operator
  useEffect(() => {
    if (phoneNumber) {
      const prefix = phoneNumber.substring(0, 4); // Ambil 4 digit pertama

      const operatorImages = {
        telkomsel: require('../assets/telkomsel.png'),
        indosat: require('../assets/indosat.png'),
        tri: require('../assets/tri.png'),
        xl: require('../assets/xl.png'),
        axis: require('../assets/axis.png'),
        smartfren: require('../assets/smartfren.png'),
      };

      // Cek prefix dan set gambar operator
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
  }, [phoneNumber]);

  return (
    <ScrollView className="flex-1 p-4 pt-10 pb-10">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.navigate('Transaksi')}>
          <Image 
            source={require('../assets/left.png')} 
            className="w-6 h-6" 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4 p-4">Bukti Transaksi</Text>
      </View>

      {/* Gambar operator berdasarkan prefix */}
      <View className="flex-row justify-center mb-6">
        {operatorImage && (
          <Image 
            source={operatorImage} 
            className="w-20 h-20 mb-4" 
            resizeMode="contain" 
          />
        )}
      </View>
      
      <Text className="text-center font-bold text-lg mb-2">Operator</Text>
      <Text className="text-center text-black mb-6">
        Nomor: {phoneNumber || 'Tidak tersedia'}
      </Text>

      {/* Detail transaksi */}
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">TERMINAL</Text>
        <Text className="mb-2">Success</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">MERCHANT</Text>
        <Text className="mb-2">{Math.floor(Math.random() * 100000000000000).toString()}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">JENIS TRANSAKSI</Text>
        <Text className="mb-2">SALE</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">JENIS KARTU</Text>
        <Text className="mb-2">Kartu UnionPay Credit</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">NOMOR KARTU</Text>
        <Text className="mb-2">**********0005</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">TGL. TRANSAKSI</Text>
        <Text className="mb-2">{transaction ? `${transaction.date}, ${transaction.time}` : 'Tidak tersedia'}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">BATCH</Text>
        <Text className="mb-2">{transaction?.trace || 'Tidak tersedia'}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">TRACE NO</Text>
        <Text className="mb-2">{transaction?.trace || 'Tidak tersedia'}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">REFERENCE NO</Text>
        <Text className="mb-2">{`${transaction?.trace || 'Tidak tersedia'}20`}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">APPROVAL CODE</Text>
        <Text className="mb-2">{approvalCode || 'Tidak tersedia'}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="font-bold">TOTAL</Text>
        <Text className="mb-2 text-black">
          {transaction?.price ? transaction.price : 'Tidak tersedia'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailTransaksi;

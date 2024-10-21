import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const DetailTransaksi = ({ route }) => {
  const { transaction, approvalCode, phoneNumber } = route.params || {};
  const [operatorImage, setOperatorImage] = useState(null);
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext); // Mendapatkan status dark mode

  useEffect(() => {
    if (phoneNumber) {
      const prefix = phoneNumber.substring(0, 4);

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
  }, [phoneNumber]);

  return (
    <ScrollView className={`flex-1 p-4 pt-10 pb-10 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.navigate('Transaksi')}>
          <Image 
            source={require('../assets/left.png')} 
            className="w-6 h-6" 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text className={`text-lg font-bold ml-4 p-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Bukti Transaksi</Text>
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
      
      <Text className={`text-center font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Operator</Text>
      <Text className={`text-center ${isDarkMode ? 'text-white' : 'text-black'} mb-6`}>
        Nomor: {phoneNumber || 'Tidak tersedia'}
      </Text>

      {/* Detail transaksi */}
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>TERMINAL</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>Success</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>MERCHANT</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>
          {Math.floor(Math.random() * 100000000000000).toString()}
        </Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>JENIS TRANSAKSI</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>SALE</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>JENIS KARTU</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>Kartu UnionPay Credit</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>NOMOR KARTU</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>**********0005</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>TGL. TRANSAKSI</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>
          {transaction ? `${transaction.date}, ${transaction.time}` : 'Tidak tersedia'}
        </Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>BATCH</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>
          {transaction?.trace || 'Tidak tersedia'}
        </Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>TRACE NO</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>
          {transaction?.trace || 'Tidak tersedia'}
        </Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>REFERENCE NO</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>
          {`${transaction?.trace || 'Tidak tersedia'}20`}
        </Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>APPROVAL CODE</Text>
        <Text className={`${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>
          {approvalCode || 'Tidak tersedia'}
        </Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>TOTAL</Text>
        <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {transaction?.price ? transaction.price : 'Tidak tersedia'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailTransaksi;

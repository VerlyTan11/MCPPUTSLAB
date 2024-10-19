import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailTransaksi = ({ route }) => {
  const { transaction, approvalCode, phoneNumber } = route.params;
  const [operatorImage, setOperatorImage] = useState();
  const navigation = useNavigation();

  // Determine operator image based on the first 4 digits of the phone number
  useEffect(() => {
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
  }, [phoneNumber]);

  return (
    <View className="flex-1 bg-white p-4 pt-10">
        <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => navigation.navigate('Transaksi')}>
            <Image 
                source={require('../assets/left.png')} 
                className="w-6 h-6" 
                resizeMode="contain" 
            />
            </TouchableOpacity>
            <Text className="text-lg font-bold ml-4">Bukti Void</Text>
        </View>
        <View className="flex-row justify-center mb-6">
            <Image 
            source={operatorImage} 
            className="w-20 h-20 mb-4" 
            resizeMode="contain" 
            />
        </View>
        <Text className="text-center font-bold text-lg mb-2">Operator Name</Text>
        <Text className="text-center text-gray-500 mb-6">Operator Number: {phoneNumber}</Text>

        <View className="mb-4">
            <Text className="font-bold">TERMINAL</Text>
            <Text className="mb-2">Success</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">MERCHANT</Text>
            <Text className="mb-2">{Math.floor(Math.random() * 100000000000000).toString()}</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">JENIS TRANSAKSI</Text>
            <Text className="mb-2">SALE</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">JENIS KARTU</Text>
            <Text className="mb-2">Kartu UnionPay Credit</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">NOMOR KARTU</Text>
            <Text className="mb-2">**********0005</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">TGL. TRANSAKSI</Text>
            <Text className="mb-2">{`${transaction.date}, ${transaction.time}`}</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">BATCH</Text>
            <Text className="mb-2">{transaction.trace}</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">TRACE NO</Text>
            <Text className="mb-2">{transaction.trace}</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">REFERENCE NO</Text>
            <Text className="mb-2">{`${transaction.trace}20`}</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">APPROVAL CODE</Text>
            <Text className="mb-2">{approvalCode}</Text>
        </View>
        <View className="mb-4">
            <Text className="font-bold">TOTAL</Text>
            <Text className="mb-2">{transaction.price}</Text>
        </View>
    </View>
  );
};

export default DetailTransaksi;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PinInputModal from './PinInputModal'; // Import the modal

const PaymentConfirmation = ({ route, navigation }) => {
  const { price, phoneNumber } = route.params;
  const [isPinModalVisible, setPinModalVisible] = useState(false);

  const handleConfirmation = () => {
    setPinModalVisible(true); // Open the PIN modal
  };

  const handleSuccess = () => {
    setPinModalVisible(false); // Close the modal
    navigation.navigate('Success', { price }); // Navigate to Success
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

      <View className="bg-gray-200 rounded-md p-4 flex-row">
        <Image source={require('../assets/telkomsel.png')} className="w-10 h-14" />
        <View className="px-4">
          <Text className="font-bold text-lg">Telkomsel</Text>
          <Text className="text-base mb-2">{phoneNumber}</Text>
        </View>
        <Text className="text-base ml-10 mt-3 font-semibold">{price}</Text>
      </View>

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
        <View className="flex-row mt-3 items-center">
          <Text>Harga Voucher</Text>
          <Text className="text-base ml-36 pl-2">{price}</Text>
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
        visible={isPinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onSuccess={handleSuccess}
      />
    </View>
  );
};

export default PaymentConfirmation;

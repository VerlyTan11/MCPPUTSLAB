import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Menu from './Menu'; // Import Menu
import { useNavigation } from '@react-navigation/native';

const Transaksi = ({ route }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const phoneNumber = route.params?.phoneNumber;
  const traceNumberRef = useRef(1); // Ref to keep track of trace number
  const approvalCodeRef = useRef(100000); // Ref to keep track of approval codes

  useEffect(() => {
    const generateTransactions = () => {
      return Array.from({ length: 10 }).map((_, i) => {
        const trace = traceNumberRef.current.toString().padStart(6, '0');
        traceNumberRef.current += 1;

        return {
          id: i.toString(),
          trace,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: `Rp. ${Math.floor(Math.random() * 50000 + 10000).toLocaleString()}`,
        };
      });
    };

    setTransactions(generateTransactions());
  }, []);

  const filteredTransactions = transactions.filter((t) =>
    t.trace.includes(searchText)
  );

  const handleTransactionPress = (transaction) => {
    // Navigate to the detail screen with transaction details and phoneNumber
    navigation.navigate('DetailTransaksi', {
      transaction,
      approvalCode: approvalCodeRef.current,
      phoneNumber // Pass phoneNumber ke DetailTransaksi
    });
    approvalCodeRef.current += 1; // Increment the approval code for next transaction
  };

  return (
    <View className="flex-1 bg-white p-4 pt-10">
      <View className="flex-row items-center mb-4">
        <Text className="text-lg font-bold">Transaksi</Text>
      </View>
      <View>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Cari berdasarkan No. Trace"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTransactionPress(item)}>
              <View className="flex-row justify-between p-4 border-b border-gray-300">
                <View>
                  <Text className="font-semibold">No. Trace: {item.trace}</Text>
                  <Text className="text-sm text-gray-500">
                    {item.date} | {item.time}
                  </Text>
                </View>
                <Text className="font-bold">{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text className="text-center mt-4">Tidak ada transaksi ditemukan.</Text>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
      <Menu />
    </View>
  );
};

export default Transaksi;

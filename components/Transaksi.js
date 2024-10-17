import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Menu from './Menu'; // Import Menu

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const generateTransactions = () => {
      return Array.from({ length: 10 }).map((_, i) => ({
        id: i.toString(),
        trace: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: `Rp. ${Math.floor(Math.random() * 50000 + 10000)}`,
      }));
    };
    setTransactions(generateTransactions());
  }, []);

  const filteredTransactions = transactions.filter((t) =>
    t.trace.includes(searchText)
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center mb-4 p-4">
        <Text className="text-lg font-bold">Transaksi</Text>
      </View>
      <View className="p-4 py-2">
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
            <View className="flex-row justify-between p-4 border-b border-gray-300">
              <View>
                <Text className="font-semibold">No. Trace: {item.trace}</Text>
                <Text className="text-sm text-gray-500">
                  {item.date} | {item.time}
                </Text>
              </View>
              <Text className="font-bold">{item.price}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center mt-4">Tidak ada transaksi ditemukan.</Text>
          }
          contentContainerStyle={{ paddingBottom: 100 }} // Adjust this value to create space above the menu
        />
      </View>
      <Menu />
    </View>
  );
};

export default Transaksi;

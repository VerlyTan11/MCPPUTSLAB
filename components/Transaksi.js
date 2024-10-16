import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import 'react-native-get-random-values'; // Required for uuid support in React Native
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


// Generate unique trace numbers
const generateUniqueTraceNumbers = (count) => {
  const traceNumbers = new Set();
  while (traceNumbers.size < count) {
    const randomTrace = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    traceNumbers.add(randomTrace);
  }
  return Array.from(traceNumbers);
};

// Generate random transaction data
const generateTransactionData = () => {
  const traces = generateUniqueTraceNumbers(10);
  return traces.map((trace) => ({
    id: uuidv4(),
    trace,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: `Rp. ${Math.floor(Math.random() * 50000 + 10000)}`,
  }));
};

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); // Get the navigation object

  // Generate transaction data when the component mounts
  useEffect(() => {
    setTransactions(generateTransactionData());
  }, []);

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.trace.includes(searchText)
  );

  // Render a single transaction item
  const renderTransactionItem = ({ item }) => (
    <View className="flex-row justify-between p-4 border-b border-gray-300">
      <View>
        <Text className="font-semibold">No. Trace: {item.trace}</Text>
        <Text className="text-sm text-gray-500">{item.date} | {item.time}</Text>
      </View>
      <Text className="font-bold">{item.price}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image 
            source={require('../assets/left.png')} 
            className="w-6 h-6" 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4">Transaksi</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Cari berdasarkan No. Trace"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        ListEmptyComponent={
          <Text className="text-center mt-4">Tidak ada transaksi ditemukan.</Text>
        }
      />
    </View>
  );
};

export default Transaksi;

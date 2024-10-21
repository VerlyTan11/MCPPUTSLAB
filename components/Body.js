import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const { width: screenWidth } = Dimensions.get('window');

const carouselItems = [
  { imgSrc: require('../assets/dummy.png'), caption: 'Promo 1' },
  { imgSrc: require('../assets/dummy.png'), caption: 'Promo 2' },
  { imgSrc: require('../assets/dummy.png'), caption: 'Promo 3' },
];

const Body = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext); // Mengakses status dark mode

  // Function to handle auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => {
        const nextPage = (prevPage + 1) % carouselItems.length;
        pagerRef.current.setPage(nextPage);
        return nextPage;
      });
    }, 3000); // Set slide interval to 3 seconds

    return () => clearInterval(interval);
  }, []);

  const renderPage = (item, index) => (
    <View key={index} className="items-center">
      <Image
        source={item.imgSrc}
        className="w-full h-40"
        resizeMode="contain"
      />
      <Text className={`text-lg mt-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {item.caption}
      </Text>
    </View>
  );

  return (
    <View className={`flex-1 m-4 mt-10 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Section dengan tiga icon */}
      <View className="flex-row justify-evenly pb-6">
        <TouchableOpacity
          className="items-center"
          onPress={() => navigation.navigate('Pulsa')} // Navigasi ke Pulsa.js
        >
          <Image
            source={require('../assets/iphone.png')}
            className="w-8 h-8 bg-grey rounded-md"
            resizeMode="contain"
          />
          <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Pulsa/Data</Text>
        </TouchableOpacity>
        <TouchableOpacity // Tambahkan TouchableOpacity untuk navigasi Listrik
          className="items-center"
          onPress={() => navigation.navigate('Listrik')} // Navigasi ke tab Listrik
        >
          <Image
            source={require('../assets/energy.png')}
            className="w-8 h-8 bg-grey rounded-md"
            resizeMode="contain"
          />
          <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Listrik</Text>
        </TouchableOpacity>
        <TouchableOpacity // Tambahkan TouchableOpacity untuk navigasi BPJS
          className="items-center"
          onPress={() => navigation.navigate('BPJS')} // Navigasi ke halaman BPJS
        >
          <Image
            source={require('../assets/healthcare.png')}
            className="w-8 h-8 bg-grey rounded-md"
            resizeMode="contain"
          />
          <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>BPJS</Text>
        </TouchableOpacity>
      </View>

      {/* PagerView/Slider Section */}
      <View className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-grey'}`}>
        <PagerView
          ref={pagerRef}
          style={{ width: screenWidth - 60, height: 200 }}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {carouselItems.map((item, index) => renderPage(item, index))}
        </PagerView>
      </View>
    </View>
  );
};

export default Body;

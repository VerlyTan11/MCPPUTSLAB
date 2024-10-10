import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width: screenWidth } = Dimensions.get('window');

const carouselItems = [
  { imgSrc: require('../assets/dummy.png'), caption: 'Promo 1' },
  { imgSrc: require('../assets/dummy.png'), caption: 'Promo 2' },
  { imgSrc: require('../assets/dummy.png'), caption: 'Promo 3' },
];

const Body = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);

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
      <Text className="text-lg mt-2">{item.caption}</Text>
    </View>
  );

  return (
    <View className="flex-1 m-4 mt-10">
      {/* Section dengan tiga icon */}
      <View className="flex-row justify-evenly pb-6">
        <View className="items-center">
          <Image
            source={require('../assets/iphone.png')}
            className="w-8 h-8 bg-grey rounded-md"
            resizeMode="contain"
          />
          <Text>Pulsa/Data</Text>
        </View>
        <View className="items-center">
          <Image
            source={require('../assets/energy.png')}
            className="w-8 h-8 bg-grey rounded-md"
            resizeMode="contain"
          />
          <Text>Tarik Tunai</Text>
        </View>
        <View className="items-center">
          <Image
            source={require('../assets/healthcare.png')}
            className="w-8 h-8 bg-grey rounded-md"
            resizeMode="contain"
          />
          <Text>More</Text>
        </View>
      </View>

      {/* PagerView/Slider Section */}
      <View className="bg-grey p-4 rounded-lg">
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

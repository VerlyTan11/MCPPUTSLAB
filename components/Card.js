import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

const Card = () => {
    const { isDarkMode } = useContext(ThemeContext); // Mengakses status dark mode

    return (
        <View className={`mx-4 ${isDarkMode ? 'bg-black' : 'bg-grey'}`}>
            <View className="p-6 flex-col">
                <Text className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>Nama Anda</Text>
                <Text className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>2021</Text>
            </View>

            <View className="flex-row justify-around pb-6">
                <View className="items-center">
                    <Image
                        source={require('../assets/up-arrow.png')}
                        className="w-8 h-8"
                        resizeMode="contain"
                    />
                    <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Transfer</Text>
                </View>
                <View className="items-center">
                    <Image
                        source={require('../assets/down-arrow.png')}
                        className="w-8 h-8"
                        resizeMode="contain"
                    />
                    <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Tarik Tunai</Text>
                </View>
                <View className="items-center">
                    <Image
                        source={require('../assets/app.png')}
                        className="w-8 h-8"
                        resizeMode="contain"
                    />
                    <Text className={`${isDarkMode ? 'text-white' : 'text-black'}`}>More</Text>
                </View>
            </View>
        </View>
    );
};

export default Card;

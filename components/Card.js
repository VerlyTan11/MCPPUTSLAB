import React from 'react';
import { View, Text, Image } from 'react-native';

const Card = () => {
    return (
        <View className="bg-grey mx-4">
        <View className="p-6 flex-col">
            <Text className="text-sm">Nama Anda</Text>
            <Text className="font-bold text-xl">2021</Text>
        </View>

        <View className="flex-row justify-around pb-6">
            <View className="items-center">
                <Image
                    source={require('../assets/up-arrow.png')}
                    className="w-8 h-8"
                    resizeMode="contain"
                />
                <Text>Transfer</Text>
            </View>
            <View className="items-center">
                <Image
                    source={require('../assets/down-arrow.png')}
                    className="w-8 h-8"
                    resizeMode="contain"
                />
                <Text>Tarik Tunai</Text>
            </View>
            <View className="items-center">
                <Image
                    source={require('../assets/app.png')}
                    className="w-8 h-8"
                    resizeMode="contain"
                />
                <Text>More</Text>
            </View>
        </View>
        </View>
    );
};

export default Card;

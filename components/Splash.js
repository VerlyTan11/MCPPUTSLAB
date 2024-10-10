import React, { useEffect } from 'react';
import { View } from 'react-native';

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 1000); //splash 1 detik
    }, [navigation]);

    return (
        <View className=""></View>
    );
};

export default Splash;
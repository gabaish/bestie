import { useState} from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
import { Stack, useRouter, Link} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../constants';

const Home = () => {
    const router = useRouter();
    return(
        <SafeAreaView className= "h-full">
            <ScrollView contentContainerStyle={{height:'100%'}}/>
            <View className="w-full justify-center items-center h-full px-4">
                <Image 
                    source= {images.logo}
                    className="w-[130px] h-[84px]"
                    resizeMode='contain'
                />
                <Text className= "text-xl font-bold">Home</Text>
                <Link href="/friends" >Go To Friends page</Link>
                <Link href="/landing" >Go To Landing page</Link>
            </View>
            
        </SafeAreaView>
    )
}

export default Home;
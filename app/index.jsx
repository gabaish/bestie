import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Stack, Link } from 'expo-router'; // Using Stack and Link from Expo Router
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'; // Assuming you have an images constant

const Home = () => {
  return (
    <SafeAreaView className="h-full">
      <Stack.Screen
        options={{
          headerShown: false, // Hide the default header if you don't want it
        }}
      />
      
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold">Home</Text>

          {/* Navigation Links */}
          <Link href="/friends" className="text-blue-500">Go To Friends page</Link>
          <Link href="/landing" className="text-blue-500">Go To Onboarding page</Link>
          <Link href="/addDog" className="text-blue-500">Go To Add Dog Profile page</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

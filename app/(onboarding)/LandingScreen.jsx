import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions,SafeAreaView } from 'react-native';
import { colors } from '../../constants/colors';
import { OnboardingButton } from '../../components/onboardingComponents';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const carouselItems = [
    { id: '1', color: '#89CFF0' }, // Example color
    { id: '2', color: '#FFD700' }, // Example color
    { id: '3', color: '#FF69B4' },  // Example color
  ];

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }) => (
    <View style={[styles.carouselItem, { backgroundColor: item.color }]} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image source={{ uri: 'https://via.placeholder.com/75' }} style={styles.logo} />

      {/* Main Text */}
      <Text style={styles.mainText}>Bestie</Text>
      
      {/* Sub Text */}
      <Text style={styles.subText}>
      Connect with dog lovers and {"\n"}plan playdates for your furry friends
      </Text>

      {/* Carousel */}
      <FlatList
        data={carouselItems}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.carousel}
        contentContainerStyle={{
          paddingHorizontal: (width * 0.1) / 2,  // Ensures items are centered
        }}
        snapToAlignment="center"  // Snap to center alignment
        snapToInterval={width * 0.8 + 15 }  // The item width + margin
        decelerationRate="fast"  // Makes the scrolling snap faster
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {carouselItems.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { opacity: i === activeIndex ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>

      <OnboardingButton title="Ready to go?" onPress= {() => navigation.navigate('RegistrationScreen')}/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onboardingBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: '5%',
    marginTop: '25%',
  },
  mainText: {
    fontSize: 32,
    color: colors.onboardingMainText,
    fontWeight: 'bold',
    marginBottom: '2.5%',
  },
  subText: {
    fontSize: 16,
    color: colors.onboardingMainText,
    textAlign: 'center',
    marginBottom: '12.5%',
  },
  carousel: {
    marginBottom: '5%',
    
  },
  carouselItem: {
    width: width * 0.77,
    borderRadius: 10,
    marginHorizontal: '1%',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: '51%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.onboardingMainText,
    marginHorizontal: 4,
  }
});

export default LandingScreen;

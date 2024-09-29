import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    <View style={styles.container}>
      {/* Logo */}
      <Image source={{ uri: 'https://via.placeholder.com/75' }} style={styles.logo} />

      {/* Main Text */}
      <Text style={styles.mainText}>Text</Text>
      
      {/* Sub Text */}
      <Text style={styles.subText}>
        text text text text text{"\n"}text text text text text
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

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('RegistrationScreen')}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213E53',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 20,
    marginTop: 40,
  },
  mainText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  carousel: {
    marginBottom: 20,
  },
  carouselItem: {
    width: width * 0.77, // Make sure items are 80% of screen width
    height: 200,
    borderRadius: 10,
    marginHorizontal: 7,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 250,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    width: width * 0.8,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default LandingScreen;

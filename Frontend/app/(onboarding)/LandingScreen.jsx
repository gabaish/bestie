import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { colors } from '../../constants/colors';
import { icons } from '../../constants';
import { images } from '../../constants';
import { OnboardingButton } from '../../components/onboardingComponents';

const { width } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const carouselItems = [
    {
      id: '1',
      image: images.meetFriends,
      subText: 'Find new dog friends in your area',
    },
    {
      id: '2',
      image: images.createPlaydates,
      subText: 'Create and join playdates',
    },
    {
      id: '3',
      image: images.communities,
      subText: 'Bring dog lovers together',
    },
  ];

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={icons.logoWhite} style={styles.logo} />
      <Text style={styles.mainText}>Bestie</Text>
      <Text style={styles.subText}>
        {carouselItems[activeIndex].subText}
      </Text>
      
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
          paddingHorizontal: (10),
        }}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="fast"
      />

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
    width: 60,
    height: 60,
    marginBottom: '3%',
    marginTop: '25%',
  },
  mainText: {
    fontSize: 40,
    color: colors.onboardingMainText,
    fontWeight: 'bold',
    marginBottom: '8%',
  },
  subText: {
    fontSize: 18,
    color: colors.onboardingMainText,
    textAlign: 'center',
    marginBottom: '5%',
  },
  carousel: {
    marginBottom: '5%',
  },
  carouselItem: {
    width: width, // Set width to match the screen width
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: '70%', // Adjust width to reduce image size
    height: width * 0.7, // Adjust height for a proportional image
    borderRadius: 10,
    opacity: 0.85,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: '45%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.onboardingMainText,
    marginHorizontal: 4,
  },
  
  startButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LandingScreen;

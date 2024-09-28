import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function MapComponent() {
  const [location, setLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showRadiusSlider, setShowRadiusSlider] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [radius, setRadius] = useState(500);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const centerToUserLocation = async () => {
    if (location && mapRef) {
      mapRef.animateToRegion(location, 1000);
    }
  };

  const toggleRadiusSlider = () => {
    setShowRadiusSlider((prev) => !prev);
  };

  const handleOutsidePress = () => {
    if (showRadiusSlider) {
      setShowRadiusSlider(false);
    }
  };

  if (!location) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        {/* Top Bar with Filters and Menu */}
        <View style={styles.topBar}>
          <Text style={styles.filterText}>Filters</Text>

          <TouchableOpacity style={styles.menuButton} onPress={toggleFilters}>
            <MaterialIcons name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Conditionally Render Filter Buttons */}
        {showFilters && (
          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Size</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Age</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Gender</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Energy Level</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Status Button */}
        <View
          style={[
            styles.statusButtonContainer,
            showFilters ? styles.statusButtonWithFilters : styles.statusButtonWithoutFilters,
          ]}
        >
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusButtonText}>Active</Text>
          </TouchableOpacity>
        </View>

        {/* Map */}
        <MapView
          ref={(ref) => setMapRef(ref)}
          style={styles.map}
          region={location}
          mapType="standard"
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
          <Circle
            center={location}
            radius={radius}
            strokeWidth={1}
            strokeColor={'rgba(0,176,240,0.5)'}
            fillColor={'rgba(0,176,240,0.2)'}
          />
        </MapView>

        {/* Button to return to the user's location */}
        <TouchableOpacity style={styles.locationButton} onPress={centerToUserLocation}>
          <MaterialIcons name="my-location" size={24} color="white" />
        </TouchableOpacity>

        {/* Button to open radius slider */}
        <TouchableOpacity style={styles.radiusButton} onPress={toggleRadiusSlider}>
          <MaterialIcons name="tune" size={24} color="white" />
        </TouchableOpacity>

        {/* Radius Slider */}
        {showRadiusSlider && (
          <View style={styles.horizontalSliderContainer}>
            <Slider
              style={styles.horizontalSlider}
              minimumValue={0}
              maximumValue={1500}
              step={50}
              value={radius}
              onValueChange={(value) => setRadius(value)}
              minimumTrackTintColor="#4CAF50"
              maximumTrackTintColor="#AAAAAA"
              thumbTintColor="#FFFFFF"
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: '5%',
    right: '5%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2C3E50',
    borderRadius: 25,
    zIndex: 1,
  },
  filterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#2C3E50',
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 20,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#2C3E50',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  menuButton: {
    padding: 5,
  },
  filterButtonsContainer: {
    position: 'absolute',
    top: 100,
    left: '5%',
    right: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  filterButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusButtonContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center', // Align text and button horizontally
  },
  statusButtonWithoutFilters: {
    top: 100,
  },
  statusButtonWithFilters: {
    top: 145,
  },
  statusButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    backgroundColor: '#2C3E50',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  radiusButton: {
    position: 'absolute',
    right: 20,
    bottom: 200,
    backgroundColor: '#2C3E50',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  horizontalSliderContainer: {
    position: 'absolute',
    bottom: 320,
    right: -42,
    backgroundColor: '#2C3E50',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 25,
    zIndex: 3,
    transform: [{ rotate: '270deg' }],
  },
  horizontalSlider: {
    width: 150,
  },
});

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

export default function MapComponent() {
  const [location, setLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter buttons

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
    setShowFilters((prev) => !prev); // Toggle the filter buttons' visibility
  };

  if (!location) {
    return null;
  }

  return (
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
            <Text style={styles.filterButtonText}>Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Energy Level</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Age</Text>
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
        style={styles.map}
        region={location}
        mapType="standard"
        showsUserLocation={true}
      >
        <Marker coordinate={location} title="You are here" />
        <Circle
          center={location}
          radius={500} // Adjust radius as per your preference
          strokeWidth={1}
          strokeColor={'rgba(0,176,240,0.5)'}
          fillColor={'rgba(0,176,240,0.2)'}
        />
      </MapView>

      
    </View>
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
    zIndex: 0, // Ensure the map is at the lowest level
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: '5%', // Reduce width, centered
    right: '5%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2C3E50',
    borderRadius: 25, // Rounded edges for the top bar
    zIndex: 1, // Ensure top bar is above the map
  },
  filterText: {
    color: 'white', // White text for "Filters"
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#2C3E50', // Same background as top bar
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 20,
  },
  filterButtonText: {
    color: 'white', // White text for "Filters"
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#2C3E50', // Same background as top bar
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
    justifyContent: 'space-between', // Add space between the buttons
    zIndex: 2, // Above the map and top bar
  },
  filterButton: {
    backgroundColor: '#2C3E50', // Same color as "Active" button
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusButtonContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 2, // Ensure this is above the map
  },
  statusButtonWithoutFilters: {
    top: 100, // Default position of the status button when filters are hidden
  },
  statusButtonWithFilters: {
    top: 145, // Adjust the position when filters are visible
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
  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 3, // Ensure the bottom bar is above the map
  },
  bottomButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2C3E50',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCenterButton: {
    width: 60,
    height: 60,
    backgroundColor: '#27AE60',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { icons} from '../../constants';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function MapComponent() {
  const [location, setLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showRadiusSlider, setShowRadiusSlider] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [radius, setRadius] = useState(500);
  const [activityStatus, setActivityStatus] = useState("Public");
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState([]);
  const [ageDropdownVisible, setAgeDropdownVisible] = useState(false);
  const [selectedAge, setSelectedAge] = useState([]);
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [energyDropdownVisible, setEnergyDropdownVisible] = useState(false);
  const [selectedEnergy, setSelectedEnergy] = useState(50);

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
    setSizeDropdownVisible(false);
    setAgeDropdownVisible(false);
    setGenderDropdownVisible(false);
    setEnergyDropdownVisible(false);
  };

  const hideOtherFilters = (currentFilter) =>{
    if(currentFilter!="size")
      setSizeDropdownVisible(false);
    else
      setSizeDropdownVisible(!sizeDropdownVisible);
    if(currentFilter!="age")
      setAgeDropdownVisible(false);
    else
      setAgeDropdownVisible(!ageDropdownVisible);
    if(currentFilter!="gender")
      setGenderDropdownVisible(false);
    else
      setGenderDropdownVisible(!genderDropdownVisible);
    if(currentFilter!="energy")
      setEnergyDropdownVisible(false);
    else
      setEnergyDropdownVisible(!energyDropdownVisible);
  }

  const toggleSize = (size)=> {
    if(selectedSize.includes(size))
      setSelectedSize(selectedSize.filter(s => s!==size));
    else
      setSelectedSize([...selectedSize,size]);
    
  }

  const isSelectedSize = (size) => { return selectedSize.includes(size)};

  const toggleAge = (age)=> {
    if(selectedAge.includes(age))
      setSelectedAge(selectedAge.filter(a => a!==age));
    else
      setSelectedAge([...selectedAge,age]);
  }

  const toggleGender = (gender) => {
    if(selectedGender==gender)
      setSelectedGender('');
    else{
      if(gender == 'Female')
        setSelectedGender('Female');
      else
        setSelectedGender('Male');
    }
    
  }

  const isSelectedAge = (age) => { return selectedAge.includes(age)};

  const handlePress = (status) => {
    setActivityStatus(status);
    handleStatusPress();
  };
  
  const handleStatusPress = () => {
    setShowStatusOptions(!showStatusOptions);
  }

  const centerToUserLocation = async () => {
    if (location && mapRef) {
      mapRef.animateToRegion(location, 1000);
    }
  };

  const toggleRadiusSlider = () => {
    setShowRadiusSlider((prev) => !prev);
  };

  const handleOutsidePress = () => { 
    setShowRadiusSlider(false);
    setAgeDropdownVisible(false);
    setSizeDropdownVisible(false);
    setGenderDropdownVisible(false);
    setEnergyDropdownVisible(false);
    setShowStatusOptions(false);
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

          {
            showFilters?
            <TouchableOpacity style={styles.menuButton} onPress={toggleFilters}>
            <MaterialIcons name="close" size={24} color={colors.tabsMainText} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.menuButton} onPress={toggleFilters}>
            <MaterialIcons name="menu" size={24} color={colors.tabsMainText} />
            </TouchableOpacity>
          }

          
        </View>

        {/* Conditionally Render Filter Buttons */}
        {showFilters && (
          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity style={[styles.filterButton, selectedSize.length != 0 ? styles.filterButtonSelected : null]} onPress={()=> hideOtherFilters("size")}>
              <Text style={[styles.filterButtonText,selectedSize.length != 0 ? styles.selectedFilterButtonText : null]}>Size</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterButton, selectedAge.length!=0 ? styles.filterButtonSelected : null]} onPress={()=> hideOtherFilters("age")}>
              <Text style={[styles.filterButtonText, selectedAge.length!=0 ? styles.selectedFilterButtonText : null]}>Age</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterButton, selectedGender!='' ? styles.filterButtonSelected : null]} onPress={()=> hideOtherFilters("gender")}>
              <Text style={[styles.filterButtonText, selectedGender!='' ? styles.selectedFilterButtonText : null]}>Gender</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterButton, energyDropdownVisible? styles.filterButtonSelected : null]}  onPress={()=> hideOtherFilters("energy")}>
              <Text style={[styles.filterButtonText, energyDropdownVisible? styles.selectedFilterButtonText : null]}>Energy Level</Text>
            </TouchableOpacity>
          </View>
        )   
        }
        {
            sizeDropdownVisible &&
            <View style={[styles.dropdownContainer, styles.modalDropdown, {top:'22%'}]}>
              <TouchableOpacity  onPress={() => { toggleSize('Small'); }}>
                <View >
                  <Image source={icons.dogSizeSmall} resizeMode="contain" style={[{ width: 40, height: 40}, styles.filterOption, isSelectedSize("Small")?styles.selectedFilterOption:null]} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => { toggleSize('Medium'); }}>
                <View >
                  <Image source={icons.dogSizeMedium} resizeMode="contain" style={[{ width: 60, height: 60}, styles.filterOption, isSelectedSize("Medium")?styles.selectedFilterOption:null]} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => { toggleSize('Big');}}>
                <View >
                  <Image source={icons.dogSizeBig} resizeMode="contain" style={[{ width: 80, height: 80}, styles.filterOption, isSelectedSize("Big")?styles.selectedFilterOption:null]} />
                </View>
              </TouchableOpacity>
            </View>
        }

        {
          ageDropdownVisible &&
          <View style={[styles.dropdownContainer, styles.modalDropdown, {top:'22%'}]}>
            <TouchableOpacity  onPress={() => { toggleAge('0-1'); }}>
              <View style= {styles.ageOptionContainer} >
                <Text style={[styles.ageOptionText, styles.filterOption, isSelectedAge("0-1")?styles.selectedFilterOption:null]} > 0-1 </Text>
                <Text style= {[styles.ageOptionYearsText, styles.filterOption, isSelectedAge("0-1")?styles.selectedFilterOption:null]}> Years</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => { toggleAge('1-3'); }}>
              <View style= {styles.ageOptionContainer} >
                <Text style={[styles.ageOptionText,styles.filterOption, isSelectedAge("1-3")?styles.selectedFilterOption:null]} > 1-3 </Text>
                <Text style= {[styles.ageOptionYearsText, styles.filterOption, isSelectedAge("1-3")?styles.selectedFilterOption:null]}> Years</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => { toggleAge('3+');  }}>
              <View style= {styles.ageOptionContainer} >
                <Text style={[styles.ageOptionText, styles.filterOption, isSelectedAge("3+")?styles.selectedFilterOption:null]} > 3+ </Text>
                <Text style= {[styles.ageOptionYearsText, styles.filterOption, isSelectedAge("3+")?styles.selectedFilterOption:null]}> Years</Text>
              </View>
            </TouchableOpacity>
          </View>
        }

        {
          genderDropdownVisible && 
          <View style={[styles.dropdownContainer, styles.modalDropdown, {top:'22%'}]}>
            <TouchableOpacity style={styles.genderOption} onPress={() => { toggleGender('Female'); }}>
              <Text style={[styles.genderIcon, { color: selectedGender=='Female'? '#FF69B4': 'white' }]}>♀️</Text>
              <Text style={styles.genderLabel}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.genderOption} onPress={() => { toggleGender('Male'); }}>
              <Text style={[styles.genderIcon, { color: selectedGender=='Male'?'#00BFFF':'white' }]}>♂️</Text>
              <Text style={styles.genderLabel}>Male</Text>
            </TouchableOpacity>
          </View>
        }

        {
          energyDropdownVisible && 
          <View style={[styles.dropdownContainer, styles.modalDropdown, styles.sliderView, {top:'22%'}]}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={selectedEnergy}
              onValueChange={(value) => setSelectedEnergy(value)}
              minimumTrackTintColor="white"  
              maximumTrackTintColor="#CDCDCD"  
              thumbTintColor="#CDCDCD"                       
            />
          </View>
        }

        {!showStatusOptions && 
          <View
          style={[
            styles.statusButtonContainer,
            showFilters ? styles.statusButtonWithFilters : styles.statusButtonWithoutFilters,
          ]}
          >
           <TouchableOpacity style={[styles.statusButton, 
           activityStatus === "Public" ? styles.statusPublic : 
           activityStatus === "Friends Only" ? styles.statusFriendsOnly : 
           activityStatus === "Private" ? styles.statusPrivate : null]} onPress={handleStatusPress}>
            <Text style={styles.statusButtonText}>{activityStatus}</Text>
            </TouchableOpacity>
          </View>
        }
        

        {/* Status Button */}
        {showStatusOptions && 
          <View
          style={[
            styles.statusButtonContainer,
            showFilters ? styles.statusButtonWithFilters : styles.statusButtonWithoutFilters,
          ]}
        >
          <TouchableOpacity style={[styles.statusButton, styles.statusPublic]} onPress={()=> handlePress("Public")}>
            <Text style={styles.statusButtonText}>Public</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statusButton, styles.statusFriendsOnly]} onPress={()=> handlePress("Friends Only")}>
            <Text style={styles.statusButtonText}>Friends Only</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statusButton, styles.statusPrivate]} onPress={()=> handlePress("Private")}>
            <Text style={styles.statusButtonText}>Private</Text>
          </TouchableOpacity>
        </View>
        }
        

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
          <MaterialIcons name="my-location" size={24} color={colors.tabsMainText} />
        </TouchableOpacity>

        {/* Button to open radius slider */}
        <TouchableOpacity style={styles.radiusButton} onPress={toggleRadiusSlider}>
          <MaterialIcons name="tune" size={24} color={colors.tabsMainText} />
        </TouchableOpacity>

        {/* Radius Slider */}
        {showRadiusSlider && (
          <View style={styles.horizontalSliderContainer}>
            <Slider
              style={styles.horizontalSlider}
              minimumValue={100}
              maximumValue={500}
              step={100}
              value={radius}
              onValueChange={(value) => setRadius(value)}
              minimumTrackTintColor={colors.tabsValid}
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
    top: 80,
    left: '5%',
    right: '5%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.tabsPrimary,
    borderRadius: 25,
    zIndex: 1,
  },
  filterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: colors.tabsPrimary,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 20,
  },
  filterButtonText: {
    color: colors.tabsMainText,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: colors.tabsPrimary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedFilterButtonText: {
    backgroundColor: colors.tabsSeondary,
    color: colors.tabsPrimary
  },
  menuButton: {
    padding: 5,
  },
  filterButtonsContainer: {
    position: 'absolute',
    top: 140,
    left: '5%',
    right: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  filterButton: {
    backgroundColor: colors.tabsPrimary,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: colors.tabsSeondary,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: colors.tabsPrimary,
    alignSelf: 'center',
    borderRadius: 20,
    width:'75%',
    zIndex: 10, // Higher than overlay
  },
  modalDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  filterOption:{
    color: colors.tabsSeondary,
    tintColor: colors.tabsSeondary
  },
  selectedFilterOption:{
    color:'#056FA0',
    tintColor: '#056FA0'
  },
  ageOptionContainer:{
    alignItems:'center',
    padding:12
  },
  ageOptionText:{
    fontSize:30,
    fontWeight:'bold',
    marginBottom:5
  },
  ageOptionYearsText:{
    fontSize:14
  },
  genderOption: {
    alignItems: 'center',
    padding: 15,
  },
  genderIcon: {
    fontSize: 36,
    marginBottom: 5,
  },
  genderLabel: {
    fontSize: 14,
    color: colors.tabsMainText,
  },
  sliderView:{
    paddingHorizontal:15
  },
  slider: {
    alignSelf:'center',
    width: '100%',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  statusButtonContainer: {
    position: 'absolute',
    left: '6%',
    width:'75%',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButtonWithoutFilters: {
    top: '16.5%',
  },
  statusButtonWithFilters: {
    top: '21.5%',
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  statusPublic: {
    backgroundColor: '#4CAF50',
  },
  statusFriendsOnly: {
    backgroundColor: '#EF9C66',
  },
  statusPrivate: {
    backgroundColor: '#7F7F7F',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    backgroundColor: colors.tabsPrimary,
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
    backgroundColor: colors.tabsPrimary,
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
    backgroundColor: colors.tabsPrimary,
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

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { icons } from '../../constants';
import { colors } from '../../constants/colors';
import { OnboardingHeadline, OnboardingButton } from '../../components/onboardingComponents';
import { useLocalSearchParams  } from 'expo-router';
//const params = useLocalSearchParams();
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const QuestionnaireScreen = () => {
  const router = useRouter();
  const [breedDropdownVisible, setBreedDropdownVisible] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedSearchText, setBreedSearchText] = useState('');
  const breeds = ['Golden Retriever', 'Husky', 'Mixed Breed', 'pitbull', 'wind', 'labrador'];
  const [filteredBreeds, setFilteredBreeds] = useState(breeds);

  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState('');

  const { dogName } =useLocalSearchParams();
  

  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
    setBreedDropdownVisible(false);
    setBreedSearchText(breed);
    Keyboard.dismiss();
  };

  const handleSearchChange = (text) => {
    setBreedSearchText(text);
    setFilteredBreeds(breeds.filter((breed) => breed.toLowerCase().includes(text.toLowerCase())));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setBirthDate(date.toLocaleDateString());
    hideDatePicker();
  };

  const handleAddButton = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
    <OnboardingHeadline title={"Nice to meet you, " + dogName + "!"} style={styles.customHeadline}/>

      {/* Breed Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Breed</Text>
        <TouchableOpacity style={styles.button} onPress={() => setBreedDropdownVisible(true)}>
          <TextInput
            style={styles.inputText}
            placeholder=""
            value={breedSearchText}
            onFocus={() => setBreedDropdownVisible(true)}
            onChangeText={handleSearchChange}
          />
        </TouchableOpacity>
      </View>

      {breedDropdownVisible && (
        <TouchableWithoutFeedback onPress={() => { setBreedDropdownVisible(false); Keyboard.dismiss(); }}>
          <View style={styles.overlay}>
            <View style={[styles.dropdownContainer, { top: '38%' }]}>
              <FlatList
                data={filteredBreeds}
                keyExtractor={(item) => item}
                style={{ maxHeight: height * 0.3 }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.breedOption} onPress={() => handleBreedSelect(item)}>
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* Birth Date Section */}
      <View style={[styles.section, breedDropdownVisible && styles.disabledSection]}>
        <Text style={styles.label}>Birth date</Text>
        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.inputText}>{birthDate || ' '}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          display="spinner"
          headerTextIOS="Pick a Date"
          textColor="#FFFFFF"
          buttonTextColorIOS='white'
          
        />
      </View>

      {/* Gender Section */}
      <View style={[styles.section, breedDropdownVisible && styles.disabledSection]}>
        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity style={styles.button} onPress={() => setGenderDropdownVisible(!genderDropdownVisible)}>
          <Text style={styles.inputText}>{selectedGender || ' '}</Text>
        </TouchableOpacity>
        {genderDropdownVisible && (
          <TouchableWithoutFeedback onPress={() => setGenderDropdownVisible(false)}>
            <View style={styles.overlay}>
              <View style={[styles.dropdownContainer, styles.modalDropdown, { top: '120%' }]}>
                <TouchableOpacity style={styles.genderOption} onPress={() => { setSelectedGender('Female'); setGenderDropdownVisible(false); }}>
                  <Text style={[styles.genderIcon, { color: '#FF69B4' }]}>♀️</Text>
                  <Text style={styles.genderLabel}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.genderOption} onPress={() => { setSelectedGender('Male'); setGenderDropdownVisible(false); }}>
                  <Text style={[styles.genderIcon, { color: '#00BFFF' }]}>♂️</Text>
                  <Text style={styles.genderLabel}>Male</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {/* Size Section */}
      <View style={[styles.section, (breedDropdownVisible || genderDropdownVisible) && styles.disabledSection]}>
        <Text style={styles.label}>Size</Text>
        <TouchableOpacity style={styles.button} onPress={() => setSizeDropdownVisible(!sizeDropdownVisible)}>
          <Text style={styles.inputText}>{selectedSize || ' '}</Text>
        </TouchableOpacity>
        {sizeDropdownVisible && (
          <View style={[styles.dropdownContainer, styles.modalDropdown, { top: '120%' }]}>
            <TouchableOpacity style={styles.sizeOption} onPress={() => { setSelectedSize('Small'); setSizeDropdownVisible(false); }}>
              <View style={styles.iconWithLabel}>
                <Image source={icons.dogSizeSmall} resizeMode="contain" style={{ width: 40, height: 40 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizeOption} onPress={() => { setSelectedSize('Medium'); setSizeDropdownVisible(false); }}>
              <View style={styles.iconWithLabel}>
                <Image source={icons.dogSizeMedium} resizeMode="contain" style={{ width: 60, height: 60}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizeOption} onPress={() => { setSelectedSize('Big'); setSizeDropdownVisible(false); }}>
              <View style={styles.iconWithLabel}>
                <Image source={icons.dogSizeBig} resizeMode="contain" style={{ width: 80, height: 80 }} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Skip and Add Buttons */}
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>skip</Text>
      </TouchableOpacity>

      <OnboardingButton title="Add" onPress={handleAddButton}/>
      
    </SafeAreaView>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onboardingBackground,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customHeadline: {
    marginBottom: 30
  },
  section: {
    width: '80%',
    marginBottom: 15,
  },
  disabledSection: {
    pointerEvents: 'none', // Disable other sections when dropdown is visible
  },
  label: {
    color: colors.onboardingMainText,
    fontSize: 16,
    marginBottom: 8,
    marginLeft: '3%'
  },
  button: {
    borderColor: colors.onboardingMainText,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputText: {
    color: colors.onboardingMainText,
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: colors.onboardingMainText,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    width: width*0.7,
    maxHeight: height*0.3,
    zIndex: 2, 
  },
  breedOption: {
    padding: 10,
  },
  optionText: {
    color: colors.onboardingDropdownText,
    fontSize: 16,
  },
  modalDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end', //change here
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
    fontSize: 16,
    color: colors.onboardingDropdownText,
  },
  iconWithLabel: {
  alignItems: 'center', 
  justifyContent: 'flex-start', 
  },
  sizeLabel: {
    marginTop: 5, // Add some space between the image and the text
    fontSize: 16,
    color: colors.onboardingDropdownText,
    textAlign: 'center', // Center the text
  },
  sizeOption: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  skipButton: {
    marginBottom: 50,
  },
  skipText: {
    color: colors.onboardingMainText,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: colors.onboardingButton,
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    bottom: -100,
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

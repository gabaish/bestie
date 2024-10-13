import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { icons } from '../../constants';

const { width, height } = Dimensions.get('window');

const QuestionnaireScreen = ({ navigation, route }) => {
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

  const { dogName } = route.params || {};

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
    navigation.replace('(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nice to meet you, {dogName}!</Text>

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
                <Text style={styles.sizeLabel}>Small</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizeOption} onPress={() => { setSelectedSize('Medium'); setSizeDropdownVisible(false); }}>
              <View style={styles.iconWithLabel}>
                <Image source={icons.dogSizeMedium} resizeMode="contain" style={{ width: 60, height: 60 }} />
                <Text style={styles.sizeLabel}>Medium</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizeOption} onPress={() => { setSelectedSize('Big'); setSizeDropdownVisible(false); }}>
              <View style={styles.iconWithLabel}>
                <Image source={icons.dogSizeBig} resizeMode="contain" style={{ width: 80, height: 80 }} />
                <Text style={styles.sizeLabel}>Big</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Skip and Add Buttons */}
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>skip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213E53',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 30,
    fontWeight: 'bold'
  },
  section: {
    width: width * 0.8,
    marginBottom: 15,
  },
  disabledSection: {
    pointerEvents: 'none', // Disable other sections when dropdown is visible
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
    marginLeft: '3%'
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputText: {
    color: 'white',
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
    zIndex: 1000,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    width: width * 0.75,
    maxHeight: height * 0.3,
    zIndex: 1001, // Higher than overlay
  },
  breedOption: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
  modalDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
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
    color: '#2C3E50',
  },
  iconWithLabel: {
  alignItems: 'center', // Center the items horizontally
  justifyContent: 'flex-start', // Align the text and image vertically
  },
  sizeLabel: {
    marginTop: 5, // Add some space between the image and the text
    fontSize: 16,
    color: '#2C3E50',
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
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: width * 0.8,
    alignItems: 'center',
    bottom: -100,
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

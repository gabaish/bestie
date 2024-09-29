import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // For the calendar date picker
import { Picker } from '@react-native-picker/picker'; // For select-like dropdowns

const { width } = Dimensions.get('window');

const QuestionnaireScreen = ({ navigation }) => {
  const [breedDropdownVisible, setBreedDropdownVisible] = useState(false);
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);

  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  const [dropdownItems, setDropdownItems] = useState(['Labrador', 'Beagle', 'Poodle', 'Golden Retriever', 'German Shepherd']);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState(''); 

  const handleDropdownItemSelect = (item) => {
    setSelectedBreed(item);
    setBreedDropdownVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    setShowDatePicker(false);
    setBirthDate(formattedDate);
  };

  const handleAddButton = () => {
    navigation.replace('(tabs)');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nice to meet you ______</Text>

      {/* Breed Dropdown */}
      <TouchableOpacity style={styles.input} onPress={() => setBreedDropdownVisible(!breedDropdownVisible)}>
        <Text style={styles.inputText}>{selectedBreed || 'Breed'}</Text>
      </TouchableOpacity>

      {breedDropdownVisible && (
        <View style={styles.dropdownItemsContainer}>
          {dropdownItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dropdownItem, selectedBreed === item && styles.selectedDropdownItem]}
              onPress={() => handleDropdownItemSelect(item)}
            >
              <Text style={[styles.dropdownItemText, selectedBreed === item && styles.selectedDropdownItemText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Birth Date Field with Date Picker */}
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputText}>{birthDate || 'Birth date'}</Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Gender Dropdown */}
      <TouchableOpacity style={styles.input} onPress={() => setGenderDropdownVisible(!genderDropdownVisible)}>
        <Text style={styles.inputText}>{selectedGender || 'Gender'}</Text>
      </TouchableOpacity>

      {genderDropdownVisible && (
        <View style={styles.dropdownItemsContainer}>
          <TouchableOpacity
            style={[styles.dropdownItem, selectedGender === 'Male' && styles.selectedDropdownItem]}
            onPress={() => { setSelectedGender('Male'); setGenderDropdownVisible(false); }}
          >
            <Text style={styles.dropdownItemText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropdownItem, selectedGender === 'Female' && styles.selectedDropdownItem]}
            onPress={() => { setSelectedGender('Female'); setGenderDropdownVisible(false); }}
          >
            <Text style={styles.dropdownItemText}>Female</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Size Dropdown */}
      <TouchableOpacity style={styles.input} onPress={() => setSizeDropdownVisible(!sizeDropdownVisible)}>
        <Text style={styles.inputText}>{selectedSize || 'Size'}</Text>
      </TouchableOpacity>

      {sizeDropdownVisible && (
        <View style={styles.dropdownItemsContainer}>
          <TouchableOpacity
            style={[styles.dropdownItem, selectedSize === '< 10kg' && styles.selectedDropdownItem]}
            onPress={() => { setSelectedSize('< 10kg'); setSizeDropdownVisible(false); }}
          >
            <Text style={styles.dropdownItemText}>{'< 10kg'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropdownItem, selectedSize === '10-20kg' && styles.selectedDropdownItem]}
            onPress={() => { setSelectedSize('10-20kg'); setSizeDropdownVisible(false); }}
          >
            <Text style={styles.dropdownItemText}>10-20kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropdownItem, selectedSize === '20-30kg' && styles.selectedDropdownItem]}
            onPress={() => { setSelectedSize('20-30kg'); setSizeDropdownVisible(false); }}
          >
            <Text style={styles.dropdownItemText}>20-30kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropdownItem, selectedSize === '> 30kg' && styles.selectedDropdownItem]}
            onPress={() => { setSelectedSize('> 30kg'); setSizeDropdownVisible(false); }}
          >
            <Text style={styles.dropdownItemText}>{'> 30kg'}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Skip and Add Buttons */}
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>skip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: width * 0.8,
    marginBottom: 20,
  },
  inputText: {
    color: 'white',
    fontSize: 16,
  },
  dropdownItemsContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 10,
    width: width * 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20, // So it's spaced properly below
  },
  dropdownItem: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  selectedDropdownItem: {
    backgroundColor: '#2C3E50',
  },
  selectedDropdownItemText: {
    color: '#FFFFFF',
  },
  skipButton: {
    marginBottom: 20,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  addButton: {
    backgroundColor: '#27AE60',
    padding: 15,
    borderRadius: 25,
    width: width * 0.8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

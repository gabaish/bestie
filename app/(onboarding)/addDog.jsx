import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Alert,SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView , Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

const AddDogScreen = ({ navigation }) => {
  const [dogName, setDogName] = useState('');
  const [dogPhoto, setDogPhoto] = useState(null);

  const pickImage = async () => {
    // Ask the user for permission to access the camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Let the user pick an image from their gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Ensure image was not canceled and get the image URI
    if (!result.canceled && result.assets.length > 0) {
      setDogPhoto(result.assets[0].uri); // Access the `uri` from assets array
    }
  };

  const handleContinue = () => {
    if (!dogName || !dogPhoto) {
      // Show alert if dog name or photo is not provided
      Alert.alert('Incomplete Information', 'Please provide both the dog name and photo.');
    } else {
      navigation.navigate('QuestionnaireScreen', { dogName: dogName });
    }
  };

  const isDisabled = !dogName || !dogPhoto; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
    
      {/* Main Title */}
      <Text style={styles.mainText}>Let’s meet your dog!</Text>

      {/* Image Picker Button */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {dogPhoto ? (
          <Image source={{ uri: dogPhoto }} style={styles.dogImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.plusText}>+</Text>
            <Text style={styles.addText}>Add</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Dog Name Input */}
      <Text style={styles.label}>Dog Name</Text>
      <TextInput
        style={[
          styles.input,
          { fontSize: dogName ? 24 : 16 }, // Increase font size when there's input
        ]}
        placeholder="Enter your dog's name"
        placeholderTextColor="#AAAAAA"
        value={dogName}
        onChangeText={(text)=>setDogName(text)}
      />

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: isDisabled ? '#E2E2E2' : colors.onboardingButton }, // Dynamic background color
        ]}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onboardingBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 32,
    color: colors.onboardingMainText,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: colors.onboardingMainText,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  dogImage: {
    width: 160,
    height: 160,
    borderRadius: 90,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 40,
    color: colors.onboardingMainText,
  },
  addText: {
    fontSize: 16,
    color: colors.onboardingSecondaryText,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.onboardingMainText,
    marginBottom: 20,
  },
  input: {
    width: '50%',
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: colors.onboardingSecondaryText,
    color: 'white',
    marginBottom: 50,
    textAlign: 'center',
    transition: 'fontSize 0.3s', // Add a smooth transition for the font size
  },
  continueButton: {
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    bottom: -100,
  },
  continueButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddDogScreen;

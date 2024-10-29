import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../constants/colors';
import { API_BASE_URL } from '@env';

const RegisterWithEmail = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const validateInputs = () => {
    // Name validation
    if (!name) {
      Alert.alert('Error', 'Name is required.');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      Alert.alert('Error', 'Email is required.');
      return false;
    } else if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    // Password validation
    if (!password) {
      Alert.alert('Error', 'Password is required.');
      return false;
    } else if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters.');
      return false;
    }

    // Password confirmation validation
    if (!passwordConfirm) {
      Alert.alert('Error', 'Please confirm your password.');
      return false;
    } else if (passwordConfirm !== password) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleCreateAccount = async () => {
    if (validateInputs()) {
      console.log('trying to send message to API: ', API_BASE_URL);
      try {
        const response = await fetch(`${API_BASE_URL}/users`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({
              name: name,
              email: email,
              password: password
            }),
          }
        );

        if(response.ok) {
          const data = await response.json();
          console.log('User created successfully:', data);
          navigation.replace('(tabs)');
        }
        else {
          const errorData = await response.json();
          console.error('Error: ', errorData);          
        }
      } catch (error) {
        console.error( 'Network error: ', error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container} >
      <Text style={styles.mainText}>Create Your Bestie Account</Text>
      <Text style={styles.subText}>Let's set up your account with just a few quick details</Text>

      {/* Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      {/* Confirm Password Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password again</Text>
        <TextInput
          style={[
            styles.input,
            passwordConfirm && passwordConfirm === password ? styles.inputValid : null,
          ]}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry={true}
        />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Footer Text */}
      <Text style={styles.footerText}>By registering, you agree to our Terms of Service and Privacy Policy. You may receive updates and notifications related to your account.
      </Text>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterWithEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onboardingBackground,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 32,
    color: colors.onboardingMainText,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: '23%',
  },
  subText: {
    fontSize: 16,
    color: colors.onboardingMainText,
    marginBottom: 30,
    textAlign: 'center',
    width:'80%',
  },
  fieldContainer: {
    width: '80%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.onboardingMainText,
    marginBottom: 5,
  },
  input: {
    borderColor: colors.onboardingMainText,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    color: colors.onboardingMainText,
    fontSize: 16,
  },
  inputValid: {
    borderColor: colors.onboardingButton,
  },
  createButton: {
    backgroundColor: colors.onboardingButton,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginTop: 60,
  },
  createButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: colors.onboardingSecondaryText,
    textAlign: 'center',
    marginTop: 25,
    width:'80%',
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});

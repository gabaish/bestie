import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');

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

  const handleCreateAccount = () => {
    if (validateInputs()) {
      console.log('Account created with:', { name, email, password });
      navigation.replace('(tabs)'); // Navigate to the main app page
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
  );
};

export default RegisterWithEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213E53',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 90,
  },
  subText: {
    fontSize: 16,
    color: '#D0D0D0',
    marginBottom: 30,
    textAlign: 'center',
    width: width * 0.8,
  },
  fieldContainer: {
    width: width * 0.8,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#D0D0D0',
    marginBottom: 5,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    color: 'white',
    fontSize: 16,
  },
  inputValid: {
    borderColor: 'green',
  },
  createButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    borderRadius: 25,
    width: width * 0.8,
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
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    // Implement Apple login logic here
    console.log('Apple login');
  };

  const handleEmailLogin = () => {
    // Navigate to email login screen
    navigation.navigate('EmailLogin');
  };

  const handleAlreadyHaveAccount = () => {
    // Handle "I have an account" press
    console.log('Navigate to login');
  };

  return (
    <View style={styles.container}>
      {/* Main Title */}
      <Text style={styles.mainText}>Text</Text>
      <Text style={styles.subText}>text text text text text</Text>

      {/* Google Login Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Google</Text>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Apple Login Button */}
      <TouchableOpacity style={styles.appleButton} onPress={handleAppleLogin}>
        <Text style={styles.appleButtonText}>Apple</Text>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* OR Text */}
      <Text style={styles.orText}>or</Text>

      {/* Email Login Button */}
      <TouchableOpacity style={styles.emailButton} onPress={handleEmailLogin}>
        <Text style={styles.emailButtonText}>Email</Text>
      </TouchableOpacity>

      {/* Already Have an Account */}
      <TouchableOpacity onPress={handleAlreadyHaveAccount}>
        <Text style={styles.haveAccountText}>I have an account</Text>
      </TouchableOpacity>

      {/* Additional Info Text */}
      <Text style={styles.footerText}>text text text text text text text text text text text</Text>
    </View>
  );
};

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
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#4A708B',
    padding: 15,
    borderRadius: 25,
    width: width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  appleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 25,
    width: width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  appleButtonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  emailButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    padding: 15,
    borderRadius: 25,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emailButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  haveAccountText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default LoginScreen;

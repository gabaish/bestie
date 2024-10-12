import React from 'react';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');

const RegistrationScreen = ({ navigation }) => {

  const handleGoogleLogin = () => {
    navigation.navigate('AddDog'); // Navigate to AddDog screen
  };

  const handleAppleLogin = () => {
    navigation.navigate('AddDog'); // Navigate to AddDog screen
  };

  const handleEmailLogin = () => {
    navigation.navigate('RegisterWithEmail'); // Navigate to AddDog screen
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate('AddDog'); // Navigate to AddDog screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Title */}
      <Text style={styles.mainText}>Come on, let's start</Text>
      <Text style={styles.subText}>First, you'll need to create{"\n"} an account with Bestie.</Text>

      {/* Google Login Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Log in with Google</Text>
        <Image
          source={require('../../assets/icons/registration/google.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Apple Login Button */}
      <TouchableOpacity style={styles.appleButton} onPress={handleAppleLogin}>
        <Text style={styles.appleButtonText}>Log in with Apple</Text>
        <Image
          source={require('../../assets/icons/registration/apple.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* OR Text */}
      <Text style={styles.orText}>or</Text>

      {/* Email Login Button */}
      <TouchableOpacity style={styles.emailButton} onPress={handleEmailLogin}>
        <Text style={styles.emailButtonText}>Register with an email</Text>
         <MaterialIcons name="mail" size={20} color="#F2F2F2"/>
      </TouchableOpacity>

      {/* Already Have an Account */}
      <TouchableOpacity onPress={handleAlreadyHaveAccount}>
        <Text style={styles.haveAccountText}>I have an account</Text>
      </TouchableOpacity>

      {/* Additional Info Text */}
      <Text style={styles.footerText}>By registering, you agree to our Terms of Service and Privacy Policy. You may receive updates and notifications related to your account.
      </Text>
      
    </SafeAreaView>
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
    marginBottom: 20,
    marginTop:70,
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 60,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#4A708B',
    padding: 15,
    paddingHorizontal:20,
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
        alignItems: 'center',

  },
  appleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    paddingHorizontal:20,
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
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    padding: 15,
    paddingHorizontal:20,
    borderRadius: 25,
    width: width * 0.8,
    justifyContent: 'space-between',
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
    paddingHorizontal:30,
    bottom: -70,

  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default RegistrationScreen;

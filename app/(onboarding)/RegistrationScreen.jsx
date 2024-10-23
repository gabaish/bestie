import React from 'react';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import { icons } from '../../constants';

const { width } = Dimensions.get('window');

const RegistrationScreen = ({ navigation }) => {

  const handleNavigation = (navigateTo) => {
    navigation.navigate(navigateTo);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Title */}
      <Text style={styles.mainText}>Come on, let's start</Text>
      <Text style={[styles.subText,styles.headerSubText]}>First, you'll need to create{"\n"} an account with Bestie.</Text>

      {/* Google Login Button */}
      <TouchableOpacity style={[styles.button,styles.googleButton]} onPress={()=>handleNavigation('AddDog')}>
        <Text style={styles.buttonText}>Log in with Google</Text>
        <Image
          source={icons.google}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Apple Login Button */}
      <TouchableOpacity style={[styles.button,styles.appleButton]} onPress={()=>handleNavigation('AddDog')}>
        <Text style={[styles.buttonText,styles.appleButtonText]}>Log in with Apple</Text>
        <Image
          source={icons.apple}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* OR Text */}
      <Text style={[styles.subText,styles.orSubText]}>or</Text>

      {/* Email Login Button */}
      <TouchableOpacity style={[styles.button,styles.emailButton]} onPress={()=>handleNavigation('RegisterWithEmail')}>
        <Text style={styles.buttonText}>Register with an email</Text>
         <MaterialIcons name="mail" size={20} color="#F2F2F2"/>
      </TouchableOpacity>

      {/* Already Have an Account */}
      <TouchableOpacity onPress={()=>handleNavigation('AddDog')}>
        <Text style={[styles.subText,styles.haveAccountSubText]}>I have an account</Text>
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
  },
  mainText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:'18%',
  },
  subText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  headerSubText: {
    marginBottom: 60,
  },
  button: {
    flexDirection:'row',
    padding:15,
    paddingHorizontal:20,
    borderRadius: 25,
    width:'80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  googleButton: {
    backgroundColor: '#4A708B',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  appleButtonText:{
    color:'black'
  },
  appleButton: {
    backgroundColor: 'white',
    marginBottom: 30,
  },
  emailButton: {
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
  },
  orSubText: {
    marginBottom: 20,
  },
  haveAccountSubText: {
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: '4%',
    width:'80%',
    bottom: -70,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default RegistrationScreen;

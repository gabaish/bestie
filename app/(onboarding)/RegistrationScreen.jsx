import React, { useState } from 'react';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, SafeAreaView, Modal, TextInput, TouchableWithoutFeedback, Alert } from 'react-native';
import { icons } from '../../constants';
import { colors } from '../../constants/colors';
import { OnboardingHeadline } from '../../components/onboardingComponents';

const { width } = Dimensions.get('window');

const RegistrationScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigation = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogin = () => {
    if (email && password) {
      closeModal();
      // Add further login logic here, e.g., API request
    } else {
      Alert.alert("Incomplete Information", "Please enter both email and password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Title */}
      <OnboardingHeadline title="Come on, let's start" style={styles.customHeadline} />

      <Text style={[styles.subText, styles.headerSubText]}>
        First, you'll need to create{"\n"} an account with Bestie.
      </Text>

      {/* Google Login Button */}
      <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => handleNavigation('AddDog')}>
        <Text style={styles.buttonText}>Log in with Google</Text>
        <Image source={icons.google} style={styles.icon} />
      </TouchableOpacity>

      {/* Apple Login Button */}
      <TouchableOpacity style={[styles.button, styles.appleButton]} onPress={() => handleNavigation('AddDog')}>
        <Text style={[styles.buttonText, styles.appleButtonText]}>Log in with Apple</Text>
        <Image source={icons.apple} style={styles.icon} />
      </TouchableOpacity>

      {/* OR Text */}
      <Text style={[styles.subText, styles.orSubText]}>or</Text>

      {/* Email Login Button */}
      <TouchableOpacity style={[styles.button, styles.emailButton]} onPress={() => handleNavigation('RegisterWithEmail')}>
        <Text style={styles.buttonText}>Register with an email</Text>
        <MaterialIcons name="mail" size={20} color="#F2F2F2" />
      </TouchableOpacity>

      {/* Already Have an Account */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={[styles.subText, styles.haveAccountSubText]}>I have an account</Text>
      </TouchableOpacity>

      {/* Additional Info Text */}
      <Text style={styles.footerText}>
        By registering, you agree to our Terms of Service and Privacy Policy. You may receive updates and notifications related to your account.
      </Text>

      {/* Login Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Log In</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <MaterialIcons name="email" size={18} color={colors.tabsSecondaryText} style={styles.iconRight} />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                  <FontAwesome5 name="lock" size={18} color={colors.tabsSecondaryText} style={styles.iconRight} />
                </View>

                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Login Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onboardingBackground,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customHeadline: {
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: colors.onboardingMainText,
    textAlign: 'center',
  },
  headerSubText: {
    marginBottom: 60,
  },
  button: {
    flexDirection: 'row',
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%',
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
  appleButtonText: {
    color: 'black',
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
    marginBottom: 50,
  },
  footerText: {
    fontSize: 12,
    color: colors.onboardingSecondaryText,
    textAlign: 'center',
    width: '80%',
    bottom: -70,
  },
  icon: {
    width: 25,
    height: 25,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.onboardingMainText,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#A9A9A9',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.onboardingBackground,
  },
  iconRight: {
    marginLeft: 10, // Adjust for spacing
  },
   forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-start', // Align container to the left
    marginBottom: 30,
    marginStart: 10,
  },
  forgotPasswordText: {
    color: colors.onboardingBackground,
  },
  loginButton: {
    backgroundColor: "#4E95D9",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;

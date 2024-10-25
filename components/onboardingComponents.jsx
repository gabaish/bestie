import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export const OnboardingButton = ({ title, onPress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
};

export const OnboardingHeadline = ({title, style}) => {
    return (
        <Text style={[styles.headline, style]}>{title}</Text>
    );
}


const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.onboardingButton, 
      padding: 15,
      borderRadius: 25,
      position: 'absolute',
      bottom: '10%',
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    headline: {
        fontSize: 32,
        color: colors.onboardingMainText,
        fontWeight: 'bold',
        marginTop:'33%',
    },
    
});
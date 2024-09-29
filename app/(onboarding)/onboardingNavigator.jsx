import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './LandingScreen';
import RegistrationScreen from './RegistrationScreen';
import AddDog from './AddDog';
import QuestionnaireScreen from './QuestionnaireScreen';

const OnboardingStack = createStackNavigator();

const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator initialRouteName="LandingScreen">
            <OnboardingStack.Screen 
                name="LandingScreen" 
                component={LandingScreen} 
                options={{ headerShown: false }} 
            />
            <OnboardingStack.Screen 
                name="RegistrationScreen" 
                component={RegistrationScreen} 
                options={{ headerShown: false }} 
            />
            <OnboardingStack.Screen 
                name="AddDog" 
                component={AddDog} 
                options={{ headerShown: false }} 
            />
            <OnboardingStack.Screen 
                name="QuestionnaireScreen" 
                component={QuestionnaireScreen} 
                options={{ headerShown: false }} 
            />
        </OnboardingStack.Navigator>
    );
};

export default OnboardingNavigator;

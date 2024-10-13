import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './LandingScreen';
import RegistrationScreen from './RegistrationScreen';
import AddDog from './addDog';
import QuestionnaireScreen from './QuestionnaireScreen';
import RegisterWithEmail from './RegisterWithEmail';
=======
import QuestionnaireScreen from './[QuestionnaireScreen]';
>>>>>>> 29bd7834e6bcb5a0a1d4105527f5393c87d9dd42

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
            <OnboardingStack.Screen 
                name="RegisterWithEmail" 
                component={RegisterWithEmail} 
                options={{ headerShown: false }} 
            />
        </OnboardingStack.Navigator>
    );
};

export default OnboardingNavigator;

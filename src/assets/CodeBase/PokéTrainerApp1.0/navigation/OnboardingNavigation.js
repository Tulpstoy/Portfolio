import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingWelcomeScreen from '../screens/OnboardingWelcomeScreen';
import OnboardingFeaturesScreen from '../screens/OnboardingFeaturesScreen';
import OnboardingReadyScreen from '../screens/OnboardingReadyScreen';

const Stack = createNativeStackNavigator();

const OnboardingNavigation = ({ onComplete }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="OnboardingWelcome"
        component={OnboardingWelcomeScreen}
      />
      <Stack.Screen
        name="OnboardingFeatures"
        component={OnboardingFeaturesScreen}
      />
      <Stack.Screen name="OnboardingReady">
        {(props) => <OnboardingReadyScreen {...props} onComplete={onComplete} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default OnboardingNavigation; 
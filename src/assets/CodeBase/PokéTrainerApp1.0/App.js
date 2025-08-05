import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './navigation/MainNavigation';
import OnboardingNavigation from './navigation/OnboardingNavigation';
import PokemonDetailScreen from './screens/PokemonDetailScreen';
import { getOnboardingFlag, setOnboardingFlag } from './services/OnboardingManager';

const RootStack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [appKey, setAppKey] = useState(0);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingFlag = await getOnboardingFlag();
      setShowOnboarding(onboardingFlag !== false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setShowOnboarding(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      await setOnboardingFlag(false);
      setShowOnboarding(false);
    } catch (e) {
      console.error("Failed to save onboarding flag", e);
      setShowOnboarding(false); // Still proceed to app
    }
  };

  const handleReset = async () => {
    try {
      await setOnboardingFlag(true);
      setAppKey(prevKey => prevKey + 1); // Change key to force re-mount
      setShowOnboarding(true);
    } catch (e) {
      console.error("Failed to reset onboarding", e);
    }
  }

  if (isLoading || showOnboarding === null) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6b6b" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer key={appKey}>
        <RootStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1a1a2e',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {showOnboarding ? (
            <RootStack.Screen name="OnboardingNav" options={{ headerShown: false }}>
              {(props) => <OnboardingNavigation {...props} onComplete={handleCompleteOnboarding} />}
            </RootStack.Screen>
          ) : (
            <>
              <RootStack.Screen name="MainApp" options={{ headerShown: false }}>
                {(props) => <MainNavigation {...props} onReset={handleReset} />}
              </RootStack.Screen>
              <RootStack.Screen
                name="PokemonDetail"
                component={PokemonDetailScreen}
                options={({ route }) => ({
                  title: route.params?.pokemonName || 'Pokémon Details',
                })}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
});
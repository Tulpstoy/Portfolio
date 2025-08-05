import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'poketrainer_onboarding';

// set onboarding flag status
export async function setOnboardingFlag(value) {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting onboarding flag:', error);
  }
}

// get onboarding flag
export async function getOnboardingFlag() {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === null ? null : JSON.parse(value);
  } catch (error) {
    console.error('Error getting onboarding flag:', error);
    return null;
  }
} 
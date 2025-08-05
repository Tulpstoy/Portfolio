import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { clearAllData } from '../services/PokemonStorageService';

const SettingsScreen = ({ onReset }) => {
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all favorites and team data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert('Success', 'All data has been cleared.');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Onboarding',
      'Are you sure you want to see the onboarding screens again? This will restart the app.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: onReset
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
          <Text style={styles.settingText}>Clear All Data</Text>
          <Text style={styles.settingDescription}>Remove all favorites and team data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleResetOnboarding}>
          <Text style={styles.settingText}>Reset Onboarding</Text>
          <Text style={styles.settingDescription}>View the onboarding screens again</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>PokéTrainer</Text>
          <Text style={styles.settingDescription}>Version 1.0.0</Text>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Data Source</Text>
          <Text style={styles.settingDescription}>PokéAPI (pokeapi.co)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  settingItem: {
    backgroundColor: '#2a2a3e',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
});

export default SettingsScreen; 
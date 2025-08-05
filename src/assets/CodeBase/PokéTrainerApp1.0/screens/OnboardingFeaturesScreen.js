import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const OnboardingFeaturesScreen = ({ navigation }) => {
  const features = [
    {
      icon: '🔍',
      title: 'Browse Pokémon',
      description: 'Explore all Pokémon from every generation with detailed information',
    },
    {
      icon: '❤️',
      title: 'Favorites',
      description: 'Save your favorite Pokémon for quick access',
    },
    {
      icon: '⚔️',
      title: 'Team Builder',
      description: 'Create and manage your perfect Pokémon team',
    },
    {
      icon: '📊',
      title: 'Detailed Stats',
      description: 'View comprehensive stats, abilities, and type information',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover Features</Text>
          <Text style={styles.subtitle}>
            Everything you need to become a Pokémon master
          </Text>
        </View>
        
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OnboardingReady')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    flex: 1,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  featureIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingFeaturesScreen; 
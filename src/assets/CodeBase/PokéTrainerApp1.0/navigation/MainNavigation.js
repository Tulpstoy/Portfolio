import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import TeamScreen from '../screens/TeamScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainNavigation = ({ onReset }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconText;

          if (route.name === 'Home') {
            iconText = '🏠';
          } else if (route.name === 'Team') {
            iconText = '⚔️';
          } else if (route.name === 'Favorites') {
            iconText = '❤️';
          } else if (route.name === 'Settings') {
            iconText = '⚙️';
          }

          return <Text style={{ fontSize: size, color }}>{iconText}</Text>;
        },
        tabBarActiveTintColor: '#ff6b6b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#333',
        },
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Team" 
        component={TeamScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" options={{ headerShown: false }}>
        {(props) => <SettingsScreen {...props} onReset={onReset} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainNavigation; 
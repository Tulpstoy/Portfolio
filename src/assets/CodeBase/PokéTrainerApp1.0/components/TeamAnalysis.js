import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '@rneui/themed';

const TeamAnalysis = ({ analysis }) => {
  const { theme } = useTheme();

  const renderTypeList = (types, title) => (
    <View style={styles.analysisSection}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
      <View style={styles.typeList}>
        {Object.entries(types)
          .sort(([,a], [,b]) => b - a)
          .map(([type, count]) => (
            <View key={type} style={[styles.typeItem, { backgroundColor: theme.typeColors[type] || theme.colors.grey }]}>
              <Text style={styles.typeText}>{type.toUpperCase()}</Text>
              {count && <Text style={styles.effectiveness}>{count}×</Text>}
            </View>
          ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.mode === 'light' ? theme.colors.white : 'rgba(255, 255, 255, 0.05)'}]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Team Analysis</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.analysisContainer}>
          {Object.keys(analysis.weaknesses).length > 0 && 
            renderTypeList(analysis.weaknesses, 'Weaknesses')}
          
          {Object.keys(analysis.resistances).length > 0 && 
            renderTypeList(analysis.resistances, 'Resistances')}
          
          {Object.keys(analysis.immunities).length > 0 && 
            renderTypeList(analysis.immunities, 'Immunities')}
          
          {Object.keys(analysis.totalVulnerabilities).length > 0 && (
             renderTypeList(analysis.totalVulnerabilities, 'Uncovered')
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  analysisContainer: {
    flexDirection: 'row',
  },
  analysisSection: {
    marginRight: 20,
    minWidth: 120,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  typeList: {
    alignItems: 'center',
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
    minWidth: 80,
    justifyContent: 'space-between',
  },
  typeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  effectiveness: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 10,
    marginLeft: 5,
  },
});

export default TeamAnalysis; 
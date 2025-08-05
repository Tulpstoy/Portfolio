import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const GenerationFilter = ({ selectedGeneration, onSelectGeneration, onSelectSpecialForm, selectedSpecialForm }) => {
  const generations = [
    { id: '1', name: 'Gen 1' },
    { id: '2', name: 'Gen 2' },
    { id: '3', name: 'Gen 3' },
    { id: '4', name: 'Gen 4' },
    { id: '5', name: 'Gen 5' },
    { id: '6', name: 'Gen 6' },
    { id: '7', name: 'Gen 7' },
    { id: '8', name: 'Gen 8' },
    { id: '9', name: 'Gen 9' },
    { id: 'all', name: 'All' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {generations.map((gen) => (
          <TouchableOpacity
            key={gen.id}
            style={[
              styles.filterButton,
              selectedGeneration === gen.id && styles.selectedButton
            ]}
            onPress={() => onSelectGeneration(gen.id)}
          >
            <Text style={[
              styles.filterText,
              selectedGeneration === gen.id && styles.selectedText
            ]}>
              {gen.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  filterButton: {
    backgroundColor: '#2a2a3e',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  selectedButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  filterText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default GenerationFilter; 
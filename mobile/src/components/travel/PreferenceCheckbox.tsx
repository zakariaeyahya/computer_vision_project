import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type PreferenceType = 'CULTURE' | 'NATURE' | 'GASTRONOMY';

interface PreferenceCheckboxProps {
  preferences: PreferenceType[];
  onToggle: (pref: PreferenceType) => void;
}

const preferenceOptions = [
  {
    value: 'CULTURE' as PreferenceType,
    emoji: '🏛️',
    label: 'Culture et Histoire',
    description: 'Médinas, musées, sites historiques',
  },
  {
    value: 'NATURE' as PreferenceType,
    emoji: '⛰️',
    label: 'Nature et Sport',
    description: 'Randonnées, plages, montagnes',
  },
  {
    value: 'GASTRONOMY' as PreferenceType,
    emoji: '🍽️',
    label: 'Gastronomie',
    description: 'Restaurants, marchés, cuisine locale',
  },
];

const PreferenceCheckbox: React.FC<PreferenceCheckboxProps> = ({
  preferences,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Préférences</Text>
      <Text style={styles.sublabel}>Sélectionnez vos centres d&apos;intérêt</Text>

      {preferenceOptions.map((option) => {
        const isSelected = preferences.includes(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.checkbox, isSelected && styles.checkboxActive]}
            onPress={() => onToggle(option.value)}
          >
            <View
              style={[
                styles.checkboxBox,
                isSelected && styles.checkboxBoxActive,
              ]}
            >
              {isSelected && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxEmoji}>{option.emoji}</Text>
              <View>
                <Text style={styles.checkboxLabel}>{option.label}</Text>
                <Text style={styles.checkboxDescription}>
                  {option.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  sublabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    marginTop: -8,
  },
  checkbox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  checkboxActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: '#2C5F2D',
    borderColor: '#2C5F2D',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  checkboxDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
});

export default PreferenceCheckbox;


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DestinationPickerProps {
  destination: string;
  onPress?: () => void;
}

const DestinationPicker: React.FC<DestinationPickerProps> = ({
  destination,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Destination</Text>
      <TouchableOpacity style={styles.dropdown} onPress={onPress}>
        <Text style={styles.dropdownText}>📍 {destination}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>
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
  dropdown: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default DestinationPicker;


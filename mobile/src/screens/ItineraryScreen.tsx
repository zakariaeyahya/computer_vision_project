import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItineraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itinéraire</Text>
      <Text style={styles.text}>Page en cours de développement...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#6B7280',
  },
});


import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Smart Travel Guide</Text>
        <Text style={styles.subtitle}>Découvrez le Maroc Autrement</Text>
        <Text style={styles.description}>
          Planifiez votre voyage intelligent et durable
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destinations Populaires</Text>
        <View style={styles.cardGrid}>
          <View style={styles.card}>
            <View style={styles.cardImage} />
            <Text style={styles.cardTitle}>Tétouan</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardImage} />
            <Text style={styles.cardTitle}>Tanger</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardImage} />
            <Text style={styles.cardTitle}>Chefchaouen</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    padding: 24,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    paddingVertical: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C5F2D',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardGrid: {
    gap: 16,
  },
  card: {
    marginBottom: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
});


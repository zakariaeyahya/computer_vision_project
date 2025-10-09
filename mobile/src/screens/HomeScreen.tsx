import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#2C5F2D', '#97BC62']}
        style={styles.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.heroEmoji}>🕌</Text>
        <Text style={styles.title}>Smart Travel Guide</Text>
        <Text style={styles.subtitle}>Découvrez le Maroc Autrement</Text>
        <Text style={styles.description}>
          Planifiez votre voyage intelligent et durable
        </Text>
        <TouchableOpacity style={styles.heroButton}>
          <Text style={styles.heroButtonText}>Commencer un voyage</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Destinations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destination Populaire</Text>
        <Text style={styles.sectionSubtitle}>Explorez la perle du nord du Maroc</Text>
        
        {/* Tétouan Card */}
        <TouchableOpacity style={styles.tetouanCard} activeOpacity={0.9}>
          <LinearGradient
            colors={['#C41E3A', '#8B0000']}
            style={styles.tetouanGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Image placeholder - vous ajouterez votre vraie image ici */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/destinations/tetouan.jpg')}
                style={styles.tetouanImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(196, 30, 58, 0.9)']}
                style={styles.imageOverlay}
              />
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.cityBadge}>
                <Text style={styles.cityBadgeText}>📍 Nord du Maroc</Text>
              </View>
              
              <Text style={styles.cityName}>Tétouan</Text>
              <Text style={styles.cityNickname}>La Colombe Blanche</Text>
              
              <View style={styles.cityFeatures}>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🏛️</Text>
                  <Text style={styles.featureText}>Médina UNESCO</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🎨</Text>
                  <Text style={styles.featureText}>Art & Culture</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🌊</Text>
                  <Text style={styles.featureText}>Proche de la mer</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.exploreButton}
                onPress={() => navigation.navigate('TetouanDetails' as never)}
              >
                <Text style={styles.exploreButtonText}>Explorer Tétouan</Text>
                <Text style={styles.exploreButtonIcon}>→</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Pourquoi Tétouan ?</Text>
          <Text style={styles.infoText}>
            Tétouan, surnommée "La Colombe Blanche", est une ville authentique du nord du Maroc. 
            Sa médina, classée au patrimoine mondial de l'UNESCO, offre une expérience culturelle unique.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  // Hero Section
  hero: {
    padding: 32,
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
  },
  heroButtonText: {
    color: '#2C5F2D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Section
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  
  // Tétouan Card
  tetouanCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#C41E3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tetouanGradient: {
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  tetouanImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  cardContent: {
    padding: 20,
  },
  cityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  cityBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cityNickname: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  cityFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  feature: {
    flex: 1,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  exploreButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
  },
  exploreButtonText: {
    color: '#C41E3A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exploreButtonIcon: {
    color: '#C41E3A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Info Section
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
});


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { TANGER_PLACES } from '../../mock';

const { width, height } = Dimensions.get('window');
const PLACES_TO_VISIT = TANGER_PLACES;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tangerImage = require('../../assets/images/destinations/tanger.webp') as ImageSourcePropType;

export default function TangerDetailsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image avec overlay */}
      <View style={styles.heroContainer}>
        <Image
          source={tangerImage}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(30, 64, 175, 0.8)', '#1E40AF']}
          style={styles.heroOverlay}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <View style={styles.locationBadge}>
              <Text style={styles.locationEmoji}>📍</Text>
              <Text style={styles.locationText}>Nord du Maroc</Text>
            </View>
            <Text style={styles.heroTitle}>Tanger</Text>
            <Text style={styles.heroSubtitle}>La Perle du Détroit</Text>
            
            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🌊</Text>
                <Text style={styles.statText}>Détroit</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🏰</Text>
                <Text style={styles.statText}>Kasbah</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🎭</Text>
                <Text style={styles.statText}>Culture</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Découvrez Tanger</Text>
          <Text style={styles.description}>
            Tanger, la &quot;Perle du Détroit&quot;, est une ville cosmopolite unique où l&quot;Europe et l&quot;Afrique se rencontrent. 
            Située entre la mer Méditerranée et l&quot;océan Atlantique, elle a toujours été un carrefour culturel fascinant.
          </Text>
        </View>

        {/* Points forts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points Forts</Text>
          
          <View style={styles.highlightsGrid}>
            <View style={styles.highlightCard}>
              <LinearGradient
                colors={['#1E40AF', '#3B82F6']}
                style={styles.highlightGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.highlightIcon}>🌊</Text>
                <Text style={styles.highlightTitle}>Cap Spartel</Text>
                <Text style={styles.highlightDescription}>
                  Point de rencontre Atlantique-Méditerranée
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.highlightCard}>
              <LinearGradient
                colors={['#7C3AED', '#A78BFA']}
                style={styles.highlightGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.highlightIcon}>🏰</Text>
                <Text style={styles.highlightTitle}>Kasbah</Text>
                <Text style={styles.highlightDescription}>
                  Quartier historique avec vue panoramique
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.highlightCard}>
              <LinearGradient
                colors={['#DC2626', '#EF4444']}
                style={styles.highlightGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.highlightIcon}>🎭</Text>
                <Text style={styles.highlightTitle}>Patrimoine</Text>
                <Text style={styles.highlightDescription}>
                  Histoire cosmopolite unique
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.highlightCard}>
              <LinearGradient
                colors={['#059669', '#10B981']}
                style={styles.highlightGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.highlightIcon}>🏖️</Text>
                <Text style={styles.highlightTitle}>Plages</Text>
                <Text style={styles.highlightDescription}>
                  Magnifiques plages urbaines
                </Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Lieux à visiter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lieux à Visiter</Text>
          
          {PLACES_TO_VISIT.map((place, index) => (
            <TouchableOpacity key={index} style={styles.placeCard} activeOpacity={0.8}>
              <View style={styles.placeIconContainer}>
                <Text style={styles.placeIcon}>{place.icon}</Text>
              </View>
              <View style={styles.placeContent}>
                <Text style={styles.placeTitle}>{place.name}</Text>
                <Text style={styles.placeDescription}>{place.description}</Text>
                <View style={styles.placeMeta}>
                  <Text style={styles.placeMetaText}>⏱️ {place.duration}</Text>
                  <Text style={styles.placeMetaText}>💰 {place.price}</Text>
                </View>
              </View>
              <Text style={styles.placeArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Informations pratiques */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Pratiques</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🗓️</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Meilleure période</Text>
                <Text style={styles.infoValue}>Toute l&quot;année, idéal Avril-Octobre</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>💰</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Budget moyen/jour</Text>
                <Text style={styles.infoValue}>400-700 DH</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>✈️</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Aéroport</Text>
                <Text style={styles.infoValue}>Aéroport Ibn Battouta (15 km du centre)</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🗣️</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Langues</Text>
                <Text style={styles.infoValue}>Arabe, Français, Espagnol, Anglais</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('StartTravel' as never)}
        >
          <LinearGradient
            colors={['#2C5F2D', '#97BC62']}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.ctaIcon}>✈️</Text>
            <Text style={styles.ctaText}>Planifier mon voyage à Tanger</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  // Hero
  heroContainer: {
    height: height * 0.5,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  locationEmoji: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 22,
    color: '#FFFFFF',
    opacity: 0.95,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 18,
  },
  statText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  // Content
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 26,
  },

  // Highlights
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  highlightGradient: {
    padding: 20,
    minHeight: 140,
  },
  highlightIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  highlightDescription: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.95,
    lineHeight: 18,
  },

  // Places
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  placeIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  placeIcon: {
    fontSize: 32,
  },
  placeContent: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  placeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  placeMetaText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  placeArrow: {
    fontSize: 28,
    color: '#D1D5DB',
    marginLeft: 8,
  },

  // Info Card
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  infoIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },

  // CTA
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#2C5F2D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  ctaIcon: {
    fontSize: 24,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});


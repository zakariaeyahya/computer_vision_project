import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { DESTINATIONS, TETOUAN_PLACES, TANGER_PLACES, CHEFCHAOUEN_PLACES, Place } from '../../mock';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

type DestinationDetailsRouteProp = RouteProp<RootStackParamList, 'DestinationDetails'>;

// Mapping des destinations aux lieux et informations pratiques
const DESTINATION_DATA = {
  'Tétouan': {
    places: TETOUAN_PLACES,
    highlights: [
      {
        icon: '🏛️',
        title: 'Médina UNESCO',
        description: 'Architecture andalouse préservée',
        colors: ['#C41E3A', '#8B0000'] as [string, string],
      },
      {
        icon: '🎨',
        title: 'Art & Artisanat',
        description: 'Célèbre pour ses zellige et broderies',
        colors: ['#1E40AF', '#3B82F6'] as [string, string],
      },
      {
        icon: '🌊',
        title: 'Plages à Proximité',
        description: 'Martil et M"diq à 10km',
        colors: ['#059669', '#10B981'] as [string, string],
      },
      {
        icon: '🍽️',
        title: 'Gastronomie',
        description: 'Cuisine andalouse authentique',
        colors: ['#DC2626', '#EF4444'] as [string, string],
      },
    ],
    practicalInfo: [
      { icon: '🗓️', label: 'Meilleure période', value: 'Mars à Juin, Septembre à Novembre' },
      { icon: '💰', label: 'Budget moyen/jour', value: '300-500 DH' },
      { icon: '🚗', label: 'Accès depuis Tanger', value: '1h en voiture (60 km)' },
      { icon: '🗣️', label: 'Langues', value: 'Arabe, Espagnol, Français' },
    ],
  },
  'Tanger': {
    places: TANGER_PLACES,
    highlights: [
      {
        icon: '🌊',
        title: 'Cap Spartel',
        description: 'Point de rencontre Atlantique-Méditerranée',
        colors: ['#1E40AF', '#3B82F6'] as [string, string],
      },
      {
        icon: '🏰',
        title: 'Kasbah',
        description: 'Quartier historique avec vue panoramique',
        colors: ['#7C3AED', '#A78BFA'] as [string, string],
      },
      {
        icon: '🎭',
        title: 'Patrimoine',
        description: 'Histoire cosmopolite unique',
        colors: ['#DC2626', '#EF4444'] as [string, string],
      },
      {
        icon: '🏖️',
        title: 'Plages',
        description: 'Magnifiques plages urbaines',
        colors: ['#059669', '#10B981'] as [string, string],
      },
    ],
    practicalInfo: [
      { icon: '🗓️', label: 'Meilleure période', value: 'Toute l"année, idéal Avril-Octobre' },
      { icon: '💰', label: 'Budget moyen/jour', value: '400-700 DH' },
      { icon: '✈️', label: 'Aéroport', value: 'Aéroport Ibn Battouta (15 km du centre)' },
      { icon: '🗣️', label: 'Langues', value: 'Arabe, Français, Espagnol, Anglais' },
    ],
  },
  'Chefchaouen': {
    places: CHEFCHAOUEN_PLACES,
    highlights: [
      {
        icon: '🔵',
        title: 'Ville Bleue',
        description: 'Ruelles entièrement peintes en bleu',
        colors: ['#2563EB', '#60A5FA'] as [string, string],
      },
      {
        icon: '⛰️',
        title: 'Randonnées',
        description: 'Sentiers dans les montagnes du Rif',
        colors: ['#059669', '#10B981'] as [string, string],
      },
      {
        icon: '📸',
        title: 'Photographie',
        description: 'Paradis des photographes',
        colors: ['#7C3AED', '#A78BFA'] as [string, string],
      },
      {
        icon: '🛍️',
        title: 'Artisanat',
        description: 'Tissage et produits locaux',
        colors: ['#DC2626', '#EF4444'] as [string, string],
      },
    ],
    practicalInfo: [
      { icon: '🗓️', label: 'Meilleure période', value: 'Avril-Juin, Septembre-Novembre' },
      { icon: '💰', label: 'Budget moyen/jour', value: '250-400 DH' },
      { icon: '🚗', label: 'Accès', value: '2h30 depuis Tanger, 4h depuis Fès' },
      { icon: '⛰️', label: 'Altitude', value: '600 mètres' },
    ],
  },
};

export default function DestinationDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<DestinationDetailsRouteProp>();
  const { destinationName } = route.params;

  // Trouver la destination dans le mock
  const destination = DESTINATIONS.find(d => d.name === destinationName);

  if (!destination) {
    return null;
  }

  const destinationData = DESTINATION_DATA[destination.name as keyof typeof DESTINATION_DATA];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image avec overlay */}
      <View style={styles.heroContainer}>
        <Image
          source={destination.image}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', `${destination.colors[0]}CC`, destination.colors[0]]}
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
              <Text style={styles.locationText}>{destination.location}</Text>
            </View>
            <Text style={styles.heroTitle}>{destination.name}</Text>
            <Text style={styles.heroSubtitle}>{destination.nickname}</Text>

            <View style={styles.heroStats}>
              {destination.features.map((feature, index) => (
                <React.Fragment key={index}>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>{feature.icon}</Text>
                    <Text style={styles.statText}>{feature.text}</Text>
                  </View>
                  {index < destination.features.length - 1 && (
                    <View style={styles.statDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        {/* Why Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why {destination.name}?</Text>
          <Text style={styles.description}>
            {destination.description}
          </Text>
        </View>

        {/* Points forts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points Forts</Text>

          <View style={styles.highlightsGrid}>
            {destinationData.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightCard}>
                <LinearGradient
                  colors={highlight.colors}
                  style={styles.highlightGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.highlightIcon}>{highlight.icon}</Text>
                  <Text style={styles.highlightTitle}>{highlight.title}</Text>
                  <Text style={styles.highlightDescription}>
                    {highlight.description}
                  </Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Lieux à visiter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lieux à Visiter</Text>

          {destinationData.places.map((place: Place, index: number) => (
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
            {destinationData.practicalInfo.map((info, index) => (
              <React.Fragment key={index}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>{info.icon}</Text>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>{info.label}</Text>
                    <Text style={styles.infoValue}>{info.value}</Text>
                  </View>
                </View>
                {index < destinationData.practicalInfo.length - 1 && (
                  <View style={styles.infoDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.8}
          onPress={() => {
            // @ts-expect-error - Navigation typing to be fixed
            navigation.navigate('MainTabs', {
              screen: 'StartTravel',
              params: { preselectedDestination: destination.name }
            });
          }}
        >
          <LinearGradient
            colors={['#2C5F2D', '#97BC62']}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.ctaIcon}>✈️</Text>
            <Text style={styles.ctaText}>Planifier mon voyage à {destination.name}</Text>
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

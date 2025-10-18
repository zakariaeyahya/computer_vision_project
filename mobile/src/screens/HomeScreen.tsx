import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { DESTINATIONS } from '../../mock/destinations';
import { ITINERARIES_BY_DESTINATION } from '../../mock/itinerary';
import { useTheme } from '../context';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'Culture', emoji: '◉', bgColor: '#C1272D', textColor: '#FFFFFF' },
  { id: '2', name: 'Nature', emoji: '✦', bgColor: '#F4E9D8', textColor: '#1A1A1A' },
  { id: '3', name: 'Plage', emoji: '◐', bgColor: '#FFF4E6', textColor: '#1A1A1A' },
  { id: '4', name: 'Montagne', emoji: '△', bgColor: '#E8E4DD', textColor: '#1A1A1A' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors, isDark, theme, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Culture');

  // Fonction pour calculer le prix par nuit
  const getPricePerNight = (destinationName: string) => {
    const itinerary = ITINERARIES_BY_DESTINATION[destinationName];
    if (itinerary) {
      return Math.round(itinerary.budget / itinerary.duration / 10) * 10;
    }
    return 80;
  };

  // Fonction pour générer un score écologique aléatoire
  const getEcoScore = () => {
    return 85 + Math.floor(Math.random() * 10);
  };

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoIconContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)' }]}>
              <Text style={styles.logoIcon}>✦</Text>
            </View>
            <Text style={styles.logoText}>Smart Travel Guide</Text>
          </View>
          
          {/* Theme Toggle Button */}
          <TouchableOpacity 
            style={styles.themeToggle}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Feather 
              name={isDark ? 'sun' : 'moon'} 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>

          <View style={[styles.dropdownContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)' }]}>
            <Text style={styles.dropdownText}>Découvrez le Maroc Durable ▼</Text>
          </View>
          <Text style={styles.subtitle}>
            Votre compagnon IA pour un tourisme responsable
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* BARRE DE RECHERCHE */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.searchIcon, { color: colors.textSecondary }]}>⌕</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Où souhaitez-vous aller ?"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* BOUTONS PRINCIPAUX */}
        <View style={styles.buttonsContainer}>
          {/* Ligne 1: 2 boutons côte à côte */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.mainButton, styles.exploreButton]}
              onPress={() => navigation.navigate('Map' as never)}
            >
              <Text style={styles.buttonIcon}>◈</Text>
              <Text style={styles.buttonText}>Explorer le{'\n'}Maroc</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mainButton, styles.planButton]}
              onPress={() =>
                navigation.navigate('MainTabs' as never, { screen: 'StartTravel' } as never)
              }
            >
              <Text style={styles.buttonIcon}>✧</Text>
              <Text style={styles.buttonText}>Planifier IA</Text>
            </TouchableOpacity>
          </View>

          {/* Ligne 2: 1 bouton pleine largeur */}
          <TouchableOpacity style={styles.eventsButton}>
            <Text style={styles.eventsButtonText}>◷ Événements à venir</Text>
          </TouchableOpacity>
        </View>

        {/* FILTRES PAR CATÉGORIE */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.name;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isActive ? '#C1272D' : category.bgColor,
                    borderColor: isActive ? '#C1272D' : '#E8DFD0',
                  },
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isActive ? '#FFFFFF' : category.textColor,
                    },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* SECTION "Destinations Durables" */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Destinations Durables</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>Voir tout ›</Text>
          </TouchableOpacity>
        </View>

        {/* CARTES DE DESTINATIONS */}
        {DESTINATIONS.map((destination) => {
          const pricePerNight = getPricePerNight(destination.name);
          const ecoScore = getEcoScore();

          return (
            <TouchableOpacity
              key={destination.id}
              style={[styles.destinationCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('DestinationDetails' as never, {
                  destinationName: destination.name,
                } as never)
              }
            >
              {/* Image avec overlay */}
              <View style={styles.imageContainer}>
                <Image source={destination.image} style={styles.destinationImage} />

                {/* Badge écologique */}
                <View style={[styles.ecoBadge, { backgroundColor: colors.success }]}>
                  <Text style={styles.ecoBadgeText}>✦ {ecoScore}%</Text>
                </View>

                {/* Rating */}
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>★ 4.8</Text>
                </View>
              </View>

              {/* Contenu de la carte */}
              <View style={styles.cardContent}>
                {/* Localisation */}
                <Text style={[styles.location, { color: colors.textSecondary }]}>◉ {destination.location}, Maroc</Text>

                {/* Nom de la destination */}
                <Text style={[styles.destinationName, { color: colors.text }]}>{destination.name}</Text>

                {/* Description */}
                <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
                  {destination.description}
                </Text>

                {/* Footer: Prix + Bouton */}
                <View style={styles.cardFooter}>
                  <Text style={[styles.price, { color: colors.text }]}>{pricePerNight}€/nuit</Text>
                  <TouchableOpacity
                    style={[styles.discoverButton, { backgroundColor: colors.accent }]}
                    onPress={() =>
                      navigation.navigate('DestinationDetails' as never, {
                        destinationName: destination.name,
                      } as never)
                    }
                  >
                    <Text style={[styles.discoverButtonText, { color: isDark ? '#1A1A1A' : '#1A1A1A' }]}>Découvrir ›</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },

  // HEADER
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD0',
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#C1272D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  themeToggle: {
    position: 'absolute',
    top: 12,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  dropdownContainer: {
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dropdownText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },

  // CONTENT CONTAINER
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // BARRE DE RECHERCHE
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },

  // BOUTONS PRINCIPAUX
  buttonsContainer: {
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  mainButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButton: {
    backgroundColor: '#C1272D',
  },
  planButton: {
    backgroundColor: '#006233',
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  eventsButton: {
    backgroundColor: '#006233',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventsButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // FILTRES PAR CATÉGORIE
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    gap: 12,
  },
  categoryChip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 90,
    borderWidth: 1,
    borderColor: '#E8DFD0',
  },
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: '300',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // SECTION HEADER
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  viewAllText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  // CARTES DE DESTINATIONS
  destinationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ecoBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 98, 51, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ecoBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  cardContent: {
    padding: 16,
  },
  location: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  discoverButton: {
    backgroundColor: '#C1272D',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  discoverButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

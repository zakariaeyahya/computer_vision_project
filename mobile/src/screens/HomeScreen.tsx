import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { DESTINATIONS } from '../../mock/destinations';
import { ITINERARIES_BY_DESTINATION } from '../../mock/itinerary';
import { useTheme } from '../context';
import { homeScreenStyles as styles } from '../styles/homeScreenStyles';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'Culture', icon: 'bank', bgColor: '#C1272D', textColor: '#FFFFFF' },
  { id: '2', name: 'Nature', icon: 'nature', bgColor: '#F4E9D8', textColor: '#1A1A1A' },
  { id: '3', name: 'Plage', icon: 'beach', bgColor: '#FFF4E6', textColor: '#1A1A1A' },
  { id: '4', name: 'Montagne', icon: 'image-filter-hdr', bgColor: '#E8E4DD', textColor: '#1A1A1A' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colors, isDark, theme, setTheme } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Culture']);

  // Helper non typé pour éviter les erreurs TS avec navigate tuples
  const navigateTo = (name: string, params?: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigation as any).navigate(name, params as any);
  };

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
              <MaterialCommunityIcons name="star-four-points" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.logoText}>Smart Travel Guide</Text>
          </View>
          
          {/* Theme Toggle Button */}
          <TouchableOpacity 
            style={styles.themeToggle}
            onPress={toggleTheme}
            activeOpacity={0.9}
          >
            <Feather 
              name={isDark ? 'sun' : 'moon'} 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
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
              onPress={() => navigateTo('Map')}
            >
              <Text style={styles.buttonIcon}>◈</Text>
              <Text style={styles.buttonText}>Explorer le{'\n'}Maroc</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mainButton, styles.planButton]}
              onPress={() => navigateTo('MainTabs', { screen: 'StartTravel' })}
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
            const isActive = selectedCategories.includes(category.name);
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
                onPress={() => {
                  setSelectedCategories((prev) =>
                    prev.includes(category.name)
                      ? prev.filter((c) => c !== category.name)
                      : [...prev, category.name]
                  );
                }}
              >
                <MaterialCommunityIcons 
                  name={category.icon as any} 
                  size={18} 
                  color={isActive ? '#FFFFFF' : category.textColor} 
                />
                {isActive && (
                  <View style={styles.categoryCheck}>
                    <Feather name="check" size={10} color="#FFFFFF" />
                  </View>
                )}
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Destinations Populaires</Text>
        </View>

        {/* CARTES DE DESTINATIONS - Carrousel horizontal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationsRow}
        >
          {DESTINATIONS.map((destination, index) => {
            const pricePerNight = getPricePerNight(destination.name);
            const ecoScore = getEcoScore();

            return (
              <TouchableOpacity
                key={destination.id}
                style={[
                  styles.destinationCardHorizontal,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  index === DESTINATIONS.length - 1 ? { marginRight: 20 } : null,
                ]}
                activeOpacity={0.9}
                onPress={() => navigateTo('DestinationDetails', { destinationName: destination.name })}
              >
                {/* Image avec overlay */}
                <View style={styles.imageContainer}>
                  <Image source={destination.image} style={styles.destinationImage} />

                  {/* Badge écologique */}
                  <View style={[styles.ecoBadge, { backgroundColor: colors.success }]}>
                    <MaterialCommunityIcons name="leaf" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
                    <Text style={styles.ecoBadgeText}>{ecoScore}%</Text>
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
                      onPress={() => navigateTo('DestinationDetails', { destinationName: destination.name })}
                    >
                      <Text style={[styles.discoverButtonText, { color: isDark ? '#1A1A1A' : '#1A1A1A' }]}>Découvrir ›</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
}


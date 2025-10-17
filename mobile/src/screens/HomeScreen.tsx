import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList, TextInput, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { DESTINATIONS } from '../../mock';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'Beach', emoji: '🏖️' },
  { id: '2', name: 'Mountain', emoji: '⛰️' },
  { id: '3', name: 'City', emoji: '🏙️' },
  { id: '4', name: 'Forest', emoji: '🌲' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Beach');
  const flatListRef = useRef<FlatList>(null);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🤖</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations with AI..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.name && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedTitle}>Recommended for You</Text>
          <View style={styles.dotsContainer}>
            {DESTINATIONS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Featured Destinations Carousel */}
        <FlatList
          ref={flatListRef}
          data={DESTINATIONS}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const scrollPosition = event.nativeEvent.contentOffset.x;
            const index = Math.round(scrollPosition / width);
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.featuredCarouselItem}>
              <ImageBackground
                source={item.image}
                style={styles.featuredCard}
                imageStyle={styles.featuredCardImage}
              >
                <View style={styles.featuredCardOverlay}>
                  <View style={styles.featuredCardTop}>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>⭐ 4.9</Text>
                    </View>
                    <TouchableOpacity style={styles.favoriteButton}>
                      <Text style={styles.favoriteIcon}>♡</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.featuredCardBottom}>
                    <View style={styles.featuredCardInfo}>
                      <Text style={styles.featuredCardTitle}>{item.name}</Text>
                      <Text style={styles.featuredCardLocation}>📍 {item.location}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.arrowButtonYellow}
                      onPress={() => navigation.navigate('DestinationDetails' as never, { destinationName: item.name } as never)}
                    >
                      <Text style={styles.arrowButtonText}>→</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        />

        {/* Navigation Arrows */}
        {DESTINATIONS.length > 1 && (
          <View style={styles.arrowsContainer}>
            <TouchableOpacity
              style={[styles.arrowButton, activeIndex === 0 && styles.arrowDisabled]}
              onPress={() => {
                if (activeIndex > 0) {
                  flatListRef.current?.scrollToIndex({
                    index: activeIndex - 1,
                    animated: true,
                  });
                }
              }}
              disabled={activeIndex === 0}
            >
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.arrowButton,
                activeIndex === DESTINATIONS.length - 1 && styles.arrowDisabled,
              ]}
              onPress={() => {
                if (activeIndex < DESTINATIONS.length - 1) {
                  flatListRef.current?.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                  });
                }
              }}
              disabled={activeIndex === DESTINATIONS.length - 1}
            >
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#F9FAFB',
  },
  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  // Categories
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryChipActive: {
    backgroundColor: '#FFD700',
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#1F2937',
  },
  // Recommended Section
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  // Featured Card
  featuredCarouselItem: {
    width: width - 40,
    paddingHorizontal: 0,
  },
  featuredCard: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredCardImage: {
    borderRadius: 20,
  },
  featuredCardOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  featuredCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 22,
    color: '#EF4444',
  },
  featuredCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  featuredCardInfo: {
    flex: 1,
  },
  featuredCardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredCardLocation: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  arrowButtonYellow: {
    width: 48,
    height: 48,
    backgroundColor: '#FFD700',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButtonText: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: '600',
  },

  // Navigation Arrows
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 20,
  },
  arrowButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFD700',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  arrowDisabled: {
    backgroundColor: '#D1D5DB',
    shadowColor: '#9CA3AF',
  },
  arrowText: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: '600',
  },

  // Dots
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#FFD700',
    width: 24,
  },

});


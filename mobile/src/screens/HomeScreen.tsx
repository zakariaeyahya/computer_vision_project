import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { DESTINATIONS } from '../../mock';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
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
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Destinations Populaires</Text>
            <Text style={styles.sectionSubtitle}>Explorez les perles du nord du Maroc</Text>
          </View>
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
        
        {/* Carrousel de destinations */}
        <FlatList
          ref={flatListRef}
          data={DESTINATIONS}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const scrollPosition = event.nativeEvent.contentOffset.x;
            const index = Math.round(scrollPosition / (width - 40));
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <TouchableOpacity style={styles.destinationCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={item.colors}
                  style={styles.destinationGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={item.image}
                      style={styles.destinationImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', `${item.colors[0]}E6`]}
                      style={styles.imageOverlay}
                    />
                  </View>
                  
                  <View style={styles.cardContent}>
                    <View style={styles.cityBadge}>
                      <Text style={styles.cityBadgeText}>📍 {item.location}</Text>
                    </View>
                    
                    <Text style={styles.cityName}>{item.name}</Text>
                    <Text style={styles.cityNickname}>{item.nickname}</Text>
                    
                    <View style={styles.cityFeatures}>
                      {item.features.map((feature, index) => (
                        <View key={index} style={styles.feature}>
                          <Text style={styles.featureIcon}>{feature.icon}</Text>
                          <Text style={styles.featureText}>{feature.text}</Text>
                        </View>
                      ))}
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.exploreButton}
                      onPress={() => navigation.navigate(item.route as never)}
                    >
                      <Text style={styles.exploreButtonText}>Explorer {item.name}</Text>
                      <Text style={styles.exploreButtonIcon}>→</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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

        {/* Info Section dynamique */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Pourquoi {DESTINATIONS[activeIndex].name} ?</Text>
          <Text style={styles.infoText}>
            {DESTINATIONS[activeIndex].description}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#2C5F2D',
    width: 24,
  },
  
  // Carrousel
  carouselItem: {
    width: width - 40,
    paddingHorizontal: 0,
  },
  destinationCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  destinationGradient: {
    minHeight: 500,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  destinationImage: {
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

  // Navigation Arrows
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  arrowButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2C5F2D',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#2C5F2D',
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
    color: '#FFFFFF',
    fontWeight: '300',
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


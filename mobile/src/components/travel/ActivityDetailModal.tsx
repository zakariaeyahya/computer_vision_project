import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TETOUAN_PLACES } from '../../../mock/tetouanPlaces';
import { TANGER_PLACES } from '../../../mock/tangerPlaces';
import { CHEFCHAOUEN_PLACES } from '../../../mock/chefchaouenPlaces';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Activity {
  period: string;
  icon: string;
  time: string;
  name: string;
  description: string;
  image: string;
  duration: string;
}

interface ActivityDetailModalProps {
  visible: boolean;
  activity: Activity | null;
  onClose: () => void;
  onAddToItinerary: () => void;
  onGetDirections: () => void;
  cityName: string;
  activityPrice?: number;
  ecoScore?: number;
}

export default function ActivityDetailModal({
  visible,
  activity,
  onClose,
  onAddToItinerary,
  onGetDirections,
  cityName,
  activityPrice = 45,
  ecoScore,
}: ActivityDetailModalProps) {
  if (!activity) return null;

  // Combine all places
  const allPlaces = [...TETOUAN_PLACES, ...TANGER_PLACES, ...CHEFCHAOUEN_PLACES];
  
  // Find detailed info from mock data
  const placeDetails = allPlaces.find(place => place.name === activity.name);
  
  // Generate fallback data for restaurants and other activities
  const isRestaurant = activity.name.toLowerCase().includes('restaurant');
  
  const getFallbackData = () => {
    if (isRestaurant) {
      return {
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        fullDescription: `Experience authentic Moroccan cuisine in a traditional setting. This restaurant offers a warm atmosphere with local specialties prepared using fresh, locally-sourced ingredients. Enjoy traditional dishes while immersing yourself in the local culture and hospitality.`,
        highlights: [
          'Authentic Moroccan cuisine',
          'Traditional atmosphere and décor',
          'Fresh, locally-sourced ingredients',
          'Vegetarian and vegan options available',
          'English-speaking staff',
        ],
        openingHours: 'Daily: 12:00 PM - 11:00 PM',
        category: 'Restaurant',
        rating: 4.6,
        reviews: 324,
        tags: ['Food', 'Traditional', 'Local Cuisine', 'Dining'],
        bestTimeToVisit: 'Lunch: 12-3 PM, Dinner: 7-10 PM',
        accessibility: 'Ground floor accessible',
      };
    } else {
      return {
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
        fullDescription: `Discover this unique attraction that showcases the rich culture and heritage of Morocco. A memorable experience that offers insights into local traditions, history, and the authentic way of life in this beautiful region.`,
        highlights: [
          'Authentic cultural experience',
          'Expert local guides',
          'Photo opportunities',
          'Learn about local traditions',
          'Family-friendly activity',
        ],
        openingHours: 'Daily: 9:00 AM - 6:00 PM',
        category: 'Experience',
        rating: 4.5,
        reviews: 150,
        tags: ['Culture', 'Experience', 'Local'],
        bestTimeToVisit: 'Morning or late afternoon',
        accessibility: 'Partially accessible',
      };
    }
  };
  
  const fallbackData = getFallbackData();
  
  // Use detailed info if available, fallback to generated data or activity data
  const displayImage = placeDetails?.image || fallbackData.image;
  const displayDescription = placeDetails?.fullDescription || fallbackData.fullDescription;
  const highlights = placeDetails?.highlights || fallbackData.highlights;
  const openingHours = placeDetails?.openingHours || fallbackData.openingHours;
  const category = placeDetails?.category || fallbackData.category;
  const rating = placeDetails?.rating || fallbackData.rating;
  const reviews = placeDetails?.reviews || fallbackData.reviews;
  const tags = placeDetails?.tags || fallbackData.tags;
  const bestTimeToVisit = placeDetails?.bestTimeToVisit || fallbackData.bestTimeToVisit;
  const accessibility = placeDetails?.accessibility || fallbackData.accessibility;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: displayImage }}
              style={styles.headerImage}
              resizeMode="cover"
            />
            
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            {/* Eco Badge */}
            {ecoScore && (
              <View style={styles.ecoBadge}>
                <MaterialCommunityIcons name="leaf" size={14} color="#FFFFFF" />
                <Text style={styles.ecoBadgeText}>Eco {ecoScore}/5</Text>
              </View>
            )}
          </View>

          {/* Content */}
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Title & Actions */}
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{activity.name}</Text>
                
                {/* Category Badge */}
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
                
                {/* Rating */}
                <View style={styles.ratingContainer}>
                  <Feather name="star" size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>
                    {rating} <Text style={styles.reviewsText}>({reviews} reviews)</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.iconButton}>
                  <Feather name="heart" size={22} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Feather name="share-2" size={22} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Meta Info */}
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Feather name="map-pin" size={16} color="#6B7280" />
                <Text style={styles.metaText}>{cityName}</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="clock" size={16} color="#6B7280" />
                <Text style={styles.metaText}>{activity.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="dollar-sign" size={16} color="#6B7280" />
                <Text style={styles.metaText}>${activityPrice} entry</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>{displayDescription}</Text>

            {/* Tags */}
            {tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Highlights Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              {highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightItem}>
                  <View style={styles.highlightDot}>
                    <Feather name="check" size={12} color="#059669" />
                  </View>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>

            {/* Hours Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Opening Hours</Text>
              <View style={styles.hoursContainer}>
                <Feather name="clock" size={18} color="#6B7280" />
                <Text style={styles.hoursText}>{openingHours}</Text>
              </View>
            </View>

            {/* Best Time to Visit */}
            {bestTimeToVisit && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Best Time to Visit</Text>
                <View style={styles.infoContainer}>
                  <Feather name="sun" size={18} color="#F59E0B" />
                  <Text style={styles.infoText}>{bestTimeToVisit}</Text>
                </View>
              </View>
            )}

            {/* Accessibility */}
            {accessibility && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Accessibility</Text>
                <View style={styles.infoContainer}>
                  <MaterialCommunityIcons name="wheelchair-accessibility" size={18} color="#6B7280" />
                  <Text style={styles.infoText}>{accessibility}</Text>
                </View>
              </View>
            )}

            {/* Spacer for buttons */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Bottom Action Buttons */}
          <View style={styles.bottomActions}>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={onGetDirections}
            >
              <Feather name="navigation" size={20} color="#2C5F2D" />
              <Text style={styles.secondaryButtonText}>Get Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onAddToItinerary}
            >
              <Text style={styles.primaryButtonText}>Add to Itinerary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: SCREEN_HEIGHT * 0.9,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ecoBadge: {
    position: 'absolute',
    top: 16,
    right: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  ecoBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F4E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C5F2D',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4B5563',
    marginTop: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  highlightDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 12,
  },
  hoursText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0FDF4',
    padding: 14,
    borderRadius: 12,
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C5F2D',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  reviewsText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    flex: 1,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2C5F2D',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C5F2D',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2C5F2D',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});


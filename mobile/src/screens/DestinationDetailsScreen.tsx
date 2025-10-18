import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  DESTINATIONS,
  ITINERARIES_BY_DESTINATION,
} from '../../mock';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Activity } from '../../mock/itinerary';
import ActivityDetailModal from '../components/travel/ActivityDetailModal';

type DestinationDetailsRouteProp = RouteProp<RootStackParamList, 'DestinationDetails'>;

// Expert mock data
const EXPERT = {
  name: 'Elena Papadopoulos',
  title: 'Verified Local Expert',
  rating: 4.9,
  reviews: 2847,
};

export default function DestinationDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<DestinationDetailsRouteProp>();
  const { destinationName } = route.params;
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Find destination in mock data
  const destination = DESTINATIONS.find(d => d.name === destinationName);
  
  if (!destination) {
    return null;
  }

  // Get itinerary for this destination
  const itinerary = ITINERARIES_BY_DESTINATION[destination.name];
  
  // Get recommended activities from first day of itinerary
  const recommendedActivities: Activity[] = itinerary?.days[0]?.activities || [];

  // Calculate price per person (example pricing)
  const pricePerPerson = itinerary?.budget ? Math.round(itinerary.budget / 2) : 299;

  const toggleActivity = (activityName: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityName) 
        ? prev.filter(name => name !== activityName)
        : [...prev, activityName]
    );
  };

  const handleActivityPress = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedActivity(null), 300);
  };

  const handleAddToItinerary = () => {
    if (selectedActivity) {
      toggleActivity(selectedActivity.name);
      handleCloseModal();
    }
  };

  const handleGetDirections = () => {
    // TODO: Implémenter la navigation/directions
    console.log('Get directions to:', selectedActivity?.name);
    handleCloseModal();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <Image
          source={destination.image}
          style={styles.headerImage}
          resizeMode="cover"
        />
        
        {/* Header Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.headerButtonText}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Destination Info Overlay */}
        <View style={styles.destinationInfoOverlay}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <Text style={styles.priceText}>
            ${pricePerPerson} <Text style={styles.priceSubtext}>/person</Text>
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Expert Info */}
        <View style={styles.expertSection}>
          <View style={styles.expertAvatar}>
            <Text style={styles.avatarText}>EP</Text>
          </View>
          <View style={styles.expertInfo}>
            <Text style={styles.expertName}>{EXPERT.name}</Text>
            <Text style={styles.expertTitle}>{EXPERT.title}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>
              {EXPERT.rating} <Text style={styles.reviewsText}>({EXPERT.reviews} reviews)</Text>
            </Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{destination.description}</Text>
          
          {/* Highlights */}
          <View style={styles.highlightsList}>
            {destination.features.slice(0, 5).map((feature, index) => (
              <View key={index} style={styles.highlightItem}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.highlightText}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Activities</Text>
          
          {recommendedActivities.map((activity, index) => {
            const isSelected = selectedActivities.includes(activity.name);
            const activityPrice = index === 0 ? 45 : index === 1 ? 65 : 85;
            
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.activityCard}
                activeOpacity={0.7}
                onPress={() => handleActivityPress(activity)}
              >
                <View style={styles.activityHeader}>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <Text style={styles.activityPrice}>${activityPrice}</Text>
                </View>
                
                <View style={styles.activityMeta}>
                  <View style={styles.activityMetaItem}>
                    <Text style={styles.metaIcon}>⏱</Text>
                    <Text style={styles.metaText}>{activity.duration}</Text>
                  </View>
                  <View style={styles.activityMetaItem}>
                    <Text style={styles.metaIcon}>👥</Text>
                    <Text style={styles.metaText}>Small group</Text>
                  </View>
                </View>

                {index === 1 && (
                  <View style={styles.ecoBadge}>
                    <Text style={styles.ecoBadgeText}>ECO</Text>
                  </View>
                )}

                {index === 2 && (
                  <View style={styles.ecoBadge}>
                    <Text style={styles.ecoBadgeText}>ECO</Text>
                  </View>
                )}

                <View style={styles.activityFooter}>
                  <View style={styles.ratingSmall}>
                    <Text style={styles.starIconSmall}>⭐</Text>
                    <Text style={styles.ratingSmallText}>
                      {(4.7 + index * 0.1).toFixed(1)}
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={[
                      styles.addButton,
                      isSelected && styles.addButtonSelected
                    ]}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleActivity(activity.name);
                    }}
                  >
                    <Text style={[
                      styles.addButtonText,
                      isSelected && styles.addButtonTextSelected
                    ]}>
                      {isSelected ? '✓ Added' : '+ Add to Trip'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        visible={isModalVisible}
        activity={selectedActivity}
        onClose={handleCloseModal}
        onAddToItinerary={handleAddToItinerary}
        onGetDirections={handleGetDirections}
        cityName={destination.name}
        activityPrice={selectedActivity ? 
          (recommendedActivities.indexOf(selectedActivity) === 0 ? 45 : 
           recommendedActivities.indexOf(selectedActivity) === 1 ? 65 : 85) 
          : 45
        }
        ecoScore={selectedActivity ? 
          (recommendedActivities.indexOf(selectedActivity) === 1 || 
           recommendedActivities.indexOf(selectedActivity) === 2 ? 5 : undefined) 
          : undefined
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    position: 'relative',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButtonText: {
    fontSize: 20,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  destinationInfoOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  destinationName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  priceSubtext: {
    fontSize: 16,
    fontWeight: '400',
  },
  content: {
    padding: 20,
  },
  expertSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  expertAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F4E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C5F2D',
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  expertTitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 16,
    marginRight: 4,
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
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4B5563',
    marginBottom: 16,
  },
  highlightsList: {
    marginTop: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkIcon: {
    fontSize: 16,
    color: '#2C5F2D',
    marginRight: 10,
    marginTop: 2,
  },
  highlightText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
    lineHeight: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 12,
  },
  activityPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  activityMeta: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  activityMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#6B7280',
  },
  ecoBadge: {
    position: 'absolute',
    top: 16,
    right: 60,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ecoBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIconSmall: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingSmallText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  addButton: {
    backgroundColor: '#FEF08A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonSelected: {
    backgroundColor: '#D1FAE5',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  addButtonTextSelected: {
    color: '#059669',
  },
});

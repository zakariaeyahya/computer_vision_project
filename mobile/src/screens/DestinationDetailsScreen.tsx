import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  DESTINATIONS,
  ITINERARIES_BY_DESTINATION,
  EVENTS,
  Event,
} from '../../mock';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Activity } from '../../mock/itinerary';
import ActivityDetailModal from '../components/travel/ActivityDetailModal';
import EventDetailsModal from '../components/events/EventDetailsModal';
import { destinationDetailsStyles as styles } from '../styles/destinationDetailsStyles';

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

  // Find destination in mock data
  const destination = DESTINATIONS.find(d => d.name === destinationName);
  
  if (!destination) {
    return null;
  }

  // Get itinerary for this destination
  const itinerary = ITINERARIES_BY_DESTINATION[destination.name];

  // Get recommended activities from first day of itinerary
  const recommendedActivities: Activity[] = itinerary?.days[0]?.activities || [];

  // Get events for this destination
  const cityEvents = EVENTS.filter(event => event.city === destination.name);

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
    handleCloseModal();
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setIsEventModalVisible(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalVisible(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const handleAddEventToTrip = (event: Event) => {
    console.log('Ajouter événement au voyage:', event.name);
    // TODO: Implémenter la logique d'ajout de l'événement au voyage
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

        {/* Upcoming Events */}
        {cityEvents.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Événements à venir</Text>
              <TouchableOpacity
                onPress={() => {
                  // Navigation vers l'écran Events
                  console.log('Navigate to Events screen');
                }}
                style={styles.viewAllButton}
                activeOpacity={0.7}
              >
                <Text style={styles.viewAllText}>Voir tout</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#2C5F2D" />
              </TouchableOpacity>
            </View>

            {cityEvents.map((event) => {
              const getEventIcon = (iconType: string) => {
                switch (iconType) {
                  case "music":
                    return "music";
                  case "trophy":
                    return "trophy";
                  case "ticket":
                    return "ticket";
                  case "users":
                    return "account-group";
                  default:
                    return "calendar";
                }
              };

              const getEventColor = (iconType: string) => {
                switch (iconType) {
                  case "music":
                    return "#B0CE88";
                  case "trophy":
                    return "#FF6B6B";
                  case "ticket":
                    return "#4ECDC4";
                  case "users":
                    return "#45B7D1";
                  default:
                    return "#B0CE88";
                }
              };

              return (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  activeOpacity={0.7}
                  onPress={() => handleEventPress(event)}
                >
                  <View
                    style={[
                      styles.eventIconContainer,
                      { backgroundColor: getEventColor(event.icon) },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={getEventIcon(event.icon) as string}
                      size={24}
                      color="#FFFFFF"
                    />
                  </View>

                  <View style={styles.eventContent}>
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventName}>{event.name}</Text>
                      <View style={styles.eventTypeBadge}>
                        <Text style={styles.eventTypeText}>{event.type}</Text>
                      </View>
                    </View>

                    <Text style={styles.eventDescription} numberOfLines={2}>
                      {event.description}
                    </Text>

                    <View style={styles.eventDetails}>
                      <View style={styles.eventDetail}>
                        <MaterialCommunityIcons name="calendar" size={14} color="#6B7280" />
                        <Text style={styles.eventDetailText}>{event.date}</Text>
                      </View>
                      <View style={styles.eventDetail}>
                        <MaterialCommunityIcons name="currency-usd" size={14} color="#6B7280" />
                        <Text style={styles.eventDetailText}>{event.price}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        visible={isEventModalVisible}
        onClose={handleCloseEventModal}
        onAddToTrip={handleAddEventToTrip}
      />
    </ScrollView>
  );
}


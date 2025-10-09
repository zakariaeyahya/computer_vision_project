import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Mock data pour les voyages
const MOCK_TRIPS = [
  {
    id: 1,
    destination: 'Tétouan',
    startDate: '3 Mai 2025',
    endDate: '5 Mai 2025',
    status: 'upcoming',
    image: '🏛️',
    backgroundColor: ['#C41E3A', '#8B0000'],
    budget: 850,
    days: 3,
  },
  {
    id: 2,
    destination: 'Tanger',
    startDate: '10 Avril 2025',
    endDate: '12 Avril 2025',
    status: 'completed',
    image: '🌊',
    backgroundColor: ['#1E40AF', '#3B82F6'],
    budget: 1200,
    days: 3,
  },
];

export default function MyTripsScreen() {
  const navigation = useNavigation();
  const [trips, setTrips] = useState(MOCK_TRIPS);

  const handleViewDetails = (tripId: number) => {
    // Navigation vers la page de détails (ItineraryScreen)
    navigation.navigate('Itinerary' as never);
  };

  const handleStartTravel = () => {
    navigation.navigate('StartTravel' as never);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'upcoming') {
      return {
        text: 'À venir',
        emoji: '🗓️',
        backgroundColor: '#DBEAFE',
        textColor: '#1E40AF',
      };
    } else if (status === 'completed') {
      return {
        text: 'Terminé',
        emoji: '✅',
        backgroundColor: '#D1FAE5',
        textColor: '#065F46',
      };
    }
    return {
      text: 'En cours',
      emoji: '✈️',
      backgroundColor: '#FEF3C7',
      textColor: '#92400E',
    };
  };

  // État vide
  if (trips.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🧳</Text>
          <Text style={styles.emptyTitle}>Aucun voyage planifié</Text>
          <Text style={styles.emptyDescription}>
            Commencez à planifier votre prochaine aventure au Maroc
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={handleStartTravel}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2C5F2D', '#97BC62']}
              style={styles.emptyButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.emptyButtonEmoji}>✈️</Text>
              <Text style={styles.emptyButtonText}>Commencer un voyage</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🧳</Text>
        <Text style={styles.headerTitle}>Mes Voyages</Text>
        <Text style={styles.headerSubtitle}>
          {trips.length} {trips.length > 1 ? 'voyages planifiés' : 'voyage planifié'}
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity style={[styles.filterChip, styles.filterChipActive]}>
          <Text style={[styles.filterText, styles.filterTextActive]}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>À venir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>Terminés</Text>
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <View style={styles.content}>
        {trips.map((trip) => {
          const statusBadge = getStatusBadge(trip.status);
          
          return (
            <TouchableOpacity
              key={trip.id}
              style={styles.tripCard}
              onPress={() => handleViewDetails(trip.id)}
              activeOpacity={0.9}
            >
              {/* Card Image/Gradient */}
              <LinearGradient
                colors={trip.backgroundColor}
                style={styles.tripImageContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.tripImageEmoji}>{trip.image}</Text>
                
                {/* Status Badge */}
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: statusBadge.backgroundColor },
                  ]}
                >
                  <Text style={styles.statusEmoji}>{statusBadge.emoji}</Text>
                  <Text
                    style={[styles.statusText, { color: statusBadge.textColor }]}
                  >
                    {statusBadge.text}
                  </Text>
                </View>
              </LinearGradient>

              {/* Card Content */}
              <View style={styles.tripContent}>
                <View style={styles.tripHeader}>
                  <Text style={styles.tripDestination}>{trip.destination}</Text>
                  <Text style={styles.tripArrow}>›</Text>
                </View>
                
                <View style={styles.tripDateContainer}>
                  <Text style={styles.tripDateIcon}>📅</Text>
                  <Text style={styles.tripDate}>
                    {trip.startDate} - {trip.endDate}
                  </Text>
                </View>

                <View style={styles.tripMeta}>
                  <View style={styles.tripMetaItem}>
                    <Text style={styles.tripMetaIcon}>⏱️</Text>
                    <Text style={styles.tripMetaText}>{trip.days} jours</Text>
                  </View>
                  <View style={styles.tripMetaItem}>
                    <Text style={styles.tripMetaIcon}>💰</Text>
                    <Text style={styles.tripMetaText}>{trip.budget} dh</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => handleViewDetails(trip.id)}
                >
                  <Text style={styles.detailsButtonText}>Voir les détails</Text>
                  <Text style={styles.detailsButtonArrow}>→</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Add New Trip Button */}
        <TouchableOpacity
          style={styles.addTripButton}
          onPress={handleStartTravel}
          activeOpacity={0.8}
        >
          <View style={styles.addTripButtonContent}>
            <View style={styles.addTripIconContainer}>
              <Text style={styles.addTripIcon}>+</Text>
            </View>
            <Text style={styles.addTripText}>Planifier un nouveau voyage</Text>
          </View>
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

  // Header
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },

  // Filters
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterChipActive: {
    backgroundColor: '#2C5F2D',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  // Content
  content: {
    padding: 20,
    gap: 16,
  },

  // Trip Card
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tripImageContainer: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tripImageEmoji: {
    fontSize: 64,
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusEmoji: {
    fontSize: 14,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tripContent: {
    padding: 20,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripDestination: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tripArrow: {
    fontSize: 32,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  tripDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tripDateIcon: {
    fontSize: 18,
  },
  tripDate: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  tripMeta: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  tripMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripMetaIcon: {
    fontSize: 16,
  },
  tripMetaText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  detailsButtonArrow: {
    fontSize: 18,
    color: '#1F2937',
  },

  // Add Trip Button
  addTripButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    padding: 24,
    marginTop: 8,
  },
  addTripButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addTripIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#2C5F2D',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTripIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  addTripText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  emptyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#2C5F2D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyButtonEmoji: {
    fontSize: 22,
  },
  emptyButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});


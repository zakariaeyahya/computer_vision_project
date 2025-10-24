import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryHeader from '../components/itinerary/ItineraryHeader';
import DayCard from '../components/itinerary/DayCard';
import ActivityDetailModal from '../components/travel/ActivityDetailModal';
import { ITINERARIES_BY_DESTINATION } from '../../mock';
import type { Activity } from '../../mock/itinerary';

export default function ItineraryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get parameters from navigation
  // @ts-expect-error - Navigation typing to be fixed
  const { destination = 'Tétouan' } = route.params || {};

  // Get the itinerary for the selected destination
  const itinerary = ITINERARIES_BY_DESTINATION[destination] || ITINERARIES_BY_DESTINATION['Tétouan'];

  const handleSaveTrip = () => {
    Alert.alert('Succès', 'Voyage sauvegardé avec succès !');
    // TODO: Navigate to "Mes Voyages"
  };

  const handleModifyTrip = () => {
    navigation.goBack();
  };

  const handleActivityPress = (activity: Activity) => {
    console.log('=== handleActivityPress called ===');
    console.log('Activity pressed:', activity.name);
    console.log('Activity object:', activity);
    setSelectedActivity(activity);
    setIsModalVisible(true);
    console.log('Modal should be visible now');
    console.log('=== End handleActivityPress ===');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedActivity(null), 300);
  };

  const handleAddToItinerary = () => {
    Alert.alert('Succès', 'Activité ajoutée à votre itinéraire !');
    handleCloseModal();
  };

  const handleGetDirections = () => {
    Alert.alert('Directions', 'Ouverture de l\'application de navigation...');
    handleCloseModal();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header avec bouton chatbot IA */}
      <ItineraryHeader
        destination={itinerary.destination}
        duration={itinerary.duration}
        budget={itinerary.budget}
      />

      <View style={styles.content}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="information" size={24} color="#3B82F6" />
          <Text style={styles.infoText}>
            Cet itinéraire a été personnalisé selon vos préférences
          </Text>
        </View>

        {/* Days List */}
        {itinerary.days.map((day, dayIndex) => {
          console.log(`Rendering DayCard ${dayIndex} with ${day.activities.length} activities`);
          return (
            <DayCard
              key={dayIndex}
              day={day}
              onActivityPress={handleActivityPress}
            />
          );
        })}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveTrip}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#1A1A1A', '#2D2D2D']}
              style={styles.saveGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialCommunityIcons name="content-save" size={22} color="#FFFFFF" />
              <Text style={styles.saveText}>Sauvegarder ce voyage</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tips Card */}
        <View style={styles.tipsCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <MaterialCommunityIcons name="lightbulb-on" size={20} color="#92400E" />
            <Text style={styles.tipsTitle}>Conseils pour votre voyage</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Portez des chaussures confortables pour la médina</Text>
            <Text style={styles.tipItem}>• Négociez les prix dans les souks</Text>
            <Text style={styles.tipItem}>• Goûtez au thé à la menthe traditionnel</Text>
          </View>
        </View>
      </View>

      {/* Activity Detail Modal */}
      {console.log('Rendering modal with visibility:', isModalVisible, 'activity:', selectedActivity?.name)}
      {isModalVisible && (
        <ActivityDetailModal
          visible={isModalVisible}
          activity={selectedActivity}
          onClose={handleCloseModal}
          onAddToItinerary={handleAddToItinerary}
          onGetDirections={handleGetDirections}
          cityName={itinerary.destination}
          activityPrice={45} // Prix par défaut
          ecoScore={undefined} // Pas de score éco par défaut
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  // Content
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Info Card
  infoCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },


  // Actions
  actionsContainer: {
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#FFFBEB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  saveText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modifyButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  modifyText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  // Tips Card
  tipsCard: {
    backgroundColor: '#FFFBEB',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  tipsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#92400E',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
});

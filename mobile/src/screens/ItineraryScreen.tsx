import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryHeader from '../components/itinerary/ItineraryHeader';
import { ITINERARIES_BY_DESTINATION } from '../../mock';

export default function ItineraryScreen() {
  const navigation = useNavigation();
  const route = useRoute();

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
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Cet itinéraire a été personnalisé selon vos préférences
          </Text>
        </View>

        {/* Days List */}
        {itinerary.days.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.dayContainer}>
            {/* Day Header */}
            <View style={styles.dayHeader}>
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>Jour {day.day}</Text>
              </View>
              <Text style={styles.dayDate}>{day.date}</Text>
            </View>

            {/* Activities */}
            <View style={styles.activitiesContainer}>
              {day.activities.map((activity, activityIndex) => (
                <View key={activityIndex} style={styles.activityCard}>
                  {/* Timeline dot */}
                  <View style={styles.timelineContainer}>
                    <View style={styles.timelineDot} />
                    {activityIndex < day.activities.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>

                  {/* Activity Content */}
                  <View style={styles.activityContent}>
                    {/* Activity Header */}
                    <View style={styles.activityHeader}>
                      <View style={styles.activityPeriod}>
                        <Text style={styles.periodIcon}>{activity.icon}</Text>
                        <Text style={styles.periodText}>{activity.period}</Text>
                      </View>
                      <Text style={styles.activityTime}>{activity.time}</Text>
                    </View>

                    {/* Activity Body */}
                    <View style={styles.activityBody}>
                      <View style={styles.activityImageContainer}>
                        <Text style={styles.activityImage}>{activity.image}</Text>
                      </View>
                      <View style={styles.activityDetails}>
                        <Text style={styles.activityName}>{activity.name}</Text>
                        <Text style={styles.activityDescription}>
                          {activity.description}
                        </Text>
                        <View style={styles.activityMeta}>
                          <Text style={styles.activityDuration}>
                            ⏱️ {activity.duration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveTrip}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2C5F2D', '#97BC62']}
              style={styles.saveGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveIcon}>💾</Text>
              <Text style={styles.saveText}>Sauvegarder ce voyage</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modifyButton}
            onPress={handleModifyTrip}
            activeOpacity={0.8}
          >
            <Text style={styles.modifyIcon}>✏️</Text>
            <Text style={styles.modifyText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {/* Tips Card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Conseils pour votre voyage</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Portez des chaussures confortables pour la médina</Text>
            <Text style={styles.tipItem}>• Négociez les prix dans les souks</Text>
            <Text style={styles.tipItem}>• Goûtez au thé à la menthe traditionnel</Text>
          </View>
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
  infoIcon: {
    fontSize: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },

  // Day Container
  dayContainer: {
    marginBottom: 32,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dayBadge: {
    backgroundColor: '#C41E3A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dayBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },

  // Activities
  activitiesContainer: {
    marginLeft: 8,
  },
  activityCard: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  // Timeline
  timelineContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#C41E3A',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#C41E3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },

  // Activity Content
  activityContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityPeriod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  periodIcon: {
    fontSize: 16,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  activityTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activityBody: {
    flexDirection: 'row',
    gap: 12,
  },
  activityImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityImage: {
    fontSize: 36,
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDuration: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
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
    shadowColor: '#2C5F2D',
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
  saveIcon: {
    fontSize: 22,
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
  modifyIcon: {
    fontSize: 20,
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
    marginBottom: 12,
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

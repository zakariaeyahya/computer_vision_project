import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { DayItinerary, Activity } from '../../../mock/itinerary';

// Activer LayoutAnimation sur Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface DayCardProps {
  day: DayItinerary;
  onActivityPress: (activity: Activity) => void;
}

export default function DayCard({ day, onActivityPress }: DayCardProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const animationValue = useRef(new Animated.Value(1)).current;

  const toggleMinimize = () => {
    // Configuration de l'animation pour un effet fluide
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    const toValue = isMinimized ? 1 : 0;
    setIsMinimized(!isMinimized);

    Animated.spring(animationValue, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  const contentOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const contentScale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  return (
    <View style={[styles.dayCard, isMinimized && styles.dayCardMinimized]}>
      {/* Day Header - Toujours visible et cliquable */}
      <TouchableOpacity
        style={styles.dayHeader}
        onPress={toggleMinimize}
        activeOpacity={0.8}
      >
        <View style={styles.dayHeaderContent}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>Jour {day.day}</Text>
          </View>
          <Text style={styles.dayDate}>{day.date}</Text>
        </View>

        <View style={styles.headerRight}>
          <Text style={styles.activitiesCount}>
            {day.activities.length} {day.activities.length > 1 ? 'activités' : 'activité'}
          </Text>
          <MaterialCommunityIcons
            name={isMinimized ? "chevron-down" : "chevron-up"}
            size={24}
            color="#6B7280"
          />
        </View>
      </TouchableOpacity>

      {/* Activities - Affichées uniquement quand étendu */}
      {!isMinimized && (
        <Animated.View
          style={[
            styles.activitiesContainer,
            {
              opacity: contentOpacity,
              transform: [{ scale: contentScale }],
            }
          ]}
        >
          {day.activities.map((activity, activityIndex) => (
            <TouchableOpacity
              key={activityIndex}
              style={styles.activityCard}
              onPress={() => onActivityPress(activity)}
              activeOpacity={0.7}
            >
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
                    <MaterialCommunityIcons name={activity.icon} size={16} color="#92400E" />
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
                      <MaterialCommunityIcons name="clock-outline" size={13} color="#9CA3AF" style={{ marginRight: 4 }} />
                      <Text style={styles.activityDuration}>
                        {activity.duration}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  dayCardMinimized: {
    elevation: 1,
    shadowOpacity: 0.05,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayBadge: {
    backgroundColor: '#1A1A1A',
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activitiesCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activitiesContainer: {
    padding: 16,
  },
  activityCard: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#1A1A1A',
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
  activityContent: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityPeriod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  periodText: {
    fontSize: 12,
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
    gap: 10,
  },
  activityImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityImage: {
    fontSize: 24,
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 6,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDuration: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
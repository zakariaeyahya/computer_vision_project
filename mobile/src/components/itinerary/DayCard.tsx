import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActivityItem from './ActivityItem';

interface Activity {
  period: string;
  icon: string;
  time: string;
  name: string;
  description: string;
  image: string;
  duration: string;
}

interface DayCardProps {
  day: number;
  date: string;
  activities: Activity[];
}

const DayCard: React.FC<DayCardProps> = ({ day, date, activities }) => {
  return (
    <View style={styles.dayContainer}>
      {/* Day Header */}
      <View style={styles.dayHeader}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>Jour {day}</Text>
        </View>
        <Text style={styles.dayDate}>{date}</Text>
      </View>

      {/* Activities */}
      <View style={styles.activitiesContainer}>
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  activitiesContainer: {
    marginLeft: 8,
  },
});

export default DayCard;


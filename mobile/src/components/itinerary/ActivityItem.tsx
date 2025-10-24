import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Activity {
  period: string;
  icon: string;
  time: string;
  name: string;
  description: string;
  image: string;
  duration: string;
}

interface ActivityItemProps {
  activity: Activity;
  isLast: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLast }) => {
  return (
    <View style={styles.activityCard}>
      {/* Timeline dot */}
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        {!isLast && <View style={styles.timelineLine} />}
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
  );
};

const styles = StyleSheet.create({
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
});

export default ActivityItem;


/**
 * StatisticsScreen
 *
 * Screen for displaying detailed user travel statistics
 * Features:
 * - Overview cards with key metrics
 * - Trip history timeline
 * - Monthly activity chart
 * - Destinations breakdown
 * - Current year statistics
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MOCK_USER_PROFILE } from '../../../mock';
import { statisticsStyles as styles } from '../../styles/statisticsStyles';

export default function StatisticsScreen() {
  const navigation = useNavigation();
  const stats = MOCK_USER_PROFILE.statistics;

  /**
   * Format currency
   */
  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()} dh`;
  };

  /**
   * Format date
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#2C5F2D', '#97BC62']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Statistiques</Text>
            <Text style={styles.headerSubtitle}>Vos voyages en chiffres</Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Overview Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>

          <View style={styles.overviewGrid}>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewEmoji}>✈️</Text>
              <Text style={styles.overviewValue}>{stats.totalTrips}</Text>
              <Text style={styles.overviewLabel}>Voyages totaux</Text>
            </View>

            <View style={styles.overviewCard}>
              <Text style={styles.overviewEmoji}>🗺️</Text>
              <Text style={styles.overviewValue}>{stats.totalDestinations}</Text>
              <Text style={styles.overviewLabel}>Destinations</Text>
            </View>

            <View style={styles.overviewCard}>
              <Text style={styles.overviewEmoji}>📅</Text>
              <Text style={styles.overviewValue}>{stats.totalDays}</Text>
              <Text style={styles.overviewLabel}>Jours de voyage</Text>
            </View>

            <View style={styles.overviewCard}>
              <Text style={styles.overviewEmoji}>💰</Text>
              <Text style={styles.overviewValue}>{stats.totalSpent}</Text>
              <Text style={styles.overviewLabel}>Budget total (dh)</Text>
            </View>
          </View>
        </View>

        {/* Current Year Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cette année 2024</Text>

          <View style={styles.yearCard}>
            <LinearGradient
              colors={['#2C5F2D', '#97BC62']}
              style={styles.yearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.yearStatsGrid}>
                <View style={styles.yearStat}>
                  <Text style={styles.yearStatValue}>{stats.currentYear.trips}</Text>
                  <Text style={styles.yearStatLabel}>Voyages</Text>
                </View>
                <View style={styles.yearStatDivider} />
                <View style={styles.yearStat}>
                  <Text style={styles.yearStatValue}>{stats.currentYear.destinations}</Text>
                  <Text style={styles.yearStatLabel}>Villes</Text>
                </View>
                <View style={styles.yearStatDivider} />
                <View style={styles.yearStat}>
                  <Text style={styles.yearStatValue}>{stats.currentYear.days}</Text>
                  <Text style={styles.yearStatLabel}>Jours</Text>
                </View>
                <View style={styles.yearStatDivider} />
                <View style={styles.yearStat}>
                  <Text style={styles.yearStatValue}>{stats.currentYear.spent}</Text>
                  <Text style={styles.yearStatLabel}>Budget (dh)</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Averages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moyennes</Text>

          <View style={styles.averagesContainer}>
            <View style={styles.averageCard}>
              <View style={styles.averageIconContainer}>
                <Text style={styles.averageIcon}>💵</Text>
              </View>
              <View style={styles.averageContent}>
                <Text style={styles.averageValue}>{formatCurrency(stats.averageSpentPerTrip || 0)}</Text>
                <Text style={styles.averageLabel}>Budget moyen par voyage</Text>
              </View>
            </View>

            <View style={styles.averageCard}>
              <View style={styles.averageIconContainer}>
                <Text style={styles.averageIcon}>📆</Text>
              </View>
              <View style={styles.averageContent}>
                <Text style={styles.averageValue}>{stats.averageTripDuration} jours</Text>
                <Text style={styles.averageLabel}>Durée moyenne</Text>
              </View>
            </View>

            <View style={styles.averageCard}>
              <View style={styles.averageIconContainer}>
                <Text style={styles.averageIcon}>🏆</Text>
              </View>
              <View style={styles.averageContent}>
                <Text style={styles.averageValue}>{stats.favoriteDestination}</Text>
                <Text style={styles.averageLabel}>Destination préférée</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trip History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des voyages</Text>

          <View style={styles.historyContainer}>
            {stats.tripHistory?.map((trip) => (
              <View key={trip.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View style={styles.historyIconContainer}>
                    <Text style={styles.historyEmoji}>{trip.emoji}</Text>
                  </View>
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyDestination}>{trip.destination}</Text>
                    <Text style={styles.historyDates}>
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </Text>
                  </View>
                  <View style={styles.historyDurationBadge}>
                    <Text style={styles.historyDurationText}>{trip.days}j</Text>
                  </View>
                </View>

                <View style={styles.historyDivider} />

                <View style={styles.historyStats}>
                  <View style={styles.historyStatItem}>
                    <Text style={styles.historyStatIcon}>💰</Text>
                    <Text style={styles.historyStatValue}>{formatCurrency(trip.spent)}</Text>
                  </View>
                  <View style={styles.historyStatItem}>
                    <Text style={styles.historyStatIcon}>🎯</Text>
                    <Text style={styles.historyStatValue}>{trip.activities} activités</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Destinations Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destinations visitées</Text>

          <View style={styles.destinationsContainer}>
            {stats.destinationStats?.map((dest, index) => (
              <View key={index} style={styles.destinationCard}>
                <View style={styles.destinationHeader}>
                  <Text style={styles.destinationEmoji}>{dest.emoji}</Text>
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{dest.name}</Text>
                    <Text style={styles.destinationLastVisit}>{dest.lastVisit}</Text>
                  </View>
                </View>
                <View style={styles.destinationVisitsBadge}>
                  <Text style={styles.destinationVisitsText}>
                    {dest.visits === 0 ? 'Non visité' : `${dest.visits} visite${dest.visits > 1 ? 's' : ''}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Monthly Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité mensuelle</Text>

          <View style={styles.monthlyChartContainer}>
            <View style={styles.monthlyChart}>
              {stats.monthlyStats?.map((month, index) => (
                <View key={index} style={styles.monthlyBar}>
                  <View style={styles.monthlyBarContainer}>
                    <View
                      style={[
                        styles.monthlyBarFill,
                        {
                          height: `${Math.max((month.trips / 2) * 100, 5)}%`,
                          backgroundColor: month.trips > 0 ? '#2C5F2D' : '#E5E7EB',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.monthlyLabel}>{month.month.substring(0, 3)}</Text>
                  {month.trips > 0 && (
                    <Text style={styles.monthlyValue}>{month.trips}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

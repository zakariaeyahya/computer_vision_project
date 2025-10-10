/**
 * Statistics Screen Styles
 */

import { StyleSheet } from 'react-native';

export const statisticsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  // Header
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -4,
  },
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  headerPlaceholder: {
    width: 40,
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  // Section
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },

  // Overview Grid
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  overviewCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C5F2D',
    marginBottom: 6,
  },
  overviewLabel: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Current Year Card
  yearCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#2C5F2D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  yearGradient: {
    padding: 20,
  },
  yearStatsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearStat: {
    flex: 1,
    alignItems: 'center',
  },
  yearStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  yearStatLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  yearStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  // Averages
  averagesContainer: {
    gap: 12,
  },
  averageCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  averageIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  averageIcon: {
    fontSize: 28,
  },
  averageContent: {
    flex: 1,
  },
  averageValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  averageLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  // Trip History
  historyContainer: {
    gap: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyEmoji: {
    fontSize: 24,
  },
  historyInfo: {
    flex: 1,
  },
  historyDestination: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  historyDates: {
    fontSize: 13,
    color: '#6B7280',
  },
  historyDurationBadge: {
    backgroundColor: '#2C5F2D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  historyDurationText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  historyDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  historyStats: {
    flexDirection: 'row',
    gap: 16,
  },
  historyStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyStatIcon: {
    fontSize: 18,
  },
  historyStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },

  // Destinations Stats
  destinationsContainer: {
    gap: 12,
  },
  destinationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  destinationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  destinationEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  destinationLastVisit: {
    fontSize: 13,
    color: '#6B7280',
  },
  destinationVisitsBadge: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  destinationVisitsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C5F2D',
  },

  // Monthly Chart
  monthlyChartContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  monthlyChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 180,
    gap: 4,
  },
  monthlyBar: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  monthlyBarContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  monthlyBarFill: {
    width: '70%',
    borderRadius: 4,
    minHeight: 4,
  },
  monthlyLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  monthlyValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2C5F2D',
  },
});

export default statisticsStyles;

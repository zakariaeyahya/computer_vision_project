/**
 * Travel Preferences Screen Styles
 */

import { StyleSheet } from 'react-native';

export const travelPreferencesStyles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },

  // Budget
  budgetContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  budgetOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  budgetOptionActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  budgetEmoji: {
    fontSize: 32,
  },
  budgetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  budgetLabelActive: {
    color: '#2C5F2D',
  },
  budgetRange: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  budgetRangeActive: {
    color: '#2C5F2D',
    fontWeight: '600',
  },

  // Interests Grid
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  interestChipActive: {
    backgroundColor: '#2C5F2D',
    borderColor: '#2C5F2D',
  },
  interestEmoji: {
    fontSize: 18,
  },
  interestLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  interestLabelActive: {
    color: '#FFFFFF',
  },

  // Styles Container
  stylesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  styleCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  styleCardActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  styleEmoji: {
    fontSize: 32,
  },
  styleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  styleLabelActive: {
    color: '#2C5F2D',
  },

  // Options
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  optionButtonActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  optionEmoji: {
    fontSize: 28,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  optionLabelActive: {
    color: '#2C5F2D',
  },

  // Save Button
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 24,
    elevation: 4,
    shadowColor: '#2C5F2D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveGradient: {
    padding: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default travelPreferencesStyles;

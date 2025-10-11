/**
 * Settings Screen Styles
 */

import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Setting Row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  settingValue: {
    fontSize: 14,
    color: '#2C5F2D',
    fontWeight: '600',
  },
  settingArrow: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },

  // Theme Options
  themeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  themeOption: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  themeOptionActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  themeEmoji: {
    fontSize: 28,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  themeLabelActive: {
    color: '#2C5F2D',
  },

  // Privacy Options
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  privacyContent: {
    flex: 1,
    marginRight: 16,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  privacyEmoji: {
    fontSize: 18,
  },
  privacyLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  privacyDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    borderColor: '#2C5F2D',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2C5F2D',
  },

  // Info Row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoValue: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Save Button
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
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

export default settingsStyles;

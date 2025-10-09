import { StyleSheet } from 'react-native';

export const startTravelStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  // Header
  header: {
    padding: 32,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  
  // Form Container
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  formSection: {
    marginBottom: 28,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  sublabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    marginTop: -8,
  },
  
  // Dropdown
  dropdown: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  
  // Dates
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateButtonIcon: {
    fontSize: 20,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  dateArrow: {
    fontSize: 20,
    color: '#6B7280',
    marginTop: 20,
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
  },
  budgetOptionActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  budgetEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  budgetEmojiActive: {
    transform: [{ scale: 1.1 }],
  },
  budgetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  budgetLabelActive: {
    color: '#2C5F2D',
  },
  budgetAmount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  budgetAmountActive: {
    color: '#2C5F2D',
    fontWeight: '600',
  },
  
  // Checkboxes
  checkbox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  checkboxActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: '#2C5F2D',
    borderColor: '#2C5F2D',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  checkboxDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  
  // Submit Button
  submitButton: {
    marginTop: 12,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#2C5F2D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitIcon: {
    fontSize: 20,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: '300',
  },
  destinationList: {
    padding: 20,
  },
  destinationItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  destinationItemActive: {
    borderColor: '#2C5F2D',
    backgroundColor: '#F0F9FF',
  },
  destinationItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  destinationEmoji: {
    fontSize: 36,
    marginRight: 16,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  destinationNickname: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  destinationCheck: {
    fontSize: 24,
    color: '#2C5F2D',
    fontWeight: 'bold',
  },
});


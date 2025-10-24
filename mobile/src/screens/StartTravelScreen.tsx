import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  DESTINATIONS,
  PREFERENCES_BY_DESTINATION,
  type PreferenceType,
  type Preference
} from '../../mock';
import { BudgetSelector } from '../components/common/BudgetSelector';

const MIN_BUDGET = 200;
const MAX_BUDGET = 10000;

// Budget categories
const BUDGET_CATEGORIES = [
  { value: 'petit', label: 'Petit budget', range: '< 500 DH/jour', icon: 'wallet-outline' },
  { value: 'moyen', label: 'Moyen', range: '500-1500 DH/jour', icon: 'cash-outline' },
  { value: 'confort', label: 'Confort', range: '1500-3000 DH/jour', icon: 'card-outline' },
  { value: 'luxe', label: 'Luxe', range: '> 3000 DH/jour', icon: 'diamond-outline' },
] as const;

// Transport options
const TRANSPORT_OPTIONS = [
  { value: 'car', label: 'Voiture', icon: 'car' },
  { value: 'bus', label: 'Bus', icon: 'bus' },
  { value: 'train', label: 'Train', icon: 'train' },
  { value: 'mixed', label: 'Mixte', icon: 'map-marker-path' },
] as const;

type BudgetCategory = typeof BUDGET_CATEGORIES[number]['value'];
type TransportType = typeof TRANSPORT_OPTIONS[number]['value'];

export default function StartTravelScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get preselected destination from navigation params
  // @ts-expect-error - Navigation typing to be fixed
  const { preselectedDestination } = route.params || {};

  // Form state
  const [destination, setDestination] = useState(preselectedDestination || DESTINATIONS[0].name);
  const [showDestinationPicker, setShowDestinationPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [budget, setBudget] = useState<number>(1000);
  const [budgetCategory, setBudgetCategory] = useState<BudgetCategory>('moyen');
  const [transport, setTransport] = useState<TransportType>('car');
  const [preferences, setPreferences] = useState<PreferenceType[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Update destination when navigation params change
  useEffect(() => {
    if (preselectedDestination && preselectedDestination !== destination) {
      setDestination(preselectedDestination);
      setPreferences([]);
    }
  }, [preselectedDestination, destination]);

  // Get available preferences based on selected destination
  const availablePreferences: Preference[] = PREFERENCES_BY_DESTINATION[destination] || PREFERENCES_BY_DESTINATION['Tétouan'];

  // Calculate duration
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onStartDateChange = (_event: unknown, selectedDate?: Date) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
      // Adjust end date if it's before start date
      if (selectedDate > endDate) {
        setEndDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000));
      }
    }
  };

  const onEndDateChange = (_event: unknown, selectedDate?: Date) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const togglePreference = (pref: PreferenceType) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const handleGenerateItinerary = () => {
    // Validation
    if (preferences.length === 0) {
      Alert.alert('Attention', 'Veuillez sélectionner au moins un centre d\'intérêt');
      return;
    }

    if (duration < 1) {
      Alert.alert('Attention', 'La durée du séjour doit être d\'au moins 1 jour');
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);

      // Navigate to itinerary with parameters
      // @ts-expect-error - Navigation typing to be fixed
      navigation.navigate('Itinerary', {
        destination,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        duration,
        budget,
        budgetCategory,
        transport,
        preferences,
      });
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="airplane-takeoff" size={32} color="#B0CE88" />
        </View>
        <Text style={styles.headerTitle}>Planifier mon voyage</Text>
        <Text style={styles.headerSubtitle}>
          Créez votre itinéraire personnalisé en quelques étapes
        </Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Destination Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destination</Text>
          <TouchableOpacity
            style={styles.selectButton}
            activeOpacity={0.7}
            onPress={() => setShowDestinationPicker(true)}
          >
            <View style={styles.selectButtonLeft}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#B0CE88" />
              <Text style={styles.selectButtonText}>{destination}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Destination Modal */}
        <Modal
          visible={showDestinationPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDestinationPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Choisir une destination</Text>
                <TouchableOpacity
                  onPress={() => setShowDestinationPicker(false)}
                  style={styles.modalCloseButton}
                >
                  <MaterialCommunityIcons name="close" size={24} color="#B0CE88" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.destinationList}>
                {DESTINATIONS.map((dest) => (
                  <TouchableOpacity
                    key={dest.id}
                    style={[
                      styles.destinationItem,
                      destination === dest.name && styles.destinationItemActive
                    ]}
                    onPress={() => {
                      setDestination(dest.name);
                      setPreferences([]);
                      setShowDestinationPicker(false);
                    }}
                  >
                    <View style={styles.destinationIcon}>
                      <MaterialCommunityIcons
                        name={(dest.features[0]?.icon || 'map-marker') as any}
                        size={28}
                        color="#B0CE88"
                      />
                    </View>
                    <View style={styles.destinationInfo}>
                      <Text style={styles.destinationName}>{dest.name}</Text>
                      <Text style={styles.destinationNickname}>{dest.nickname}</Text>
                    </View>
                    {destination === dest.name && (
                      <View style={styles.checkIcon}>
                        <MaterialCommunityIcons name="check-circle" size={24} color="#B0CE88" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Dates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates du voyage</Text>
          <View style={styles.datesContainer}>
            {/* Start Date */}
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Départ</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <MaterialCommunityIcons name="calendar" size={18} color="#B0CE88" />
                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>

            <MaterialCommunityIcons name="arrow-right" size={20} color="#9CA3AF" style={{ marginTop: 28 }} />

            {/* End Date */}
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Retour</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <MaterialCommunityIcons name="calendar" size={18} color="#B0CE88" />
                <Text style={styles.dateText}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Duration Badge */}
          <View style={styles.durationBadge}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#B0CE88" />
            <Text style={styles.durationText}>
              {duration} jour{duration > 1 ? 's' : ''}
            </Text>
          </View>

          {/* Date Pickers */}
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onStartDateChange}
              minimumDate={new Date()}
            />
          )}
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onEndDateChange}
              minimumDate={startDate}
            />
          )}
        </View>

        {/* Budget Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégorie de budget</Text>
          <View style={styles.budgetGrid}>
            {BUDGET_CATEGORIES.map((cat) => {
              const isSelected = budgetCategory === cat.value;
              return (
                <TouchableOpacity
                  key={cat.value}
                  style={[
                    styles.budgetCard,
                    isSelected && styles.budgetCardActive
                  ]}
                  onPress={() => setBudgetCategory(cat.value)}
                >
                  <MaterialCommunityIcons
                    name={cat.icon as any}
                    size={24}
                    color={isSelected ? '#1A1A1A' : '#6B7280'}
                  />
                  <Text style={[styles.budgetLabel, isSelected && styles.budgetLabelActive]}>
                    {cat.label}
                  </Text>
                  <Text style={styles.budgetRange}>{cat.range}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Budget Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget précis (optionnel)</Text>
          <BudgetSelector
            value={budget}
            onChange={setBudget}
            minBudget={MIN_BUDGET}
            maxBudget={MAX_BUDGET}
            step={100}
            currency="DH"
             colors={{
               background: '#FFFBEB',
               surface: '#FFFFFF',
               primary: '#B0CE88',
               text: '#000000',
               textSecondary: '#6B7280',
               border: '#E5E7EB',
             }}
          />
        </View>

        {/* Transport Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moyen de transport</Text>
          <View style={styles.transportGrid}>
            {TRANSPORT_OPTIONS.map((opt) => {
              const isSelected = transport === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.transportCard,
                    isSelected && styles.transportCardActive
                  ]}
                  onPress={() => setTransport(opt.value)}
                >
                  <MaterialCommunityIcons
                    name={opt.icon as any}
                    size={28}
                    color={isSelected ? '#1A1A1A' : '#6B7280'}
                  />
                  <Text style={[styles.transportLabel, isSelected && styles.transportLabelActive]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Centres d&apos;intérêt</Text>
          <Text style={styles.sectionSubtitle}>
            Sélectionnez vos préférences pour {destination}
          </Text>

          <View style={styles.preferencesGrid}>
            {availablePreferences.map((pref) => {
              const isSelected = preferences.includes(pref.type);
              return (
                <TouchableOpacity
                  key={pref.type}
                  style={[
                    styles.preferenceCard,
                    isSelected && styles.preferenceCardActive
                  ]}
                  onPress={() => togglePreference(pref.type)}
                >
                  <MaterialCommunityIcons
                    name={pref.emoji as any}
                    size={32}
                    color={isSelected ? '#FFFFFF' : '#6B7280'}
                  />
                  <Text style={[styles.preferenceLabel, isSelected && styles.preferenceLabelActive]}>
                    {pref.label}
                  </Text>
                  {isSelected && (
                    <View style={styles.preferenceCheck}>
                      <MaterialCommunityIcons name="check" size={14} color="#1A1A1A" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Summary Card */}
        {preferences.length > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={22} color="#B0CE88" />
              <Text style={styles.summaryTitle}>Résumé de votre voyage</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Destination</Text>
                  <Text style={styles.summaryValue}>{destination}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Durée</Text>
                  <Text style={styles.summaryValue}>{duration} jours</Text>
                </View>
              </View>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Budget</Text>
                  <Text style={styles.summaryValue}>
                    {BUDGET_CATEGORIES.find(b => b.value === budgetCategory)?.label}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Transport</Text>
                  <Text style={styles.summaryValue}>
                    {TRANSPORT_OPTIONS.find(t => t.value === transport)?.label}
                  </Text>
                </View>
              </View>
              <View style={styles.summaryFullRow}>
                <Text style={styles.summaryLabel}>Centres d&apos;intérêt</Text>
                <Text style={styles.summaryValue}>
                  {preferences.length} sélectionné{preferences.length > 1 ? 's' : ''}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isGenerating && styles.submitButtonDisabled]}
          onPress={handleGenerateItinerary}
          activeOpacity={0.8}
          disabled={isGenerating}
        >
          <MaterialCommunityIcons
            name={isGenerating ? "loading" : "robot-happy-outline"}
            size={24}
            color="#FFFFFF"
          />
          <Text style={styles.submitText}>
            {isGenerating ? 'Génération en cours...' : 'Générer mon itinéraire'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
   headerTitle: {
     fontSize: 28,
     fontWeight: '700',
     color: '#000000',
     marginBottom: 8,
     textAlign: 'center',
   },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
   sectionTitle: {
     fontSize: 18,
     fontWeight: '700',
     color: '#000000',
     marginBottom: 12,
   },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
   selectButtonText: {
     fontSize: 16,
     fontWeight: '600',
     color: '#000000',
   },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
   modalTitle: {
     fontSize: 20,
     fontWeight: '700',
     color: '#000000',
   },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationList: {
    padding: 20,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#F9FAFB',
  },
  destinationItemActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#B0CE88',
  },
  destinationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destinationInfo: {
    flex: 1,
  },
   destinationName: {
     fontSize: 16,
     fontWeight: '700',
     color: '#000000',
     marginBottom: 4,
   },
  destinationNickname: {
    fontSize: 14,
    color: '#6B7280',
  },
  checkIcon: {
    marginLeft: 8,
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  dateBox: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
   dateText: {
     fontSize: 15,
     fontWeight: '600',
     color: '#000000',
   },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
   durationText: {
     fontSize: 14,
     fontWeight: '700',
     color: '#000000',
   },
  budgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  budgetCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  budgetCardActive: {
    backgroundColor: '#B0CE88',
    borderColor: '#B0CE88',
  },
   budgetLabel: {
     fontSize: 14,
     fontWeight: '700',
     color: '#000000',
     marginTop: 8,
     marginBottom: 4,
   },
  budgetLabelActive: {
    color: '#FFFFFF',
  },
  budgetRange: {
    fontSize: 12,
    color: '#6B7280',
  },
  transportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  transportCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  transportCardActive: {
    backgroundColor: '#B0CE88',
    borderColor: '#B0CE88',
  },
   transportLabel: {
     fontSize: 14,
     fontWeight: '700',
     color: '#000000',
     marginTop: 12,
   },
  transportLabelActive: {
    color: '#FFFFFF',
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  preferenceCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  preferenceCardActive: {
    backgroundColor: '#B0CE88',
    borderColor: '#B0CE88',
  },
   preferenceLabel: {
     fontSize: 12,
     fontWeight: '600',
     color: '#000000',
     textAlign: 'center',
     marginTop: 8,
   },
  preferenceLabelActive: {
    color: '#FFFFFF',
  },
  preferenceCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
   summaryTitle: {
     fontSize: 18,
     fontWeight: '700',
     color: '#000000',
   },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },
  summaryContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
  },
  summaryFullRow: {
    marginTop: 4,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
   summaryValue: {
     fontSize: 15,
     fontWeight: '700',
     color: '#000000',
   },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#B0CE88',
    borderRadius: 16,
    padding: 18,
    elevation: 3,
    shadowColor: '#B0CE88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

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
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  DESTINATIONS,
  PREFERENCES_BY_DESTINATION,
  type PreferenceType,
  type Preference
} from '../../mock';
import { BudgetSelector } from '../components/common/BudgetSelector';
import { useTheme } from '../context';

const MIN_BUDGET = 200;
const MAX_BUDGET = 10000;

// Budget categories matching the smart planner example
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
  { value: 'mixed', label: 'Mixte', icon: 'map' },
] as const;

type BudgetCategory = typeof BUDGET_CATEGORIES[number]['value'];
type TransportType = typeof TRANSPORT_OPTIONS[number]['value'];

export default function StartTravelScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, isDark, setTheme } = useTheme();

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

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <ScrollView style={[localStyles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={isDark ? [colors.primary, colors.secondary] : ['#2C5F2D', '#97BC62']}
        style={localStyles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={localStyles.headerContent}>
          <MaterialCommunityIcons name="brain" size={36} color="#FFFFFF" />
          <Text style={localStyles.headerTitle}>Planificateur IA</Text>
          <Text style={localStyles.headerSubtitle}>
            Créez votre voyage personnalisé au Maroc
          </Text>
        </View>
        
        {/* Theme Toggle */}
        <TouchableOpacity 
          style={localStyles.themeToggle}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Feather 
            name={isDark ? 'sun' : 'moon'} 
            size={20} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </LinearGradient>

      {/* Form Container */}
      <View style={localStyles.formContainer}>
        {/* Destination Section */}
        <View style={localStyles.formSection}>
          <View style={localStyles.labelContainer}>
            <Feather name="map-pin" size={18} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[localStyles.label, { color: colors.text }]}>Destination principale</Text>
          </View>
          <TouchableOpacity
            style={[localStyles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setShowDestinationPicker(true)}
          >
            <View style={localStyles.dropdownContent}>
              <View style={localStyles.dropdownLeft}>
                <MaterialCommunityIcons name="city-variant" size={22} color={colors.primary} />
                <Text style={[localStyles.dropdownText, { color: colors.text }]}>{destination}</Text>
              </View>
              <Feather name="chevron-down" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Destination Modal */}
        <Modal
          visible={showDestinationPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDestinationPicker(false)}
        >
          <View style={localStyles.modalOverlay}>
            <View style={[localStyles.modalContent, { backgroundColor: colors.card }]}>
              <View style={[localStyles.modalHeader, { borderBottomColor: colors.border }]}>
                <Text style={[localStyles.modalTitle, { color: colors.text }]}>Choisir une destination</Text>
                <TouchableOpacity
                  onPress={() => setShowDestinationPicker(false)}
                  style={localStyles.modalCloseButton}
                >
                  <Feather name="x" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={localStyles.destinationList}>
                {DESTINATIONS.map((dest) => (
                  <TouchableOpacity
                    key={dest.id}
                    style={[
                      localStyles.destinationItem,
                      { borderColor: colors.border },
                      destination === dest.name && { backgroundColor: colors.surface, borderColor: colors.primary }
                    ]}
                    onPress={() => {
                      setDestination(dest.name);
                      setPreferences([]);
                      setShowDestinationPicker(false);
                    }}
                  >
                    <View style={localStyles.destinationItemContent}>
                      <View style={[localStyles.destinationIcon, { backgroundColor: colors.surface }]}>
                        <Text style={localStyles.destinationEmoji}>
                          {dest.features[0]?.icon || '📍'}
                        </Text>
                      </View>
                      <View style={localStyles.destinationInfo}>
                        <Text style={[localStyles.destinationName, { color: colors.text }]}>{dest.name}</Text>
                        <Text style={[localStyles.destinationNickname, { color: colors.textSecondary }]}>{dest.nickname}</Text>
                      </View>
                      {destination === dest.name && (
                        <View style={[localStyles.checkCircle, { backgroundColor: colors.primary }]}>
                          <Feather name="check" size={16} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Dates Section */}
        <View style={localStyles.formSection}>
          <View style={localStyles.labelContainer}>
            <Feather name="calendar" size={18} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[localStyles.label, { color: colors.text }]}>Dates du voyage</Text>
          </View>
          <View style={localStyles.dateContainer}>
            {/* Start Date */}
            <View style={localStyles.dateInput}>
              <Text style={[localStyles.dateLabel, { color: colors.textSecondary }]}>Début</Text>
              <TouchableOpacity
                style={[localStyles.dateButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Feather name="calendar" size={18} color={colors.primary} />
                <Text style={[localStyles.dateButtonText, { color: colors.text }]}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>

            <Feather name="arrow-right" size={20} color={colors.textSecondary} style={{ marginTop: 28 }} />

            {/* End Date */}
            <View style={localStyles.dateInput}>
              <Text style={[localStyles.dateLabel, { color: colors.textSecondary }]}>Fin</Text>
              <TouchableOpacity
                style={[localStyles.dateButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Feather name="calendar" size={18} color={colors.primary} />
                <Text style={[localStyles.dateButtonText, { color: colors.text }]}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Duration Badge */}
          <View style={localStyles.durationBadgeContainer}>
            <View style={[localStyles.durationBadge, { backgroundColor: colors.success + '15', borderColor: colors.success }]}>
              <Feather name="clock" size={14} color={colors.success} />
              <Text style={[localStyles.durationText, { color: colors.success }]}>
                {duration} jour{duration > 1 ? 's' : ''}
              </Text>
            </View>
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
        <View style={localStyles.formSection}>
          <View style={localStyles.labelContainer}>
            <MaterialCommunityIcons name="cash-multiple" size={18} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[localStyles.label, { color: colors.text }]}>Catégorie de budget</Text>
          </View>
          <View style={localStyles.budgetGrid}>
            {BUDGET_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  localStyles.budgetCard,
                  { 
                    backgroundColor: colors.surface,
                    borderColor: budgetCategory === cat.value ? colors.primary : colors.border 
                  },
                  budgetCategory === cat.value && { backgroundColor: colors.primary + '10' }
                ]}
                onPress={() => setBudgetCategory(cat.value)}
              >
                <MaterialCommunityIcons 
                  name={cat.icon as any} 
                  size={24} 
                  color={budgetCategory === cat.value ? colors.primary : colors.textSecondary} 
                />
                <Text style={[
                  localStyles.budgetLabel,
                  { color: budgetCategory === cat.value ? colors.primary : colors.text }
                ]}>
                  {cat.label}
                </Text>
                <Text style={[localStyles.budgetRange, { color: colors.textSecondary }]}>
                  {cat.range}
                </Text>
                {budgetCategory === cat.value && (
                  <View style={[localStyles.budgetCheck, { backgroundColor: colors.primary }]}>
                    <Feather name="check" size={12} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Budget Slider */}
        <View style={localStyles.formSection}>
          <View style={localStyles.labelContainer}>
            <MaterialCommunityIcons name="chart-line" size={18} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[localStyles.label, { color: colors.text }]}>Budget précis (optionnel)</Text>
          </View>
          <BudgetSelector
            value={budget}
            onChange={setBudget}
            minBudget={MIN_BUDGET}
            maxBudget={MAX_BUDGET}
            step={100}
            currency="DH"
          />
        </View>

        {/* Transport Section */}
        <View style={localStyles.formSection}>
          <View style={localStyles.labelContainer}>
            <MaterialCommunityIcons name="car-side" size={18} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[localStyles.label, { color: colors.text }]}>Moyen de transport</Text>
          </View>
          <View style={localStyles.transportGrid}>
            {TRANSPORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  localStyles.transportCard,
                  { 
                    backgroundColor: colors.surface,
                    borderColor: transport === opt.value ? colors.primary : colors.border 
                  },
                  transport === opt.value && { backgroundColor: colors.primary + '10' }
                ]}
                onPress={() => setTransport(opt.value)}
              >
                <MaterialCommunityIcons 
                  name={opt.icon as any} 
                  size={28} 
                  color={transport === opt.value ? colors.primary : colors.textSecondary} 
                />
                <Text style={[
                  localStyles.transportLabel,
                  { color: transport === opt.value ? colors.primary : colors.text }
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={localStyles.formSection}>
          <View style={localStyles.labelContainer}>
            <MaterialCommunityIcons name="heart-multiple" size={18} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[localStyles.label, { color: colors.text }]}>Centres d'intérêt</Text>
          </View>
          <Text style={[localStyles.sublabel, { color: colors.textSecondary }]}>
            Sélectionnez vos préférences pour {destination}
          </Text>

          <View style={localStyles.preferencesGrid}>
            {availablePreferences.map((pref) => {
              const isSelected = preferences.includes(pref.type);
              return (
                <TouchableOpacity
                  key={pref.type}
                  style={[
                    localStyles.preferenceCard,
                    { 
                      backgroundColor: colors.surface,
                      borderColor: isSelected ? colors.primary : colors.border 
                    },
                    isSelected && { backgroundColor: colors.primary + '10' }
                  ]}
                  onPress={() => togglePreference(pref.type)}
                >
                  <View style={localStyles.preferenceHeader}>
                    <MaterialCommunityIcons 
                      name={pref.emoji as any} 
                      size={28} 
                      color={isSelected ? colors.primary : colors.textSecondary} 
                    />
                    {isSelected && (
                      <View style={[localStyles.preferenceCheck, { backgroundColor: colors.primary }]}>
                        <Feather name="check" size={12} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  <Text style={[localStyles.preferenceLabel, { color: colors.text }]}>
                    {pref.label}
                  </Text>
                  <Text style={[localStyles.preferenceDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                    {pref.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Summary Card */}
        {preferences.length > 0 && (
          <View style={[localStyles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={localStyles.summaryHeader}>
              <MaterialCommunityIcons name="clipboard-text" size={20} color={colors.primary} />
              <Text style={[localStyles.summaryTitle, { color: colors.text }]}>
                Résumé de votre voyage
              </Text>
            </View>
            <View style={localStyles.summaryContent}>
              <View style={localStyles.summaryItem}>
                <Feather name="map-pin" size={14} color={colors.textSecondary} />
                <Text style={[localStyles.summaryLabel, { color: colors.textSecondary }]}>Destination</Text>
                <Text style={[localStyles.summaryValue, { color: colors.text }]}>{destination}</Text>
              </View>
              <View style={localStyles.summaryItem}>
                <Feather name="calendar" size={14} color={colors.textSecondary} />
                <Text style={[localStyles.summaryLabel, { color: colors.textSecondary }]}>Durée</Text>
                <Text style={[localStyles.summaryValue, { color: colors.text }]}>{duration} jours</Text>
              </View>
              <View style={localStyles.summaryItem}>
                <MaterialCommunityIcons name="wallet" size={14} color={colors.textSecondary} />
                <Text style={[localStyles.summaryLabel, { color: colors.textSecondary }]}>Budget</Text>
                <Text style={[localStyles.summaryValue, { color: colors.text }]}>
                  {BUDGET_CATEGORIES.find(b => b.value === budgetCategory)?.label}
                </Text>
              </View>
              <View style={localStyles.summaryItem}>
                <MaterialCommunityIcons name="car" size={14} color={colors.textSecondary} />
                <Text style={[localStyles.summaryLabel, { color: colors.textSecondary }]}>Transport</Text>
                <Text style={[localStyles.summaryValue, { color: colors.text }]}>
                  {TRANSPORT_OPTIONS.find(t => t.value === transport)?.label}
                </Text>
              </View>
              <View style={localStyles.summaryItem}>
                <MaterialCommunityIcons name="heart" size={14} color={colors.textSecondary} />
                <Text style={[localStyles.summaryLabel, { color: colors.textSecondary }]}>Intérêts</Text>
                <Text style={[localStyles.summaryValue, { color: colors.text }]}>
                  {preferences.length} sélectionné{preferences.length > 1 ? 's' : ''}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[localStyles.submitButton, { opacity: isGenerating ? 0.7 : 1 }]}
          onPress={handleGenerateItinerary}
          activeOpacity={0.8}
          disabled={isGenerating}
        >
          <LinearGradient
            colors={isDark ? [colors.primary, colors.secondary] : ['#2C5F2D', '#97BC62']}
            style={localStyles.submitGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialCommunityIcons name="robot-happy" size={24} color="#FFFFFF" />
            <Text style={localStyles.submitText}>
              {isGenerating ? 'Génération en cours...' : 'Générer mon itinéraire IA'}
            </Text>
            {isGenerating && <MaterialCommunityIcons name="loading" size={20} color="#FFFFFF" />}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
    position: 'relative',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 16,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
  },
  formSection: {
    marginBottom: 28,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
  },
  sublabel: {
    fontSize: 13,
    marginTop: -6,
    marginBottom: 12,
  },
  dropdown: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dropdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalCloseButton: {
    padding: 4,
  },
  destinationList: {
    padding: 16,
  },
  destinationItem: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    marginBottom: 12,
  },
  destinationItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destinationEmoji: {
    fontSize: 24,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  destinationNickname: {
    fontSize: 13,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '500',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  dateButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  durationBadgeContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  budgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  budgetCard: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    position: 'relative',
  },
  budgetLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  budgetRange: {
    fontSize: 12,
  },
  budgetCheck: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  transportCard: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  transportLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  preferenceCard: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    padding: 14,
    position: 'relative',
  },
  preferenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  preferenceCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 11,
    lineHeight: 16,
  },
  summaryCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryContent: {
    gap: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    fontSize: 13,
    flex: 1,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 12,
    marginBottom: 24,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 14,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

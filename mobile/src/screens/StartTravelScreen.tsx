import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

type BudgetType = 'SMALL' | 'MEDIUM' | 'LARGE';
type PreferenceType = 'CULTURE' | 'NATURE' | 'GASTRONOMY';

export default function StartTravelScreen() {
  const navigation = useNavigation();
  const [destination] = useState('Tétouan');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // +7 jours
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [budget, setBudget] = useState<BudgetType>('MEDIUM');
  const [preferences, setPreferences] = useState<PreferenceType[]>([]);

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
    // Validation simple
    if (preferences.length === 0) {
      alert('Veuillez sélectionner au moins une préférence');
      return;
    }

    // Log des données (pour debug)
    console.log({
      destination,
      startDate,
      endDate,
      budget,
      preferences,
    });

    // Navigation vers la page itinéraire
    navigation.navigate('Itinerary' as never, { id: '1' } as never);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#2C5F2D', '#97BC62']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerEmoji}>✈️</Text>
        <Text style={styles.headerTitle}>Commencer un Voyage</Text>
        <Text style={styles.headerSubtitle}>
          Planifiez votre aventure au Maroc
        </Text>
      </LinearGradient>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Destination */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Destination</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>📍 {destination}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Dates */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Dates du voyage</Text>
          <View style={styles.dateContainer}>
            {/* Date de début */}
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>Début</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.dateButtonIcon}>📅</Text>
                <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.dateArrow}>→</Text>

            {/* Date de fin */}
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>Fin</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.dateButtonIcon}>📅</Text>
                <Text style={styles.dateButtonText}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
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

        {/* Budget */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Budget</Text>
          <View style={styles.budgetContainer}>
            <TouchableOpacity
              style={[
                styles.budgetOption,
                budget === 'SMALL' && styles.budgetOptionActive,
              ]}
              onPress={() => setBudget('SMALL')}
            >
              <Text
                style={[
                  styles.budgetEmoji,
                  budget === 'SMALL' && styles.budgetEmojiActive,
                ]}
              >
                💰
              </Text>
              <Text
                style={[
                  styles.budgetLabel,
                  budget === 'SMALL' && styles.budgetLabelActive,
                ]}
              >
                Petit
              </Text>
              <Text
                style={[
                  styles.budgetAmount,
                  budget === 'SMALL' && styles.budgetAmountActive,
                ]}
              >
                {'<'}500dh
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.budgetOption,
                budget === 'MEDIUM' && styles.budgetOptionActive,
              ]}
              onPress={() => setBudget('MEDIUM')}
            >
              <Text
                style={[
                  styles.budgetEmoji,
                  budget === 'MEDIUM' && styles.budgetEmojiActive,
                ]}
              >
                💰💰
              </Text>
              <Text
                style={[
                  styles.budgetLabel,
                  budget === 'MEDIUM' && styles.budgetLabelActive,
                ]}
              >
                Moyen
              </Text>
              <Text
                style={[
                  styles.budgetAmount,
                  budget === 'MEDIUM' && styles.budgetAmountActive,
                ]}
              >
                500-1000dh
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.budgetOption,
                budget === 'LARGE' && styles.budgetOptionActive,
              ]}
              onPress={() => setBudget('LARGE')}
            >
              <Text
                style={[
                  styles.budgetEmoji,
                  budget === 'LARGE' && styles.budgetEmojiActive,
                ]}
              >
                💰💰💰
              </Text>
              <Text
                style={[
                  styles.budgetLabel,
                  budget === 'LARGE' && styles.budgetLabelActive,
                ]}
              >
                Grand
              </Text>
              <Text
                style={[
                  styles.budgetAmount,
                  budget === 'LARGE' && styles.budgetAmountActive,
                ]}
              >
                {'>'}1000dh
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Préférences */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Préférences</Text>
          <Text style={styles.sublabel}>Sélectionnez vos centres d&quot;intérêt</Text>

          <TouchableOpacity
            style={[
              styles.checkbox,
              preferences.includes('CULTURE') && styles.checkboxActive,
            ]}
            onPress={() => togglePreference('CULTURE')}
          >
            <View
              style={[
                styles.checkboxBox,
                preferences.includes('CULTURE') && styles.checkboxBoxActive,
              ]}
            >
              {preferences.includes('CULTURE') && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxEmoji}>🏛️</Text>
              <View>
                <Text style={styles.checkboxLabel}>Culture et Histoire</Text>
                <Text style={styles.checkboxDescription}>
                  Médinas, musées, sites historiques
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.checkbox,
              preferences.includes('NATURE') && styles.checkboxActive,
            ]}
            onPress={() => togglePreference('NATURE')}
          >
            <View
              style={[
                styles.checkboxBox,
                preferences.includes('NATURE') && styles.checkboxBoxActive,
              ]}
            >
              {preferences.includes('NATURE') && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxEmoji}>⛰️</Text>
              <View>
                <Text style={styles.checkboxLabel}>Nature et Sport</Text>
                <Text style={styles.checkboxDescription}>
                  Randonnées, plages, montagnes
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.checkbox,
              preferences.includes('GASTRONOMY') && styles.checkboxActive,
            ]}
            onPress={() => togglePreference('GASTRONOMY')}
          >
            <View
              style={[
                styles.checkboxBox,
                preferences.includes('GASTRONOMY') && styles.checkboxBoxActive,
              ]}
            >
              {preferences.includes('GASTRONOMY') && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxEmoji}>🍽️</Text>
              <View>
                <Text style={styles.checkboxLabel}>Gastronomie</Text>
                <Text style={styles.checkboxDescription}>
                  Restaurants, marchés, cuisine locale
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleGenerateItinerary}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#2C5F2D', '#97BC62']}
            style={styles.submitGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.submitText}>Générer mon itinéraire</Text>
            <Text style={styles.submitIcon}>✨</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});


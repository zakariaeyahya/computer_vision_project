import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { DESTINATIONS, PREFERENCES_BY_DESTINATION, type PreferenceType } from '../../mock';
import { startTravelStyles as styles } from '../styles/startTravelStyles';

type BudgetType = 'SMALL' | 'MEDIUM' | 'LARGE';

export default function StartTravelScreen() {
  const navigation = useNavigation();
  const [destination, setDestination] = useState(DESTINATIONS[0].name);
  const [showDestinationPicker, setShowDestinationPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // +7 days
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [budget, setBudget] = useState<BudgetType>('MEDIUM');
  const [preferences, setPreferences] = useState<PreferenceType[]>([]);

  // Get available preferences based on the selected destination
  const getPreferencesForDestination = () => {
    return PREFERENCES_BY_DESTINATION[destination] || PREFERENCES_BY_DESTINATION['Tétouan'];
  };

  const availablePreferences = getPreferencesForDestination();

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
    // Simple validation
    if (preferences.length === 0) {
      Alert.alert('Attention', 'Veuillez sélectionner au moins une préférence');
      return;
    }

    // Calculate duration in days
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Debug: Log what we're sending
    console.log('StartTravelScreen - Navigation vers Itinerary avec:', {
      destination,
      duration,
      budget,
      preferences,
    });

    // Navigate to itinerary page with selected parameters
    // @ts-expect-error - Navigation typing to be fixed
    navigation.navigate('Itinerary', {
      destination,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      duration,
      budget,
      preferences,
    });
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
          <TouchableOpacity 
            style={styles.dropdown}
            activeOpacity={0.7}
            onPress={() => setShowDestinationPicker(true)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text style={styles.dropdownText}>📍 {destination}</Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Destination selection modal */}
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
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.destinationList}>
                {DESTINATIONS.map((dest, index) => (
                  <TouchableOpacity
                    key={dest.id}
                    style={[
                      styles.destinationItem,
                      destination === dest.name && styles.destinationItemActive,
                    ]}
                    onPress={() => {
                      setDestination(dest.name);
                      setPreferences([]); // Reset preferences when destination changes
                      setShowDestinationPicker(false);
                    }}
                  >
                    <View style={styles.destinationItemContent}>
                      <Text style={styles.destinationEmoji}>
                        {dest.features[0]?.icon || '📍'}
                      </Text>
                      <View style={styles.destinationInfo}>
                      <Text style={styles.destinationName}>
                        {dest.name}
                        </Text>
                        <Text style={styles.destinationNickname}>
                          {dest.nickname}
                        </Text>
                      </View>
                      {destination === dest.name && (
                        <Text style={styles.destinationCheck}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Dates */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Travel Dates</Text>
          <View style={styles.dateContainer}>
            {/* Start date */}
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>Start</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.dateButtonIcon}>📅</Text>
                <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.dateArrow}>→</Text>

            {/* End date */}
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>End</Text>
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

        {/* Preferences */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Preferences for {destination}</Text>
          <Text style={styles.sublabel}>Select your interests</Text>

          {availablePreferences.map((pref) => (
            <TouchableOpacity
              key={pref.type}
              style={[
                styles.checkbox,
                preferences.includes(pref.type) && styles.checkboxActive,
              ]}
              onPress={() => togglePreference(pref.type)}
            >
              <View
                style={[
                  styles.checkboxBox,
                  preferences.includes(pref.type) && styles.checkboxBoxActive,
                ]}
              >
                {preferences.includes(pref.type) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <View style={styles.checkboxContent}>
                <Text style={styles.checkboxEmoji}>{pref.emoji}</Text>
                <View>
                  <Text style={styles.checkboxLabel}>{pref.label}</Text>
                  <Text style={styles.checkboxDescription}>
                    {pref.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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

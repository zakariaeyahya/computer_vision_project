/**
 * TravelPreferencesScreen
 *
 * Screen for managing user travel preferences
 * Features:
 * - Budget level selection
 * - Interests multi-selection
 * - Travel style selection
 * - Accommodation type
 * - Group size preferences
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  MOCK_USER_PROFILE,
  BUDGET_LEVELS,
  AVAILABLE_INTERESTS,
  TRAVEL_STYLES,
  type Interest,
} from '../../../mock';
import { travelPreferencesStyles as styles } from '../../styles/travelPreferencesStyles';

type BudgetLevel = 'SMALL' | 'MEDIUM' | 'LARGE';
type AccommodationType = 'hotel' | 'hostel' | 'airbnb' | 'camping';
type GroupSize = 'solo' | 'couple' | 'family' | 'group';

export default function TravelPreferencesScreen() {
  const navigation = useNavigation();

  // State
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>(
    MOCK_USER_PROFILE.travelPreferences.budgetLevel
  );
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(
    MOCK_USER_PROFILE.travelPreferences.interests
  );
  const [travelStyle, setTravelStyle] = useState<string | undefined>(
    MOCK_USER_PROFILE.travelPreferences.travelStyle
  );
  const [accommodationType, setAccommodationType] = useState<AccommodationType | undefined>(
    MOCK_USER_PROFILE.travelPreferences.accommodationType
  );
  const [groupSize, setGroupSize] = useState<GroupSize | undefined>(
    MOCK_USER_PROFILE.travelPreferences.groupSize
  );

  const [hasChanges, setHasChanges] = useState(false);

  /**
   * Toggle interest selection
   */
  const toggleInterest = (interest: Interest) => {
    setHasChanges(true);
    const isSelected = selectedInterests.some(i => i.id === interest.id);

    if (isSelected) {
      setSelectedInterests(selectedInterests.filter(i => i.id !== interest.id));
    } else {
      if (selectedInterests.length >= 8) {
        Alert.alert('Limite atteinte', 'Vous pouvez sélectionner maximum 8 centres d\'intérêt');
        return;
      }
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  /**
   * Check if interest is selected
   */
  const isInterestSelected = (interestId: string): boolean => {
    return selectedInterests.some(i => i.id === interestId);
  };

  /**
   * Handle budget level change
   */
  const handleBudgetChange = (level: BudgetLevel) => {
    setBudgetLevel(level);
    setHasChanges(true);
  };

  /**
   * Handle travel style change
   */
  const handleTravelStyleChange = (styleId: string) => {
    setTravelStyle(styleId);
    setHasChanges(true);
  };

  /**
   * Handle accommodation type change
   */
  const handleAccommodationChange = (type: AccommodationType) => {
    setAccommodationType(type);
    setHasChanges(true);
  };

  /**
   * Handle group size change
   */
  const handleGroupSizeChange = (size: GroupSize) => {
    setGroupSize(size);
    setHasChanges(true);
  };

  /**
   * Handle save
   */
  const handleSave = () => {
    if (selectedInterests.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins un centre d\'intérêt');
      return;
    }

    // Save logic here
    console.log('Saving preferences:', {
      budgetLevel,
      selectedInterests,
      travelStyle,
      accommodationType,
      groupSize,
    });

    Alert.alert('Succès', 'Vos préférences ont été mises à jour', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
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
            <Text style={styles.headerTitle}>Préférences de Voyage</Text>
            <Text style={styles.headerSubtitle}>Personnalisez vos voyages</Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Budget Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Budget habituel</Text>
          <Text style={styles.sectionSubtitle}>Sélectionnez votre gamme de budget</Text>

          <View style={styles.budgetContainer}>
            {(Object.keys(BUDGET_LEVELS) as BudgetLevel[]).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.budgetOption,
                  budgetLevel === level && styles.budgetOptionActive,
                ]}
                onPress={() => handleBudgetChange(level)}
                activeOpacity={0.7}
              >
                <Text style={styles.budgetEmoji}>
                  {BUDGET_LEVELS[level].emoji}
                </Text>
                <Text
                  style={[
                    styles.budgetLabel,
                    budgetLevel === level && styles.budgetLabelActive,
                  ]}
                >
                  {BUDGET_LEVELS[level].label}
                </Text>
                <Text
                  style={[
                    styles.budgetRange,
                    budgetLevel === level && styles.budgetRangeActive,
                  ]}
                >
                  {BUDGET_LEVELS[level].range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❤️ Centres d`&apos;intérêt</Text>
          <Text style={styles.sectionSubtitle}>
            Sélectionnez jusqu`&apos;à 8 centres d`&apos;intérêt ({selectedInterests.length}/8)
          </Text>

          <View style={styles.interestsGrid}>
            {AVAILABLE_INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestChip,
                  isInterestSelected(interest.id) && styles.interestChipActive,
                ]}
                onPress={() => toggleInterest(interest)}
                activeOpacity={0.7}
              >
                <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                <Text
                  style={[
                    styles.interestLabel,
                    isInterestSelected(interest.id) && styles.interestLabelActive,
                  ]}
                >
                  {interest.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Travel Style Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎒 Style de voyage</Text>
          <Text style={styles.sectionSubtitle}>Quel type de voyageur êtes-vous ?</Text>

          <View style={styles.stylesContainer}>
            {TRAVEL_STYLES.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleCard,
                  travelStyle === style.id && styles.styleCardActive,
                ]}
                onPress={() => handleTravelStyleChange(style.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.styleEmoji}>{style.emoji}</Text>
                <Text
                  style={[
                    styles.styleLabel,
                    travelStyle === style.id && styles.styleLabelActive,
                  ]}
                >
                  {style.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accommodation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏨 Type d`&apos;hébergement</Text>
          <Text style={styles.sectionSubtitle}>Votre préférence d`&apos;hébergement</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                accommodationType === 'hotel' && styles.optionButtonActive,
              ]}
              onPress={() => handleAccommodationChange('hotel')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>🏨</Text>
              <Text
                style={[
                  styles.optionLabel,
                  accommodationType === 'hotel' && styles.optionLabelActive,
                ]}
              >
                Hôtel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                accommodationType === 'hostel' && styles.optionButtonActive,
              ]}
              onPress={() => handleAccommodationChange('hostel')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>🛏️</Text>
              <Text
                style={[
                  styles.optionLabel,
                  accommodationType === 'hostel' && styles.optionLabelActive,
                ]}
              >
                Auberge
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                accommodationType === 'airbnb' && styles.optionButtonActive,
              ]}
              onPress={() => handleAccommodationChange('airbnb')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>🏠</Text>
              <Text
                style={[
                  styles.optionLabel,
                  accommodationType === 'airbnb' && styles.optionLabelActive,
                ]}
              >
                Airbnb
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                accommodationType === 'camping' && styles.optionButtonActive,
              ]}
              onPress={() => handleAccommodationChange('camping')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>⛺</Text>
              <Text
                style={[
                  styles.optionLabel,
                  accommodationType === 'camping' && styles.optionLabelActive,
                ]}
              >
                Camping
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Group Size Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Taille du groupe</Text>
          <Text style={styles.sectionSubtitle}>Avec qui voyagez-vous habituellement ?</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                groupSize === 'solo' && styles.optionButtonActive,
              ]}
              onPress={() => handleGroupSizeChange('solo')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>🧍</Text>
              <Text
                style={[
                  styles.optionLabel,
                  groupSize === 'solo' && styles.optionLabelActive,
                ]}
              >
                Solo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                groupSize === 'couple' && styles.optionButtonActive,
              ]}
              onPress={() => handleGroupSizeChange('couple')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>💑</Text>
              <Text
                style={[
                  styles.optionLabel,
                  groupSize === 'couple' && styles.optionLabelActive,
                ]}
              >
                Couple
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                groupSize === 'family' && styles.optionButtonActive,
              ]}
              onPress={() => handleGroupSizeChange('family')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>👨‍👩‍👧‍👦</Text>
              <Text
                style={[
                  styles.optionLabel,
                  groupSize === 'family' && styles.optionLabelActive,
                ]}
              >
                Famille
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                groupSize === 'group' && styles.optionButtonActive,
              ]}
              onPress={() => handleGroupSizeChange('group')}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>👥</Text>
              <Text
                style={[
                  styles.optionLabel,
                  groupSize === 'group' && styles.optionLabelActive,
                ]}
              >
                Groupe
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        {hasChanges && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2C5F2D', '#97BC62']}
              style={styles.saveGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveButtonText}>💾 Enregistrer les modifications</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

/**
 * PersonalInfoScreen
 *
 * Screen for displaying and editing user personal information
 * Features:
 * - View mode with editable fields
 * - Inline editing with validation
 * - Save/Cancel actions
 * - Country and language picker modals
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MOCK_USER_PROFILE } from '../../../mock';
import { personalInfoStyles as styles } from '../../styles/personalInfoStyles';

// Available countries
const COUNTRIES = [
  { flag: '🇲🇦', name: 'Maroc' },
  { flag: '🇪🇸', name: 'Espagne' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇩🇪', name: 'Allemagne' },
  { flag: '🇮🇹', name: 'Italie' },
  { flag: '🇬🇧', name: 'Royaume-Uni' },
  { flag: '🇺🇸', name: 'États-Unis' },
];

// Available languages
const LANGUAGES = [
  'Français',
  'Espagnol',
  'Anglais',
  'Arabe',
  'Allemand',
  'Italien',
];

export default function PersonalInfoScreen() {
  const navigation = useNavigation();

  // State for form fields
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(MOCK_USER_PROFILE.personalInfo.fullName);
  const [email, setEmail] = useState(MOCK_USER_PROFILE.personalInfo.email || '');
  const [phone, setPhone] = useState(MOCK_USER_PROFILE.personalInfo.phone || '');
  const [country, setCountry] = useState(MOCK_USER_PROFILE.personalInfo.country);
  const [language, setLanguage] = useState(MOCK_USER_PROFILE.personalInfo.language);

  // Modal states
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  // Original values for cancel action
  const [originalValues] = useState({
    fullName: MOCK_USER_PROFILE.personalInfo.fullName,
    email: MOCK_USER_PROFILE.personalInfo.email || '',
    phone: MOCK_USER_PROFILE.personalInfo.phone || '',
    country: MOCK_USER_PROFILE.personalInfo.country,
    language: MOCK_USER_PROFILE.personalInfo.language,
  });

  /**
   * Handle save action
   */
  const handleSave = () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Erreur', 'Le nom complet est requis');
      return;
    }

    if (email && !isValidEmail(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
      return;
    }

    Alert.alert('Succès', 'Vos informations ont été mises à jour', [
      {
        text: 'OK',
        onPress: () => setIsEditing(false),
      },
    ]);
  };

  /**
   * Handle cancel action
   */
  const handleCancel = () => {
    setFullName(originalValues.fullName);
    setEmail(originalValues.email);
    setPhone(originalValues.phone);
    setCountry(originalValues.country);
    setLanguage(originalValues.language);
    setIsEditing(false);
  };

  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
            <Text style={styles.headerTitle}>Informations Personnelles</Text>
            <Text style={styles.headerSubtitle}>Gérer vos données</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
            activeOpacity={0.7}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? '✕' : '✎'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nom complet *</Text>
            <TextInput
              style={[
                styles.input,
                isEditing && styles.inputEditable,
              ]}
              value={fullName}
              onChangeText={setFullName}
              editable={isEditing}
              placeholder="Entrez votre nom complet"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={[
                styles.input,
                isEditing && styles.inputEditable,
              ]}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              placeholder="exemple@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Téléphone</Text>
            <TextInput
              style={[
                styles.input,
                isEditing && styles.inputEditable,
              ]}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              placeholder="+212 XXX XXX XXX"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          {/* Country */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Pays *</Text>
            <TouchableOpacity
              style={[
                styles.pickerButton,
                isEditing && styles.pickerButtonEditable,
              ]}
              onPress={() => isEditing && setShowCountryPicker(true)}
              disabled={!isEditing}
              activeOpacity={0.7}
            >
              <Text style={styles.pickerButtonText}>
                {country.flag} {country.name}
              </Text>
              {isEditing && <Text style={styles.pickerArrow}>▼</Text>}
            </TouchableOpacity>
          </View>

          {/* Language */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Langue *</Text>
            <TouchableOpacity
              style={[
                styles.pickerButton,
                isEditing && styles.pickerButtonEditable,
              ]}
              onPress={() => isEditing && setShowLanguagePicker(true)}
              disabled={!isEditing}
              activeOpacity={0.7}
            >
              <Text style={styles.pickerButtonText}>{language}</Text>
              {isEditing && <Text style={styles.pickerArrow}>▼</Text>}
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionsContainer}>
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
                <Text style={styles.saveButtonText}>💾 Enregistrer</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Les champs marqués d&apos;un astérisque (*) sont obligatoires
          </Text>
        </View>
      </ScrollView>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisir un pays</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowCountryPicker(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalList}>
              {COUNTRIES.map((c) => (
                <TouchableOpacity
                  key={c.name}
                  style={[
                    styles.modalItem,
                    country.name === c.name && styles.modalItemActive,
                  ]}
                  onPress={() => {
                    setCountry(c);
                    setShowCountryPicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalItemText}>
                    {c.flag} {c.name}
                  </Text>
                  {country.name === c.name && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Language Picker Modal */}
      <Modal
        visible={showLanguagePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisir une langue</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowLanguagePicker(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalList}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.modalItem,
                    language === lang && styles.modalItemActive,
                  ]}
                  onPress={() => {
                    setLanguage(lang);
                    setShowLanguagePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalItemText}>{lang}</Text>
                  {language === lang && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

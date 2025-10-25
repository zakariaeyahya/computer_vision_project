/**
 * SettingsScreen
 *
 * Screen for managing application settings
 * Features:
 * - Notification preferences
 * - Language selection
 * - Theme selection
 * - Privacy settings
 * - Data and sync settings
 * - App information
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  MOCK_USER_PROFILE,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
  PRIVACY_OPTIONS,
  APP_INFO,
} from '../../../mock';
import { settingsStyles as styles } from '../../styles/settingsStyles';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const userSettings = MOCK_USER_PROFILE.settings;

  // State
  const [language] = useState(userSettings.language);
  const [theme, setTheme] = useState(userSettings.theme);
  const [privacy, setPrivacy] = useState(userSettings.privacy);
  const [notifications, setNotifications] = useState(userSettings.notifications);
  const [tripReminders, setTripReminders] = useState(userSettings.notificationSettings?.tripReminders || false);
  const [promotions, setPromotions] = useState(userSettings.notificationSettings?.promotions || false);
  const [recommendations, setRecommendations] = useState(userSettings.notificationSettings?.recommendations || false);
  const [messages, setMessages] = useState(userSettings.notificationSettings?.messages || false);
  const [emailNotifications, setEmailNotifications] = useState(userSettings.notificationSettings?.emailNotifications || false);
  const [pushNotifications, setPushNotifications] = useState(userSettings.notificationSettings?.pushNotifications || false);
  const [dataSharing, setDataSharing] = useState(userSettings.dataSharing || false);
  const [locationServices, setLocationServices] = useState(userSettings.locationServices || false);
  const [offlineMode, setOfflineMode] = useState(userSettings.offlineMode || false);
  const [autoSync, setAutoSync] = useState(userSettings.autoSync || false);

  const [hasChanges, setHasChanges] = useState(false);

  /**
   * Handle save settings
   */
  const handleSave = () => {


    Alert.alert('Succès', 'Vos paramètres ont été mis à jour', [
      {
        text: 'OK',
        onPress: () => {
          setHasChanges(false);
          navigation.goBack();
        },
      },
    ]);
  };

  /**
   * Get current language label
   */
  const getCurrentLanguage = () => {
    return LANGUAGE_OPTIONS.find(lang => lang.id === language);
  };

  /**
   * Get current theme label
   */
  const _getCurrentTheme = () => {
    return THEME_OPTIONS.find(t => t.id === theme);
  };

  /**
   * Get current privacy label
   */
  const _getCurrentPrivacy = () => {
    return PRIVACY_OPTIONS.find(p => p.id === privacy);
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
            <Text style={styles.headerTitle}>Paramètres</Text>
            <Text style={styles.headerSubtitle}>Configuration de l`&apos;app</Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>

          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Activer les notifications</Text>
                <Text style={styles.settingDescription}>Recevoir toutes les notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={(value) => {
                  setNotifications(value);
                  setHasChanges(true);
                }}
                trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                thumbColor={notifications ? '#2C5F2D' : '#F3F4F6'}
              />
            </View>

            {notifications && (
              <>
                <View style={styles.divider} />

                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Rappels de voyage</Text>
                  <Switch
                    value={tripReminders}
                    onValueChange={(value) => {
                      setTripReminders(value);
                      setHasChanges(true);
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                    thumbColor={tripReminders ? '#2C5F2D' : '#F3F4F6'}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Promotions</Text>
                  <Switch
                    value={promotions}
                    onValueChange={(value) => {
                      setPromotions(value);
                      setHasChanges(true);
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                    thumbColor={promotions ? '#2C5F2D' : '#F3F4F6'}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Recommandations</Text>
                  <Switch
                    value={recommendations}
                    onValueChange={(value) => {
                      setRecommendations(value);
                      setHasChanges(true);
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                    thumbColor={recommendations ? '#2C5F2D' : '#F3F4F6'}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Messages</Text>
                  <Switch
                    value={messages}
                    onValueChange={(value) => {
                      setMessages(value);
                      setHasChanges(true);
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                    thumbColor={messages ? '#2C5F2D' : '#F3F4F6'}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Notifications email</Text>
                  <Switch
                    value={emailNotifications}
                    onValueChange={(value) => {
                      setEmailNotifications(value);
                      setHasChanges(true);
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                    thumbColor={emailNotifications ? '#2C5F2D' : '#F3F4F6'}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Notifications push</Text>
                  <Switch
                    value={pushNotifications}
                    onValueChange={(value) => {
                      setPushNotifications(value);
                      setHasChanges(true);
                    }}
                    trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                    thumbColor={pushNotifications ? '#2C5F2D' : '#F3F4F6'}
                  />
                </View>
              </>
            )}
          </View>
        </View>

        {/* Language & Region Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Langue et région</Text>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => Alert.alert('Sélection de langue', 'Fonctionnalité à venir')}
              activeOpacity={0.7}
            >
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Langue de l`&apos;application</Text>
                <Text style={styles.settingValue}>
                  {getCurrentLanguage()?.flag} {getCurrentLanguage()?.label}
                </Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Apparence</Text>

          <View style={styles.card}>
            <View style={styles.themeOptions}>
              {THEME_OPTIONS.map((themeOption) => (
                <TouchableOpacity
                  key={themeOption.id}
                  style={[
                    styles.themeOption,
                    theme === themeOption.id && styles.themeOptionActive,
                  ]}
                  onPress={() => {
                    setTheme(themeOption.id as 'light' | 'dark' | 'auto');
                    setHasChanges(true);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.themeEmoji}>{themeOption.emoji}</Text>
                  <Text
                    style={[
                      styles.themeLabel,
                      theme === themeOption.id && styles.themeLabelActive,
                    ]}
                  >
                    {themeOption.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Confidentialité</Text>

          <View style={styles.card}>
            {PRIVACY_OPTIONS.map((privacyOption, index) => (
              <View key={privacyOption.id}>
                {index > 0 && <View style={styles.divider} />}
                <TouchableOpacity
                  style={styles.privacyOption}
                  onPress={() => {
                    setPrivacy(privacyOption.id as 'public' | 'private' | 'friends');
                    setHasChanges(true);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.privacyContent}>
                    <View style={styles.privacyHeader}>
                      <Text style={styles.privacyEmoji}>{privacyOption.emoji}</Text>
                      <Text style={styles.privacyLabel}>{privacyOption.label}</Text>
                    </View>
                    <Text style={styles.privacyDescription}>{privacyOption.description}</Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      privacy === privacyOption.id && styles.radioButtonActive,
                    ]}
                  >
                    {privacy === privacyOption.id && <View style={styles.radioButtonInner} />}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Data & Sync Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💾 Données et synchronisation</Text>

          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Partage de données</Text>
                <Text style={styles.settingDescription}>Aider à améliorer l`&apos;application</Text>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={(value) => {
                  setDataSharing(value);
                  setHasChanges(true);
                }}
                trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                thumbColor={dataSharing ? '#2C5F2D' : '#F3F4F6'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Services de localisation</Text>
                <Text style={styles.settingDescription}>Pour les recommandations locales</Text>
              </View>
              <Switch
                value={locationServices}
                onValueChange={(value) => {
                  setLocationServices(value);
                  setHasChanges(true);
                }}
                trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                thumbColor={locationServices ? '#2C5F2D' : '#F3F4F6'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Mode hors ligne</Text>
                <Text style={styles.settingDescription}>Télécharger pour accès hors ligne</Text>
              </View>
              <Switch
                value={offlineMode}
                onValueChange={(value) => {
                  setOfflineMode(value);
                  setHasChanges(true);
                }}
                trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                thumbColor={offlineMode ? '#2C5F2D' : '#F3F4F6'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Synchronisation automatique</Text>
                <Text style={styles.settingDescription}>Synchroniser automatiquement vos données</Text>
              </View>
              <Switch
                value={autoSync}
                onValueChange={(value) => {
                  setAutoSync(value);
                  setHasChanges(true);
                }}
                trackColor={{ false: '#D1D5DB', true: '#97BC62' }}
                thumbColor={autoSync ? '#2C5F2D' : '#F3F4F6'}
              />
            </View>
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ À propos</Text>

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>{APP_INFO.version}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>{APP_INFO.buildNumber}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date de sortie</Text>
              <Text style={styles.infoValue}>{APP_INFO.releaseDate}</Text>
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => Alert.alert('Aide', 'Contacter le support')}
              activeOpacity={0.7}
            >
              <Text style={styles.settingIcon}>❓</Text>
              <Text style={styles.settingLabel}>Aide et support</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => Alert.alert('Conditions', 'Conditions d\'utilisation')}
              activeOpacity={0.7}
            >
              <Text style={styles.settingIcon}>📄</Text>
              <Text style={styles.settingLabel}>Conditions d`&apos;utilisation</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => Alert.alert('Politique', 'Politique de confidentialité')}
              activeOpacity={0.7}
            >
              <Text style={styles.settingIcon}>🔐</Text>
              <Text style={styles.settingLabel}>Politique de confidentialité</Text>
              <Text style={styles.settingArrow}>›</Text>
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

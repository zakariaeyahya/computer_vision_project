import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MOCK_USER_PROFILE, SETTINGS_OPTIONS, APP_INFO } from '../../mock';
import { profileStyles as styles } from '../styles/profileStyles';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const profileImage = require('../../assets/images/profile/556804188_1138100278420211_2161575235186965046_n.jpg') as ImageSourcePropType;

export default function ProfileScreen() {
  const navigation = useNavigation();
  const userProfile = MOCK_USER_PROFILE;

  const handleNavigateToPersonalInfo = () => {
    // @ts-expect-error - Navigation typing to be fixed
    navigation.navigate('PersonalInfo');
  };

  const handleNavigateToTravelPreferences = () => {
    // @ts-expect-error - Navigation typing to be fixed
    navigation.navigate('TravelPreferences');
  };

  const handleNavigateToStatistics = () => {
    // @ts-expect-error - Navigation typing to be fixed
    navigation.navigate('Statistics');
  };

  const handleNavigateToSettings = () => {
    // @ts-expect-error - Navigation typing to be fixed
    navigation.navigate('Settings');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Profile */}
      <LinearGradient
        colors={['#2C5F2D', '#97BC62']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={profileImage}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.headerName}>{userProfile.fullName}</Text>
        <Text style={styles.headerSubtitle}>{userProfile.subtitle}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Informations Personnelles Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={handleNavigateToPersonalInfo}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>📋</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Informations Personnelles</Text>
              <Text style={styles.cardSubtitle}>Gérer vos données</Text>
            </View>
            <Text style={styles.cardArrow}>›</Text>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nom complet</Text>
              <Text style={styles.infoValue}>{userProfile.personalInfo.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pays</Text>
              <Text style={styles.infoValue}>
                {userProfile.personalInfo.country.flag} {userProfile.personalInfo.country.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Langue</Text>
              <Text style={styles.infoValue}>{userProfile.personalInfo.language}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Préférences de Voyage Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={handleNavigateToTravelPreferences}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>⚙️</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Préférences de Voyage</Text>
              <Text style={styles.cardSubtitle}>Personnalisez vos voyages</Text>
            </View>
            <Text style={styles.cardArrow}>›</Text>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Budget habituel</Text>
              <View style={styles.budgetBadge}>
                <Text style={styles.budgetEmoji}>{userProfile.travelPreferences.budgetEmoji}</Text>
                <Text style={styles.budgetText}>{userProfile.travelPreferences.budgetLabel}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Centres d&apos;intérêt</Text>
              <View style={styles.interestsContainer}>
                {userProfile.travelPreferences.interests.slice(0, 2).map((interest) => (
                  <View key={interest.id} style={styles.interestTag}>
                    <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                    <Text style={styles.interestText}>{interest.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Statistiques Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={handleNavigateToStatistics}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>📊</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Statistiques</Text>
              <Text style={styles.cardSubtitle}>Vos voyages en chiffres</Text>
            </View>
            <Text style={styles.cardArrow}>›</Text>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userProfile.statistics.totalTrips}</Text>
              <Text style={styles.statLabel}>Voyages</Text>
              <Text style={styles.statEmoji}>✈️</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userProfile.statistics.totalDestinations}</Text>
              <Text style={styles.statLabel}>Destinations</Text>
              <Text style={styles.statEmoji}>🗺️</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userProfile.statistics.totalDays}</Text>
              <Text style={styles.statLabel}>Jours</Text>
              <Text style={styles.statEmoji}>📅</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Paramètres Card */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={handleNavigateToSettings}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>🔧</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Paramètres</Text>
              <Text style={styles.cardSubtitle}>Configuration de l&apos;app</Text>
            </View>
            <Text style={styles.cardArrow}>›</Text>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.settingsList}>
            {SETTINGS_OPTIONS.slice(0, 3).map((setting) => (
              <View key={setting.id} style={styles.settingItem}>
                <Text style={styles.settingIcon}>{setting.icon}</Text>
                <Text style={styles.settingText}>{setting.label}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* Bouton Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version {APP_INFO.version}</Text>
        </View>
      </View>
    </ScrollView>
  );
}


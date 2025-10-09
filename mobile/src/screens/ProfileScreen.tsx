import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
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
          <Text style={styles.avatar}>👤</Text>
        </View>
        <Text style={styles.headerName}>Alejandro Martinez</Text>
        <Text style={styles.headerSubtitle}>Voyageur passionné</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Informations Personnelles Card */}
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
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
              <Text style={styles.infoValue}>Alejandro Martinez</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Pays</Text>
              <Text style={styles.infoValue}>🇪🇸 Espagne</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Langue</Text>
              <Text style={styles.infoValue}>Espagnol</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Préférences de Voyage Card */}
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
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
                <Text style={styles.budgetEmoji}>💰💰</Text>
                <Text style={styles.budgetText}>Moyen</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Centres d'intérêt</Text>
              <View style={styles.interestsContainer}>
                <View style={styles.interestTag}>
                  <Text style={styles.interestEmoji}>⚽</Text>
                  <Text style={styles.interestText}>Football</Text>
                </View>
                <View style={styles.interestTag}>
                  <Text style={styles.interestEmoji}>🍽️</Text>
                  <Text style={styles.interestText}>Gastronomie</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Statistiques Card */}
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
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
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Voyages</Text>
              <Text style={styles.statEmoji}>✈️</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Destinations</Text>
              <Text style={styles.statEmoji}>🗺️</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Jours</Text>
              <Text style={styles.statEmoji}>📅</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Paramètres Card */}
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>🔧</Text>
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Paramètres</Text>
              <Text style={styles.cardSubtitle}>Configuration de l'app</Text>
            </View>
            <Text style={styles.cardArrow}>›</Text>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingIcon}>🌍</Text>
              <Text style={styles.settingText}>Langue et région</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔒</Text>
              <Text style={styles.settingText}>Confidentialité</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Bouton Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
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
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatar: {
    fontSize: 50,
  },
  headerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },

  // Content
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  cardArrow: {
    fontSize: 28,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  cardContent: {
    gap: 12,
  },

  // Info Rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },

  // Budget Badge
  budgetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  budgetEmoji: {
    fontSize: 16,
  },
  budgetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C5F2D',
  },

  // Interests
  interestsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  interestEmoji: {
    fontSize: 14,
  },
  interestText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C5F2D',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  statEmoji: {
    fontSize: 20,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E7EB',
  },

  // Settings List
  settingsList: {
    gap: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingText: {
    fontSize: 15,
    color: '#4B5563',
    fontWeight: '500',
  },

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
  },
  logoutIcon: {
    fontSize: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});


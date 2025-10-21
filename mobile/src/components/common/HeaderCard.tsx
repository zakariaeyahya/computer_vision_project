import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import VoiceModal from './VoiceModal';
import profileImage from '../../../assets/images/profile/556804188_1138100278420211_2161575235186965046_n.jpg';

interface HeaderCardProps {
  onProfilePress: () => void;
  onNotificationPress: () => void;
  onSearchChange: (text: string) => void;
  searchValue: string;
}

export default function HeaderCard({ 
  onProfilePress, 
  onNotificationPress, 
  onSearchChange, 
  searchValue
}: HeaderCardProps) {
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <Text style={styles.logoEmoji}>✈️</Text>
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>AtlasGo</Text>
            <Text style={styles.subtitle}>Smart Eco Travel</Text>
          </View>
        </View>
        
        <View style={styles.headerControls}>
          <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
            <Feather name="bell" size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <Image 
source={profileImage}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations, experiences..."
          placeholderTextColor="#9CA3AF"
          value={searchValue}
          onChangeText={onSearchChange}
        />
        <TouchableOpacity 
          style={styles.microphoneButton}
          onPress={() => setVoiceModalVisible(true)}
        >
          <Feather name="mic" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Location Info */}
      <View style={styles.locationContainer}>
        <MaterialCommunityIcons name="map-marker" size={16} color="#F59E0B" />
        <Text style={styles.locationText}>Casablanca, Morocco</Text>
      </View>

      {/* Voice Modal */}
      <VoiceModal
        visible={voiceModalVisible}
        onClose={() => setVoiceModalVisible(false)}
        onStart={() => console.log('Voice recording started')}
        onStop={(duration) => console.log(`Voice recording stopped after ${duration} seconds`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4E9D8',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoEmoji: {
    fontSize: 20,
  },
  logoTextContainer: {
    flexDirection: 'column',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
    marginTop: 2,
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  microphoneButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
});

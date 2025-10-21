import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StartTravelScreen from '../screens/StartTravelScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PersonalInfoScreen from '../components/profile/PersonalInfoScreen';
import TravelPreferencesScreen from '../components/profile/TravelPreferencesScreen';
import StatisticsScreen from '../components/profile/StatisticsScreen';
import SettingsScreen from '../components/profile/SettingsScreen';
import DestinationDetailsScreen from '../screens/DestinationDetailsScreen';
import MapScreen from '../screens/MapScreen';

// Types for navigation
export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  Itinerary: { id: string };
  PersonalInfo: undefined;
  TravelPreferences: undefined;
  Statistics: undefined;
  Settings: undefined;
  DestinationDetails: { destinationName: string };
  Map: undefined;
};

export type TabParamList = {
  Home: undefined;
  StartTravel: undefined;
  MyTrips: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Bottom Tab Navigator
function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 12,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 8),
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#2C5F2D',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Accueil',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: '#2C5F2D' },
              ]}
            >
              <Feather
                name="home"
                size={24}
                color={focused ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="StartTravel" 
        component={StartTravelScreen}
        options={{ 
          title: 'Planificateur IA',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: '#2C5F2D' },
              ]}
            >
              <Feather
                name="compass"
                size={24}
                color={focused ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="MyTrips" 
        component={MapScreen}
        options={{ 
          title: 'Explorer',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: '#2C5F2D' },
              ]}
            >
              <Feather
                name="map-pin"
                size={24}
                color={focused ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: '#2C5F2D' },
              ]}
            >
              <Feather
                name="user"
                size={24}
                color={focused ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Itinerary"
        component={ItineraryScreen}
        options={{ title: 'Itinéraire' }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TravelPreferences"
        component={TravelPreferencesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DestinationDetails"
        component={DestinationDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


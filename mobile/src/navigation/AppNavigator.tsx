import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2C5F2D',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: 78,
          paddingBottom: 28,
          paddingTop: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 3,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="StartTravel" 
        component={StartTravelScreen}
        options={{ 
          title: 'Voyage',
          tabBarIcon: ({ color, size }) => (
            <TravelIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="MyTrips" 
        component={MyTripsScreen}
        options={{ 
          title: 'Mes Voyages',
          tabBarIcon: ({ color, size }) => (
            <TripsIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Simple icon components using emojis
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>🏠</Text>
);

const TravelIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>✈️</Text>
);

const TripsIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>🧳</Text>
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>👤</Text>
);

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
    </Stack.Navigator>
  );
}


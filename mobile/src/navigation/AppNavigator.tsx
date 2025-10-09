import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StartTravelScreen from '../screens/StartTravelScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Types for navigation
export type RootStackParamList = {
  MainTabs: undefined;
  Itinerary: { id: string };
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
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Accueil' }}
      />
      <Tab.Screen 
        name="StartTravel" 
        component={StartTravelScreen}
        options={{ title: 'Voyage' }}
      />
      <Tab.Screen 
        name="MyTrips" 
        component={MyTripsScreen}
        options={{ title: 'Mes Voyages' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}


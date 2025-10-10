/**
 * User Profile Mock Data
 *
 * Contains user profile information, preferences, statistics, and settings
 */

export interface UserProfile {
  id: string;
  fullName: string;
  subtitle: string;
  avatar: string;
  personalInfo: PersonalInfo;
  travelPreferences: TravelPreferences;
  statistics: UserStatistics;
  settings: UserSettings;
}

export interface PersonalInfo {
  fullName: string;
  country: {
    flag: string;
    name: string;
  };
  language: string;
  email?: string;
  phone?: string;
}

export interface TravelPreferences {
  budgetLevel: 'SMALL' | 'MEDIUM' | 'LARGE';
  budgetLabel: string;
  budgetEmoji: string;
  interests: Interest[];
  travelStyle?: string;
  accommodationType?: 'hotel' | 'hostel' | 'airbnb' | 'camping';
  groupSize?: 'solo' | 'couple' | 'family' | 'group';
}

export interface Interest {
  id: string;
  emoji: string;
  label: string;
}

export interface TripHistory {
  id: string;
  destination: string;
  emoji: string;
  startDate: string;
  endDate: string;
  days: number;
  spent: number;
  activities: number;
}

export interface MonthlyStats {
  month: string;
  trips: number;
  spent: number;
}

export interface DestinationStats {
  name: string;
  emoji: string;
  visits: number;
  lastVisit: string;
}

export interface UserStatistics {
  totalTrips: number;
  totalDestinations: number;
  totalDays: number;
  totalSpent?: number;
  averageSpentPerTrip?: number;
  averageTripDuration?: number;
  favoriteDestination?: string;
  tripHistory?: TripHistory[];
  monthlyStats?: MonthlyStats[];
  destinationStats?: DestinationStats[];
  currentYear: {
    trips: number;
    destinations: number;
    days: number;
    spent: number;
  };
}

export interface UserSettings {
  notifications: boolean;
  language: string;
  privacy: 'public' | 'private' | 'friends';
  theme: 'light' | 'dark' | 'auto';
}

export const MOCK_USER_PROFILE: UserProfile = {
  id: '1',
  fullName: 'Issam Siraj Eddine',
  subtitle: 'Voyageur passionné',
  avatar: '../../assets/images/profile/556804188_1138100278420211_2161575235186965046_n.jpg',

  personalInfo: {
    fullName: 'Issam Siraj Eddine',
    country: {
      flag: '🇪🇸',
      name: 'Espagne',
    },
    language: 'Espagnol',
    email: 'issam.siraj@example.com',
    phone: '+34 123 456 789',
  },

  travelPreferences: {
    budgetLevel: 'MEDIUM',
    budgetLabel: 'Moyen',
    budgetEmoji: '💰💰',
    interests: [
      {
        id: '1',
        emoji: '⚽',
        label: 'Football',
      },
      {
        id: '2',
        emoji: '🍽️',
        label: 'Gastronomie',
      },
      {
        id: '3',
        emoji: '🏛️',
        label: 'Culture',
      },
      {
        id: '4',
        emoji: '🏞️',
        label: 'Nature',
      },
    ],
    travelStyle: 'cultural',
    accommodationType: 'hotel',
    groupSize: 'couple',
  },

  statistics: {
    totalTrips: 2,
    totalDestinations: 3,
    totalDays: 15,
    totalSpent: 3500,
    averageSpentPerTrip: 1750,
    averageTripDuration: 7.5,
    favoriteDestination: 'Tétouan',
    currentYear: {
      trips: 2,
      destinations: 3,
      days: 15,
      spent: 3500,
    },
    tripHistory: [
      {
        id: '1',
        destination: 'Tétouan',
        emoji: '🏛️',
        startDate: '2024-08-15',
        endDate: '2024-08-22',
        days: 7,
        spent: 1800,
        activities: 12,
      },
      {
        id: '2',
        destination: 'Chefchaouen',
        emoji: '🔵',
        startDate: '2024-09-10',
        endDate: '2024-09-18',
        days: 8,
        spent: 1700,
        activities: 15,
      },
    ],
    monthlyStats: [
      { month: 'Janvier', trips: 0, spent: 0 },
      { month: 'Février', trips: 0, spent: 0 },
      { month: 'Mars', trips: 0, spent: 0 },
      { month: 'Avril', trips: 0, spent: 0 },
      { month: 'Mai', trips: 0, spent: 0 },
      { month: 'Juin', trips: 0, spent: 0 },
      { month: 'Juillet', trips: 0, spent: 0 },
      { month: 'Août', trips: 1, spent: 1800 },
      { month: 'Septembre', trips: 1, spent: 1700 },
      { month: 'Octobre', trips: 0, spent: 0 },
      { month: 'Novembre', trips: 0, spent: 0 },
      { month: 'Décembre', trips: 0, spent: 0 },
    ],
    destinationStats: [
      {
        name: 'Tétouan',
        emoji: '🏛️',
        visits: 1,
        lastVisit: 'Août 2024',
      },
      {
        name: 'Chefchaouen',
        emoji: '🔵',
        visits: 1,
        lastVisit: 'Septembre 2024',
      },
      {
        name: 'Tanger',
        emoji: '🌊',
        visits: 0,
        lastVisit: 'Jamais visité',
      },
    ],
  },

  settings: {
    notifications: true,
    language: 'fr',
    privacy: 'private',
    theme: 'auto',
  },
};

// Budget levels configuration
export const BUDGET_LEVELS = {
  SMALL: {
    label: 'Petit',
    emoji: '💰',
    range: '< 500 dh',
  },
  MEDIUM: {
    label: 'Moyen',
    emoji: '💰💰',
    range: '500-1000 dh',
  },
  LARGE: {
    label: 'Grand',
    emoji: '💰💰💰',
    range: '> 1000 dh',
  },
};

// Settings options
export const SETTINGS_OPTIONS = [
  {
    id: 'notifications',
    icon: '🔔',
    label: 'Notifications',
    screen: 'NotificationsSettings',
  },
  {
    id: 'language',
    icon: '🌍',
    label: 'Langue et région',
    screen: 'LanguageSettings',
  },
  {
    id: 'privacy',
    icon: '🔒',
    label: 'Confidentialité',
    screen: 'PrivacySettings',
  },
  {
    id: 'help',
    icon: '❓',
    label: 'Aide et support',
    screen: 'HelpSettings',
  },
  {
    id: 'about',
    icon: 'ℹ️',
    label: 'À propos',
    screen: 'AboutSettings',
  },
];

// Available interests for selection
export const AVAILABLE_INTERESTS: Interest[] = [
  { id: '1', emoji: '⚽', label: 'Football' },
  { id: '2', emoji: '🍽️', label: 'Gastronomie' },
  { id: '3', emoji: '🏛️', label: 'Culture' },
  { id: '4', emoji: '🏞️', label: 'Nature' },
  { id: '5', emoji: '🏖️', label: 'Plage' },
  { id: '6', emoji: '⛰️', label: 'Montagne' },
  { id: '7', emoji: '🎨', label: 'Art' },
  { id: '8', emoji: '🎭', label: 'Théâtre' },
  { id: '9', emoji: '🎵', label: 'Musique' },
  { id: '10', emoji: '📸', label: 'Photographie' },
  { id: '11', emoji: '🛍️', label: 'Shopping' },
  { id: '12', emoji: '🏃', label: 'Sport' },
  { id: '13', emoji: '🧘', label: 'Bien-être' },
  { id: '14', emoji: '🍷', label: 'Oenologie' },
  { id: '15', emoji: '🎪', label: 'Festivals' },
  { id: '16', emoji: '🏰', label: 'Histoire' },
  { id: '17', emoji: '🐾', label: 'Animaux' },
  { id: '18', emoji: '🌅', label: 'Paysages' },
];

// Travel styles for preferences
export const TRAVEL_STYLES = [
  { id: 'adventure', emoji: '🏕️', label: 'Aventurier' },
  { id: 'relaxation', emoji: '😌', label: 'Détente' },
  { id: 'cultural', emoji: '🎭', label: 'Culturel' },
  { id: 'luxury', emoji: '💎', label: 'Luxe' },
  { id: 'eco', emoji: '🌱', label: 'Écologique' },
  { id: 'family', emoji: '👨‍👩‍👧‍👦', label: 'Famille' },
];

// App info
export const APP_INFO = {
  version: '1.0.0',
  buildNumber: '100',
  releaseDate: '2025-01-01',
};

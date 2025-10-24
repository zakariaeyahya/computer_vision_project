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

export interface NotificationSettings {
  tripReminders: boolean;
  promotions: boolean;
  recommendations: boolean;
  messages: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface UserSettings {
  notifications: boolean;
  language: string;
  privacy: 'public' | 'private' | 'friends';
  theme: 'light' | 'dark' | 'auto';
  notificationSettings?: NotificationSettings;
  dataSharing?: boolean;
  locationServices?: boolean;
  offlineMode?: boolean;
  autoSync?: boolean;
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
        emoji: 'soccer',
        label: 'Football',
      },
      {
        id: '2',
        emoji: 'silverware-fork-knife',
        label: 'Gastronomie',
      },
      {
        id: '3',
        emoji: 'city-variant',
        label: 'Culture',
      },
      {
        id: '4',
        emoji: 'tree',
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
        emoji: 'city-variant',
        startDate: '2024-08-15',
        endDate: '2024-08-22',
        days: 7,
        spent: 1800,
        activities: 12,
      },
      {
        id: '2',
        destination: 'Chefchaouen',
        emoji: 'water',
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
        emoji: 'city-variant',
        visits: 1,
        lastVisit: 'Août 2024',
      },
      {
        name: 'Chefchaouen',
        emoji: 'water',
        visits: 1,
        lastVisit: 'Septembre 2024',
      },
      {
        name: 'Tanger',
        emoji: 'waves',
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
    notificationSettings: {
      tripReminders: true,
      promotions: false,
      recommendations: true,
      messages: true,
      emailNotifications: true,
      pushNotifications: true,
    },
    dataSharing: false,
    locationServices: true,
    offlineMode: false,
    autoSync: true,
  },
};

// Budget levels configuration
export const BUDGET_LEVELS = {
  SMALL: {
    label: 'Petit',
    emoji: 'cash',
    range: '< 500 dh',
  },
  MEDIUM: {
    label: 'Moyen',
    emoji: 'cash-multiple',
    range: '500-1000 dh',
  },
  LARGE: {
    label: 'Grand',
    emoji: 'wallet',
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
  { id: '1', emoji: 'soccer', label: 'Football' },
  { id: '2', emoji: 'silverware-fork-knife', label: 'Gastronomie' },
  { id: '3', emoji: 'city-variant', label: 'Culture' },
  { id: '4', emoji: 'tree', label: 'Nature' },
  { id: '5', emoji: 'beach', label: 'Plage' },
  { id: '6', emoji: 'image-filter-hdr', label: 'Montagne' },
  { id: '7', emoji: 'palette', label: 'Art' },
  { id: '8', emoji: 'theater', label: 'Théâtre' },
  { id: '9', emoji: 'music', label: 'Musique' },
  { id: '10', emoji: 'camera', label: 'Photographie' },
  { id: '11', emoji: 'shopping', label: 'Shopping' },
  { id: '12', emoji: 'run', label: 'Sport' },
  { id: '13', emoji: 'meditation', label: 'Bien-être' },
  { id: '14', emoji: 'glass-wine', label: 'Oenologie' },
  { id: '15', emoji: 'party-popper', label: 'Festivals' },
  { id: '16', emoji: 'castle', label: 'Histoire' },
  { id: '17', emoji: 'paw', label: 'Animaux' },
  { id: '18', emoji: 'image-filter-hdr', label: 'Paysages' },
];

// Travel styles for preferences
export const TRAVEL_STYLES = [
  { id: 'adventure', emoji: 'tent', label: 'Aventurier' },
  { id: 'relaxation', emoji: 'spa', label: 'Détente' },
  { id: 'cultural', emoji: 'theater', label: 'Culturel' },
  { id: 'luxury', emoji: 'diamond', label: 'Luxe' },
  { id: 'eco', emoji: 'leaf', label: 'Écologique' },
  { id: 'family', emoji: 'account-group', label: 'Famille' },
];

// Language options
export const LANGUAGE_OPTIONS = [
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'ar', label: 'العربية', flag: '🇲🇦' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
];

// Theme options
export const THEME_OPTIONS = [
  { id: 'light', label: 'Clair', emoji: 'weather-sunny' },
  { id: 'dark', label: 'Sombre', emoji: 'weather-night' },
  { id: 'auto', label: 'Automatique', emoji: 'theme-light-dark' },
];

// Privacy options
export const PRIVACY_OPTIONS = [
  { id: 'public', label: 'Public', emoji: 'earth', description: 'Tout le monde peut voir votre profil' },
  { id: 'friends', label: 'Amis', emoji: 'account-group', description: 'Seulement vos amis peuvent voir votre profil' },
  { id: 'private', label: 'Privé', emoji: 'lock', description: 'Votre profil est privé' },
];

// App info
export const APP_INFO = {
  version: '1.0.0',
  buildNumber: '100',
  releaseDate: '2025-01-01',
};

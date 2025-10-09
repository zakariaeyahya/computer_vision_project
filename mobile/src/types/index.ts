// TypeScript types and interfaces for React Native app

// Enums
export enum BudgetType {
  SMALL = 'SMALL',    // <500dh
  MEDIUM = 'MEDIUM',  // 500-1000dh
  LARGE = 'LARGE'     // >1000dh
}

export enum TripStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}

export enum PreferenceType {
  CULTURE = 'CULTURE',           // Culture et Histoire
  NATURE = 'NATURE',             // Nature et Sport
  GASTRONOMY = 'GASTRONOMY'      // Gastronomie
}

export enum ActivityPeriod {
  MORNING = 'MORNING',           // Matin
  AFTERNOON = 'AFTERNOON',       // Après-midi
  EVENING = 'EVENING'            // Soir
}

// Interfaces
export interface Destination {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface Activity {
  id: string;
  name: string;
  image: string;
  period: ActivityPeriod;
  description?: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  duration: number;  // nombre de jours
  budget: number;
  days: DayItinerary[];
}

export interface Trip {
  id: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  budget: BudgetType;
  preferences: PreferenceType[];
  status: TripStatus;
  itinerary?: Itinerary;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  country: string;
  language: string;
  budgetPreference: BudgetType;
  interests: string[];
  tripsCount: number;
  destinationsVisited: number;
}

export interface TravelFormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: BudgetType;
  preferences: PreferenceType[];
}


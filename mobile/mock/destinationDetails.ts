import { Place } from './tetouanPlaces';

export interface Highlight {
  icon: string;
  title: string;
  description: string;
  colors: [string, string];
}

export interface PracticalInfo {
  icon: string;
  label: string;
  value: string;
}

export interface DestinationDetail {
  places: Place[];
  highlights: Highlight[];
  practicalInfo: PracticalInfo[];
}

export const DESTINATION_DETAILS: Record<string, DestinationDetail> = {
  'Tétouan': {
    places: [],
    highlights: [
      {
        icon: '🏛️',
        title: 'UNESCO Medina',
        description: 'Preserved Andalusian architecture',
        colors: ['#C41E3A', '#8B0000'],
      },
      {
        icon: '🎨',
        title: 'Art & Crafts',
        description: 'Famous for zellige and embroidery',
        colors: ['#1E40AF', '#3B82F6'],
      },
      {
        icon: '🌊',
        title: 'Nearby Beaches',
        description: 'Martil and M\'diq at 10km',
        colors: ['#059669', '#10B981'],
      },
      {
        icon: '🍽️',
        title: 'Gastronomy',
        description: 'Authentic Andalusian cuisine',
        colors: ['#DC2626', '#EF4444'],
      },
    ],
    practicalInfo: [
      { icon: '🗓️', label: 'Best period', value: 'March to June, September to November' },
      { icon: '💰', label: 'Average budget/day', value: '300-500 DH' },
      { icon: '🚗', label: 'Access from Tangier', value: '1h by car (60 km)' },
      { icon: '🗣️', label: 'Languages', value: 'Arabic, Spanish, French' },
    ],
  },
  'Tanger': {
    places: [],
    highlights: [
      {
        icon: '🌊',
        title: 'Cap Spartel',
        description: 'Meeting point Atlantic-Mediterranean',
        colors: ['#1E40AF', '#3B82F6'],
      },
      {
        icon: '🏰',
        title: 'Kasbah',
        description: 'Historic district with panoramic view',
        colors: ['#7C3AED', '#A78BFA'],
      },
      {
        icon: '🎭',
        title: 'Heritage',
        description: 'Unique cosmopolitan history',
        colors: ['#DC2626', '#EF4444'],
      },
      {
        icon: '🏖️',
        title: 'Beaches',
        description: 'Beautiful urban beaches',
        colors: ['#059669', '#10B981'],
      },
    ],
    practicalInfo: [
      { icon: '🗓️', label: 'Best period', value: 'All year, ideal April-October' },
      { icon: '💰', label: 'Average budget/day', value: '400-700 DH' },
      { icon: '✈️', label: 'Airport', value: 'Ibn Battouta Airport (15 km from center)' },
      { icon: '🗣️', label: 'Languages', value: 'Arabic, French, Spanish, English' },
    ],
  },
  'Chefchaouen': {
    places: [],
    highlights: [
      {
        icon: '🔵',
        title: 'Blue City',
        description: 'Streets entirely painted in blue',
        colors: ['#2563EB', '#60A5FA'],
      },
      {
        icon: '⛰️',
        title: 'Hiking',
        description: 'Trails in the Rif mountains',
        colors: ['#059669', '#10B981'],
      },
      {
        icon: '📸',
        title: 'Photography',
        description: 'Photographers\' paradise',
        colors: ['#7C3AED', '#A78BFA'],
      },
      {
        icon: '🛍️',
        title: 'Crafts',
        description: 'Weaving and local products',
        colors: ['#DC2626', '#EF4444'],
      },
    ],
    practicalInfo: [
      { icon: '🗓️', label: 'Best period', value: 'April-June, September-November' },
      { icon: '💰', label: 'Average budget/day', value: '250-400 DH' },
      { icon: '🚗', label: 'Access', value: '2h30 from Tangier, 4h from Fes' },
      { icon: '⛰️', label: 'Altitude', value: '600 meters' },
    ],
  },
};

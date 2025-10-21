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
        icon: 'bank',
        title: 'UNESCO Medina',
        description: 'Preserved Andalusian architecture',
        colors: ['#C41E3A', '#8B0000'],
      },
      {
        icon: 'palette',
        title: 'Art & Crafts',
        description: 'Famous for zellige and embroidery',
        colors: ['#1E40AF', '#3B82F6'],
      },
      {
        icon: 'waves',
        title: 'Nearby Beaches',
        description: 'Martil and M\'diq at 10km',
        colors: ['#059669', '#10B981'],
      },
      {
        icon: 'silverware-fork-knife',
        title: 'Gastronomy',
        description: 'Authentic Andalusian cuisine',
        colors: ['#DC2626', '#EF4444'],
      },
    ],
    practicalInfo: [
      { icon: 'calendar-range', label: 'Best period', value: 'March to June, September to November' },
      { icon: 'cash-multiple', label: 'Average budget/day', value: '300-500 DH' },
      { icon: 'car', label: 'Access from Tangier', value: '1h by car (60 km)' },
      { icon: 'account-voice', label: 'Languages', value: 'Arabic, Spanish, French' },
    ],
  },
  'Tanger': {
    places: [],
    highlights: [
      {
        icon: 'waves',
        title: 'Cap Spartel',
        description: 'Meeting point Atlantic-Mediterranean',
        colors: ['#1E40AF', '#3B82F6'],
      },
      {
        icon: 'castle',
        title: 'Kasbah',
        description: 'Historic district with panoramic view',
        colors: ['#7C3AED', '#A78BFA'],
      },
      {
        icon: 'theater',
        title: 'Heritage',
        description: 'Unique cosmopolitan history',
        colors: ['#DC2626', '#EF4444'],
      },
      {
        icon: 'beach',
        title: 'Beaches',
        description: 'Beautiful urban beaches',
        colors: ['#059669', '#10B981'],
      },
    ],
    practicalInfo: [
      { icon: 'calendar-range', label: 'Best period', value: 'All year, ideal April-October' },
      { icon: 'cash-multiple', label: 'Average budget/day', value: '400-700 DH' },
      { icon: 'airplane', label: 'Airport', value: 'Ibn Battouta Airport (15 km from center)' },
      { icon: 'account-voice', label: 'Languages', value: 'Arabic, French, Spanish, English' },
    ],
  },
  'Chefchaouen': {
    places: [],
    highlights: [
      {
        icon: 'water',
        title: 'Blue City',
        description: 'Streets entirely painted in blue',
        colors: ['#2563EB', '#60A5FA'],
      },
      {
        icon: 'image-filter-hdr',
        title: 'Hiking',
        description: 'Trails in the Rif mountains',
        colors: ['#059669', '#10B981'],
      },
      {
        icon: 'camera',
        title: 'Photography',
        description: 'Photographers\' paradise',
        colors: ['#7C3AED', '#A78BFA'],
      },
      {
        icon: 'shopping',
        title: 'Crafts',
        description: 'Weaving and local products',
        colors: ['#DC2626', '#EF4444'],
      },
    ],
    practicalInfo: [
      { icon: 'calendar-range', label: 'Best period', value: 'April-June, September-November' },
      { icon: 'cash-multiple', label: 'Average budget/day', value: '250-400 DH' },
      { icon: 'car', label: 'Access', value: '2h30 from Tangier, 4h from Fes' },
      { icon: '⛰️', label: 'Altitude', value: '600 meters' },
    ],
  },
};

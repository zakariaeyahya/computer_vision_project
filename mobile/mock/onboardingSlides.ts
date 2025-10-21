/**
 * Mock data for Onboarding slides
 */

import { ImageSourcePropType } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bg1 = require('../assets/images/how-to-plan-a-road-trip-6.jpg') as ImageSourcePropType;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bg2 = require('../assets/images/destination-paragraph-tetouan-linstaspot-a-ne-pas-manquer-1747213963.png') as ImageSourcePropType;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bg3 = require('../assets/images/plaza-espana-seville-andalousie-villes-espagne-euroipe-travel-for-you.jpg') as ImageSourcePropType;

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
  backgroundImage: ImageSourcePropType;
  textColor?: string;
  contentPosition?: 'top' | 'center' | 'bottom';
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'AI-Powered Recommendations',
    description: 'Get personalized suggestions for destinations, restaurants, and activities based on your preferences.',
    image: '',
    backgroundColor: 'transparent',
    backgroundImage: bg1,
    textColor: '#000000',
    contentPosition: 'center',
  },
  {
    id: '2',
    title: 'Interactive Map & Navigation',
    description: 'Explore destinations with our interactive map and get real-time directions to your favorite spots.',
    image: '',
    backgroundColor: 'transparent',
    backgroundImage: bg2,
    textColor: '#FFFFFF',
    contentPosition: 'center',
  },
  {
    id: '3',
    title: 'Plan Your Perfect Itinerary',
    description: 'Organize your trips, book experiences, and discover eco-friendly activities all in one place.',
    image: '',
    backgroundColor: 'transparent',
    backgroundImage: bg3,
    textColor: '#FFFFFF',
    contentPosition: 'bottom',
  },
];

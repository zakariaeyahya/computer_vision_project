// Export all mock data from a single entry point
export * from './destinations';
export { TETOUAN_PLACES } from './tetouanPlaces';
export { TANGER_PLACES } from './tangerPlaces';
export { CHEFCHAOUEN_PLACES } from './chefchaouenPlaces';
export * from './destinationDetails';
export * from './trips';
export * from './itinerary';
export * from './preferences';
export * from './userProfile';

// Export Place type only once to avoid conflicts
export type { Place } from './tetouanPlaces';


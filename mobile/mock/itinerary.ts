export interface Activity {
  period: string;
  icon: string;
  time: string;
  name: string;
  description: string;
  image: string;
  duration: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
}

export interface Itinerary {
  destination: string;
  duration: number;
  budget: number;
  days: DayItinerary[];
}

export const MOCK_ITINERARY: Itinerary = {
  destination: 'Tétouan',
  duration: 2,
  budget: 850,
  days: [
    {
      day: 1,
      date: '15 Janvier 2025',
      activities: [
        {
          period: 'Matin',
          icon: '🌅',
          time: '09:00',
          name: 'Médina de Tétouan',
          description: 'Explorez la médina historique, classée UNESCO',
          image: '🏛️',
          duration: '3-4h',
        },
        {
          period: 'Après-midi',
          icon: '☀️',
          time: '14:00',
          name: 'Musée d\'Art Marocain',
          description: 'Découvrez l\'art traditionnel de Tétouan',
          image: '🎨',
          duration: '2h',
        },
        {
          period: 'Soir',
          icon: '🌙',
          time: '19:30',
          name: 'Restaurant Al Mandari',
          description: 'Dîner traditionnel marocain',
          image: '🍽️',
          duration: '2h',
        },
      ],
    },
    {
      day: 2,
      date: '16 Janvier 2025',
      activities: [
        {
          period: 'Matin',
          icon: '🌅',
          time: '10:00',
          name: 'Place Hassan II',
          description: 'Centre-ville animé et marchés locaux',
          image: '🏙️',
          duration: '2h',
        },
        {
          period: 'Après-midi',
          icon: '☀️',
          time: '15:00',
          name: 'Souk Artisanal',
          description: 'Shopping d\'artisanat local',
          image: '🛍️',
          duration: '3h',
        },
      ],
    },
  ],
};

export const MOCK_ITINERARY_TANGER: Itinerary = {
  destination: 'Tanger',
  duration: 2,
  budget: 900,
  days: [
    {
      day: 1,
      date: '15 Janvier 2025',
      activities: [
        {
          period: 'Matin',
          icon: '🌅',
          time: '09:00',
          name: 'Kasbah de Tanger',
          description: 'Découvrez la forteresse historique avec vue sur le détroit',
          image: '🏰',
          duration: '2-3h',
        },
        {
          period: 'Après-midi',
          icon: '☀️',
          time: '14:00',
          name: 'Grottes d\'Hercule',
          description: 'Visitez les grottes mythiques au Cap Spartel',
          image: '🗿',
          duration: '3h',
        },
        {
          period: 'Soir',
          icon: '🌙',
          time: '19:00',
          name: 'Café Hafa',
          description: 'Thé avec vue panoramique sur l\'océan',
          image: '☕',
          duration: '2h',
        },
      ],
    },
    {
      day: 2,
      date: '16 Janvier 2025',
      activities: [
        {
          period: 'Matin',
          icon: '🌅',
          time: '09:30',
          name: 'Médina de Tanger',
          description: 'Promenade dans la vieille ville animée',
          image: '🕌',
          duration: '3-4h',
        },
        {
          period: 'Après-midi',
          icon: '☀️',
          time: '15:00',
          name: 'Cap Spartel',
          description: 'Point de rencontre entre Atlantique et Méditerranée',
          image: '🌊',
          duration: 'Demi-journée',
        },
      ],
    },
  ],
};

export const MOCK_ITINERARY_CHEFCHAOUEN: Itinerary = {
  destination: 'Chefchaouen',
  duration: 2,
  budget: 750,
  days: [
    {
      day: 1,
      date: '15 Janvier 2025',
      activities: [
        {
          period: 'Matin',
          icon: '🌅',
          time: '09:00',
          name: 'Médina Bleue',
          description: 'Explorez les ruelles bleues photogéniques',
          image: '📸',
          duration: '3-4h',
        },
        {
          period: 'Après-midi',
          icon: '☀️',
          time: '14:30',
          name: 'Place Outa el Hammam',
          description: 'Centre-ville avec cafés et boutiques d\'artisanat',
          image: '☕',
          duration: '1-2h',
        },
        {
          period: 'Soir',
          icon: '🌙',
          time: '19:00',
          name: 'Restaurant Casa Hassan',
          description: 'Cuisine traditionnelle de montagne',
          image: '🍽️',
          duration: '2h',
        },
      ],
    },
    {
      day: 2,
      date: '16 Janvier 2025',
      activities: [
        {
          period: 'Matin',
          icon: '🌅',
          time: '08:00',
          name: 'Cascade d\'Akchour',
          description: 'Randonnée vers les cascades spectaculaires',
          image: '⛰️',
          duration: 'Journée complète',
        },
        {
          period: 'Après-midi',
          icon: '☀️',
          time: '15:00',
          name: 'Souk d\'Artisanat',
          description: 'Shopping de tissages et produits locaux',
          image: '🛍️',
          duration: '2h',
        },
      ],
    },
  ],
};

// Map pour faciliter l'accès aux itinéraires par destination
export const ITINERARIES_BY_DESTINATION: Record<string, Itinerary> = {
  'Tétouan': MOCK_ITINERARY,
  'Tanger': MOCK_ITINERARY_TANGER,
  'Chefchaouen': MOCK_ITINERARY_CHEFCHAOUEN,
};


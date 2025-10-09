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
          name: 'Visite de la Médina',
          description: 'Explorez la médina historique, classée UNESCO',
          image: '🏛️',
          duration: '3h',
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


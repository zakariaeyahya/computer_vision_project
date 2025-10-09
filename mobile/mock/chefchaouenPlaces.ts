export interface Place {
  icon: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export const CHEFCHAOUEN_PLACES: Place[] = [
  {
    icon: '🔵',
    name: 'Médina Bleue',
    description: 'Dédale de ruelles peintes en bleu indigo',
    duration: '3-4h',
    price: 'Gratuit',
  },
  {
    icon: '🕌',
    name: 'Place Outa el Hammam',
    description: 'Place centrale avec cafés et restaurants',
    duration: '1-2h',
    price: 'Gratuit',
  },
  {
    icon: '🏰',
    name: 'Kasbah et Musée',
    description: 'Forteresse du 15ème siècle avec musée ethnographique',
    duration: '1-2h',
    price: '20 DH',
  },
  {
    icon: '💧',
    name: 'Cascade d\'Akchour',
    description: 'Magnifique cascade accessible par randonnée',
    duration: 'Journée complète',
    price: '50 DH (guide)',
  },
  {
    icon: '⛰️',
    name: 'Mosquée Espagnole',
    description: 'Vue panoramique sur la ville bleue',
    duration: '2h (randonnée)',
    price: 'Gratuit',
  },
];


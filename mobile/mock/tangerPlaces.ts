export interface Place {
  icon: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export const TANGER_PLACES: Place[] = [
  {
    icon: '🏰',
    name: 'Kasbah de Tanger',
    description: 'Quartier fortifié avec vues spectaculaires sur le détroit',
    duration: '2-3h',
    price: '20 DH',
  },
  {
    icon: '🌊',
    name: 'Cap Spartel',
    description: 'Point de rencontre entre Atlantique et Méditerranée',
    duration: 'Demi-journée',
    price: 'Gratuit',
  },
  {
    icon: '🕌',
    name: 'Médina de Tanger',
    description: 'Ancien quartier avec souks et architecture traditionnelle',
    duration: '3-4h',
    price: 'Gratuit',
  },
  {
    icon: '🏛️',
    name: 'Grottes d\'Hercule',
    description: 'Grottes légendaires avec ouverture sur l\'océan',
    duration: '1-2h',
    price: '60 DH',
  },
  {
    icon: '☕',
    name: 'Café Hafa',
    description: 'Café historique avec vue panoramique',
    duration: '1h',
    price: '30-50 DH',
  },
];


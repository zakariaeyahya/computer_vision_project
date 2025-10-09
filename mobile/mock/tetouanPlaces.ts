export interface Place {
  icon: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export const TETOUAN_PLACES: Place[] = [
  {
    icon: '🕌',
    name: 'Médina de Tétouan',
    description: 'Patrimoine UNESCO, architecture andalouse unique',
    duration: '3-4h',
    price: 'Gratuit',
  },
  {
    icon: '🎨',
    name: 'Musée d\'Art Marocain',
    description: 'Collection d\'artisanat et arts traditionnels',
    duration: '1-2h',
    price: '20 DH',
  },
  {
    icon: '🏛️',
    name: 'Place Hassan II',
    description: 'Centre névralgique de la ville moderne',
    duration: '1h',
    price: 'Gratuit',
  },
  {
    icon: '🛍️',
    name: 'Souk Artisanal',
    description: 'Artisanat local, zellige, broderies, bijoux',
    duration: '2-3h',
    price: 'Variable',
  },
  {
    icon: '🌊',
    name: 'Plage de Martil',
    description: 'Station balnéaire à 10 km de Tétouan',
    duration: 'Demi-journée',
    price: 'Gratuit',
  },
];


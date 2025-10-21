import { ImageSourcePropType } from 'react-native';

export interface Destination {
  id: string;
  name: string;
  nickname: string;
  location: string;
  colors: [string, string];
  image: ImageSourcePropType;
  features: Array<{ icon: string; text: string }>;
  route: string;
  description: string;
}

/* eslint-disable @typescript-eslint/no-require-imports */
export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Tétouan',
    nickname: 'La Colombe Blanche',
    location: 'Nord du Maroc',
    colors: ['#C41E3A', '#8B0000'],
    image: require('../assets/images/destinations/tetouan.jpg') as ImageSourcePropType,
    features: [
      { icon: 'city-variant-outline', text: 'UNESCO Medina' },
      { icon: 'palette-outline', text: 'Art & Culture' },
      { icon: 'waves', text: 'Close to the Sea' },
    ],
    route: 'DestinationDetails',
    description: 'Tétouan, surnommée "La Colombe Blanche", est une ville authentique du nord du Maroc. Sa médina, classée au patrimoine mondial de l\'UNESCO, offre une expérience culturelle unique.',
  },
  {
    id: '2',
    name: 'Tanger',
    nickname: 'La Perle du Détroit',
    location: 'Nord du Maroc',
    colors: ['#1E40AF', '#3B82F6'],
    image: require('../assets/images/destinations/tanger.webp') as ImageSourcePropType,
    features: [
      { icon: 'lighthouse', text: 'Cap Spartel' },
      { icon: 'castle', text: 'Kasbah' },
      { icon: 'theater', text: 'Cosmopolitan' },
    ],
    route: 'DestinationDetails',
    description: 'Tanger, "La Perle du Détroit", est une ville cosmopolite où se rencontrent l\'Europe et l\'Afrique. Entre mer et océan, elle offre une richesse culturelle et historique exceptionnelle.',
  },
  {
    id: '3',
    name: 'Chefchaouen',
    nickname: 'La Perle Bleue',
    location: 'Rif Mountains',
    colors: ['#2563EB', '#60A5FA'],
    image: require('../assets/images/destinations/chefchaouen.jpg') as ImageSourcePropType,
    features: [
      { icon: 'water', text: 'Blue City' },
      { icon: 'image-filter-hdr', text: 'Rif Mountains' },
      { icon: 'camera', text: 'Photogenic' },
    ],
    route: 'DestinationDetails',
    description: 'Chefchaouen, "La Perle Bleue", est célèbre pour ses ruelles peintes en bleu. Nichée dans les montagnes du Rif, elle offre une atmosphère paisible et des paysages à couper le souffle.',
  },
];
/* eslint-enable @typescript-eslint/no-require-imports */

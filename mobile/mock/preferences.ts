export type PreferenceType = 'CULTURE' | 'NATURE' | 'GASTRONOMY';

export interface Preference {
  type: PreferenceType;
  label: string;
  description: string;
  emoji: string;
}

// Map destination features to preferences
export const PREFERENCES_BY_DESTINATION: Record<string, Preference[]> = {
  'Tétouan': [
    {
      type: 'CULTURE',
      label: 'Culture et Histoire',
      description: 'Médina UNESCO, musées, sites historiques',
      emoji: 'city-variant'
    },
    {
      type: 'NATURE',
      label: 'Nature et Plages',
      description: 'Plages de Martil, montagnes du Rif',
      emoji: 'waves'
    },
    {
      type: 'GASTRONOMY',
      label: 'Gastronomie',
      description: 'Cuisine andalouse, restaurants traditionnels',
      emoji: 'silverware-fork-knife'
    },
  ],
  'Tanger': [
    {
      type: 'CULTURE',
      label: 'Patrimoine et Histoire',
      description: 'Kasbah, grottes d\'Hercule, médina',
      emoji: 'castle'
    },
    {
      type: 'NATURE',
      label: 'Mer et Nature',
      description: 'Cap Spartel, plages, détroit',
      emoji: 'waves'
    },
    {
      type: 'GASTRONOMY',
      label: 'Gastronomie Cosmopolite',
      description: 'Cuisine internationale, Café Hafa',
      emoji: 'coffee'
    },
  ],
  'Chefchaouen': [
    {
      type: 'CULTURE',
      label: 'Photographie et Art',
      description: 'Ville bleue, médina photogénique',
      emoji: 'camera'
    },
    {
      type: 'NATURE',
      label: 'Randonnées et Montagnes',
      description: 'Cascade Akchour, montagnes du Rif',
      emoji: 'image-filter-hdr'
    },
    {
      type: 'GASTRONOMY',
      label: 'Artisanat et Gastronomie',
      description: 'Tissage local, restaurants de montagne',
      emoji: 'shopping'
    },
  ],
};

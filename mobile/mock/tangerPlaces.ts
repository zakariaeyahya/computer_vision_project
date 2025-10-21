export interface Place {
  icon: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image?: string;
  images?: string[];
  fullDescription?: string;
  highlights?: string[];
  openingHours?: string;
  bestTimeToVisit?: string;
  accessibility?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  category?: string;
  rating?: number;
  reviews?: number;
  tags?: string[];
}

export const TANGER_PLACES: Place[] = [
  {
    icon: 'castle',
    name: 'Kasbah de Tanger',
    description: 'Quartier fortifié avec vues spectaculaires sur le détroit',
    duration: '2-3h',
    price: '20 DH',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80',
    ],
    fullDescription: 'The Kasbah of Tangier is a historic fortified quarter perched on a hilltop overlooking the Strait of Gibraltar. This well-preserved fortress dates back to Roman times and has been rebuilt and expanded over centuries. Within its walls, you\'ll discover narrow winding streets, traditional white-washed houses with blue doors, and stunning viewpoints offering panoramic vistas of the city, port, and the Mediterranean Sea. The Kasbah Museum, housed in the former Sultan\'s palace, displays archaeological artifacts and traditional Moroccan arts.',
    highlights: [
      'Spectacular views of the Strait of Gibraltar',
      'Historic Sultan\'s palace and museum',
      'Traditional Moroccan architecture',
      'Artisan workshops and galleries',
      'Bab el Assa gate and ancient walls',
    ],
    openingHours: 'Open daily, Museum: 10 AM - 6 PM (Closed Tuesdays)',
    bestTimeToVisit: 'Early morning or sunset for best light',
    accessibility: 'Steep streets, limited wheelchair access',
    coordinates: {
      latitude: 35.7894,
      longitude: -5.8111,
    },
    category: 'Historical Site',
    rating: 4.8,
    reviews: 2156,
    tags: ['History', 'Architecture', 'Museum', 'Views', 'Photography'],
  },
  {
    icon: 'lighthouse',
    name: 'Cap Spartel',
    description: 'Point de rencontre entre Atlantique et Méditerranée',
    duration: 'Demi-journée',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    fullDescription: 'Cap Spartel is the dramatic northwestern tip of Africa where the Atlantic Ocean meets the Mediterranean Sea. This scenic promontory features a iconic lighthouse built in 1864, standing 300 meters above sea level. The cape offers breathtaking views of the coastline and on clear days, you can see Spain across the strait. The surrounding area is dotted with luxury villas and the coastal road provides stunning ocean vistas. It\'s a popular spot for sunset watching and photography.',
    highlights: [
      'Meeting point of Atlantic and Mediterranean',
      'Historic lighthouse from 1864',
      'Panoramic ocean views',
      'Stunning sunset location',
      'Views of Spanish coast on clear days',
    ],
    openingHours: 'Open 24/7, Lighthouse visits: 10 AM - 5 PM',
    bestTimeToVisit: 'Sunset time (golden hour)',
    accessibility: 'Accessible by car, paved viewing areas',
    coordinates: {
      latitude: 35.7933,
      longitude: -5.9247,
    },
    category: 'Natural Site',
    rating: 4.6,
    reviews: 1543,
    tags: ['Nature', 'Views', 'Lighthouse', 'Photography', 'Sunset'],
  },
  {
    icon: 'city-variant',
    name: 'Médina de Tanger',
    description: 'Ancien quartier avec souks et architecture traditionnelle',
    duration: '3-4h',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
      'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&q=80',
    ],
    fullDescription: 'The Medina of Tangier is a labyrinth of narrow alleyways, bustling souks, and hidden treasures that embodies the city\'s cosmopolitan history. This ancient quarter has been a crossroads of cultures for centuries, attracting artists, writers, and adventurers from around the world. The medina features colorful markets selling spices, textiles, and handicrafts, traditional riads converted into boutique hotels, and historic sites like the Grand Socco square. Getting lost in these winding streets is part of the authentic Tangier experience.',
    highlights: [
      'Vibrant souks and traditional markets',
      'Grand Socco and Petit Socco squares',
      'Historic American Legation Museum',
      'Traditional Moroccan architecture',
      'Local street food and cafes',
    ],
    openingHours: 'Open daily 24/7 (Shops: 9 AM - 8 PM)',
    bestTimeToVisit: 'Morning for shopping, evening for atmosphere',
    accessibility: 'Narrow streets, not wheelchair friendly',
    coordinates: {
      latitude: 35.7778,
      longitude: -5.8108,
    },
    category: 'Historical Quarter',
    rating: 4.5,
    reviews: 1987,
    tags: ['Shopping', 'Culture', 'History', 'Food', 'Walking Tour'],
  },
  {
    icon: 'cave',
    name: 'Grottes d\'Hercule',
    description: 'Grottes légendaires avec ouverture sur l\'océan',
    duration: '1-2h',
    price: '60 DH',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    fullDescription: 'The Caves of Hercules are legendary natural sea caves located 14 km west of Tangier, near Cap Spartel. According to Greek mythology, this is where Hercules rested after separating Europe from Africa. The caves feature a famous opening shaped like the African continent (best viewed from inside) that frames the Atlantic Ocean beautifully. The site has both natural and man-made sections - the upper chambers were carved by Berbers who extracted millstones for centuries. The dramatic setting and mythological significance make it one of Morocco\'s most visited natural attractions.',
    highlights: [
      'Africa-shaped opening to the ocean',
      'Mythological significance',
      'Ancient millstone quarry',
      'Dramatic ocean views',
      'Archaeological findings',
    ],
    openingHours: 'Daily: 9:00 AM - 6:00 PM',
    bestTimeToVisit: 'Mid-morning for best lighting inside caves',
    accessibility: 'Steps and uneven surfaces, difficult for wheelchairs',
    coordinates: {
      latitude: 35.7928,
      longitude: -5.9381,
    },
    category: 'Natural Cave',
    rating: 4.4,
    reviews: 2341,
    tags: ['Nature', 'History', 'Mythology', 'Photography', 'Geology'],
  },
  {
    icon: 'coffee',
    name: 'Café Hafa',
    description: 'Café historique avec vue panoramique',
    duration: '1h',
    price: '30-50 DH',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    ],
    fullDescription: 'Café Hafa is an iconic historic café perched on cliffs overlooking the Strait of Gibraltar, established in 1921. This legendary spot has been frequented by famous artists, writers, and musicians including the Rolling Stones, Paul Bowles, and William S. Burroughs. The café maintains its authentic character with simple terraced seating offering breathtaking sunset views. Sip traditional mint tea while watching ships pass through the strait and the sun dip below the horizon. The relaxed atmosphere and spectacular setting make it a must-visit in Tangier.',
    highlights: [
      'Historic café since 1921',
      'Breathtaking sunset views',
      'Famous literary and artistic clientele',
      'Traditional Moroccan mint tea',
      'Terraced cliff-side seating',
    ],
    openingHours: 'Daily: 8:00 AM - 12:00 AM',
    bestTimeToVisit: 'Sunset time (5-7 PM)',
    accessibility: 'Steep steps, not wheelchair accessible',
    coordinates: {
      latitude: 35.7841,
      longitude: -5.8269,
    },
    category: 'Café',
    rating: 4.7,
    reviews: 3421,
    tags: ['Café', 'Views', 'Historic', 'Sunset', 'Culture'],
  },
];


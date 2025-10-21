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

export const CHEFCHAOUEN_PLACES: Place[] = [
  {
    icon: 'water',
    name: 'Médina Bleue',
    description: 'Dédale de ruelles peintes en bleu indigo',
    duration: '3-4h',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    ],
    fullDescription: 'The Blue Medina of Chefchaouen is one of Morocco\'s most photogenic destinations, famous for its striking blue-washed buildings and winding alleyways. Founded in 1471, this mountain town\'s tradition of painting buildings blue dates back centuries, possibly linked to Jewish refugees or to repel mosquitoes. Walking through the medina feels like stepping into a dream, with every corner offering a new shade of blue and countless photo opportunities. The relaxed atmosphere, friendly locals, and artisan shops make it a perfect place to wander aimlessly and discover hidden gems.',
    highlights: [
      'Instagram-famous blue-painted streets',
      'Photogenic architecture at every corner',
      'Artisan shops selling local handicrafts',
      'Relaxed, bohemian atmosphere',
      'Mountains backdrop creating stunning views',
    ],
    openingHours: 'Open 24/7 (Shops: 9 AM - 8 PM)',
    bestTimeToVisit: 'Early morning (7-10 AM) for best light and fewer crowds',
    accessibility: 'Steep cobblestone streets, challenging for wheelchairs',
    coordinates: {
      latitude: 35.1689,
      longitude: -5.2636,
    },
    category: 'Historical Quarter',
    rating: 4.9,
    reviews: 4567,
    tags: ['Photography', 'Architecture', 'Culture', 'Shopping', 'Walking Tour'],
  },
  {
    icon: 'town-hall',
    name: 'Place Outa el Hammam',
    description: 'Place centrale avec cafés et restaurants',
    duration: '1-2h',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    ],
    fullDescription: 'Place Outa el Hammam is the beating heart of Chefchaouen, the main square where locals and tourists gather throughout the day. This charming plaza is surrounded by cafes and restaurants offering Moroccan mint tea and traditional cuisine. The square features the Grand Mosque with its distinctive octagonal minaret and provides access to the kasbah. It\'s the perfect spot to sit, relax, people-watch, and soak in the atmosphere of this unique blue city. Street vendors sell fresh orange juice and local handicrafts around the perimeter.',
    highlights: [
      'Central gathering point for locals and tourists',
      'Grand Mosque with octagonal minaret',
      'Numerous cafes and restaurants',
      'Street vendors and orange juice stalls',
      'Gateway to the kasbah',
    ],
    openingHours: 'Open 24/7 (Cafes: 8 AM - 11 PM)',
    bestTimeToVisit: 'Late afternoon and evening',
    accessibility: 'Fully accessible, flat paved square',
    coordinates: {
      latitude: 35.1706,
      longitude: -5.2689,
    },
    category: 'Public Square',
    rating: 4.6,
    reviews: 2134,
    tags: ['Public Space', 'Cafes', 'Food', 'Social', 'Relaxation'],
  },
  {
    icon: 'fortress',
    name: 'Kasbah et Musée',
    description: 'Forteresse du 15ème siècle avec musée ethnographique',
    duration: '1-2h',
    price: '20 DH',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    ],
    fullDescription: 'The Kasbah of Chefchaouen, built in the 15th century by Moulay Ali Ben Rachid, dominates the western side of Place Outa el Hammam. This restored fortress features beautiful Andalusian gardens, ancient dungeons, and an ethnographic museum showcasing traditional Rifian artifacts, weapons, musical instruments, and costumes. The kasbah\'s tower offers panoramic views over the blue medina and surrounding Rif Mountains. The peaceful interior gardens provide a tranquil escape with fountains and orange trees, making it a perfect complement to exploring the busy medina.',
    highlights: [
      '15th-century fortress architecture',
      'Ethnographic museum with local artifacts',
      'Panoramic tower views of blue medina',
      'Beautiful Andalusian gardens',
      'Historic dungeons and architecture',
    ],
    openingHours: 'Daily: 9:00 AM - 6:30 PM',
    bestTimeToVisit: 'Morning or late afternoon',
    accessibility: 'Stairs to tower, ground floor accessible',
    coordinates: {
      latitude: 35.1703,
      longitude: -5.2695,
    },
    category: 'Historical Site',
    rating: 4.5,
    reviews: 1876,
    tags: ['History', 'Museum', 'Architecture', 'Views', 'Gardens'],
  },
  {
    icon: 'waterfall',
    name: 'Cascade d\'Akchour',
    description: 'Magnifique cascade accessible par randonnée',
    duration: 'Journée complète',
    price: '50 DH (guide)',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    ],
    fullDescription: 'The Akchour Waterfalls are spectacular natural cascades located in the Rif Mountains, about 30 km from Chefchaouen. This popular hiking destination features two main waterfalls: the smaller cascade (1-hour hike) and the impressive God\'s Bridge waterfall (3-4 hour hike). The trail follows a beautiful river valley with crystal-clear natural pools perfect for swimming in summer. The hike passes through stunning mountain scenery with opportunities to spot Barbary macaques. Local guides are available and recommended for the longer trek to God\'s Bridge, a natural rock arch spanning the gorge.',
    highlights: [
      'Two magnificent waterfalls',
      'Natural swimming pools with clear water',
      'God\'s Bridge natural rock formation',
      'Scenic mountain hiking trails',
      'Wildlife spotting (Barbary macaques)',
    ],
    openingHours: 'Best visited: April - October (water levels vary)',
    bestTimeToVisit: 'Spring and early summer for best water flow',
    accessibility: 'Hiking required, not wheelchair accessible',
    coordinates: {
      latitude: 35.0972,
      longitude: -5.1211,
    },
    category: 'Nature',
    rating: 4.8,
    reviews: 3245,
    tags: ['Hiking', 'Nature', 'Waterfall', 'Swimming', 'Adventure'],
  },
  {
    icon: 'image-filter-hdr',
    name: 'Mosquée Espagnole',
    description: 'Vue panoramique sur la ville bleue',
    duration: '2h (randonnée)',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80',
    ],
    fullDescription: 'The Spanish Mosque is an abandoned white mosque perched on a hillside overlooking Chefchaouen. Built by Spanish troops in the 1920s but never used for worship, it offers the most spectacular panoramic views of the blue city against the backdrop of the Rif Mountains. The 45-minute hike up is moderately challenging but rewarding, especially at sunset when the setting sun bathes the city in golden light. The mosque itself is in ruins but provides an excellent vantage point for photography. It\'s one of the most popular activities for visitors wanting to capture the blue medina from above.',
    highlights: [
      'Best panoramic views of Chefchaouen',
      'Spectacular sunset photography spot',
      'Moderate 45-minute hiking trail',
      'Historic Spanish colonial architecture',
      'Views of Rif Mountains backdrop',
    ],
    openingHours: 'Accessible 24/7 (Best at sunrise/sunset)',
    bestTimeToVisit: 'Sunset for photography (arrive 1 hour before)',
    accessibility: 'Hiking trail, not wheelchair accessible',
    coordinates: {
      latitude: 35.1754,
      longitude: -5.2714,
    },
    category: 'Viewpoint',
    rating: 4.7,
    reviews: 2987,
    tags: ['Hiking', 'Views', 'Photography', 'Sunset', 'Nature'],
  },
];


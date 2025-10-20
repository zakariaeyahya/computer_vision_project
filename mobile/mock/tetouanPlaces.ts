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

export const TETOUAN_PLACES: Place[] = [
  {
    icon: 'city',
    name: 'Médina de Tétouan',
    description: 'Patrimoine UNESCO, architecture andalouse unique',
    duration: '3-4h',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    ],
    fullDescription: 'The Medina of Tétouan is a UNESCO World Heritage Site and one of the most authentic examples of Andalusian architecture in Morocco. Built in the 15th century by refugees from Granada, this walled medina preserves its original urban layout and traditional crafts. The narrow streets, white-washed houses with colorful tiles, and artisan workshops create an authentic atmosphere frozen in time. The medina is relatively small and easy to navigate, making it perfect for leisurely exploration.',
    highlights: [
      'UNESCO World Heritage Site since 1997',
      'Authentic Andalusian architecture',
      'Traditional artisan workshops',
      'Historic gates and ramparts',
      'Local crafts: leather, textiles, ceramics',
    ],
    openingHours: 'Open daily, 24/7 (shops typically 9 AM - 8 PM)',
    bestTimeToVisit: 'Morning (9-11 AM) or late afternoon (4-7 PM)',
    accessibility: 'Narrow streets, limited wheelchair access',
    coordinates: {
      latitude: 35.5711,
      longitude: -5.3686,
    },
    category: 'Historical Site',
    rating: 4.7,
    reviews: 1243,
    tags: ['UNESCO', 'History', 'Culture', 'Photography', 'Walking Tour'],
  },
  {
    icon: 'palette',
    name: 'Musée d\'Art Marocain',
    description: 'Collection d\'artisanat et arts traditionnels',
    duration: '1-2h',
    price: '20 DH',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80',
    ],
    fullDescription: 'The Moroccan Art Museum showcases an impressive collection of traditional Moroccan crafts and arts. Housed in a beautiful historic building, the museum features exhibitions of zellige (mosaic tilework), traditional costumes, intricate jewelry, leather goods, and wooden crafts. The museum provides excellent context for understanding Tétouan\'s rich artisan heritage and the influence of Andalusian culture on Moroccan craftsmanship.',
    highlights: [
      'Traditional Moroccan zellige and ceramics',
      'Authentic Berber and Andalusian jewelry',
      'Historic textile and embroidery collection',
      'Traditional musical instruments',
      'Well-preserved architectural details',
    ],
    openingHours: 'Mon-Sun: 9:00 AM - 5:00 PM (Closed Tuesdays)',
    bestTimeToVisit: 'Weekday mornings for fewer crowds',
    accessibility: 'Partially accessible, ground floor accessible',
    coordinates: {
      latitude: 35.5728,
      longitude: -5.3698,
    },
    category: 'Museum',
    rating: 4.5,
    reviews: 567,
    tags: ['Art', 'Culture', 'Museum', 'Crafts', 'Indoor'],
  },
  {
    icon: 'bank',
    name: 'Place Hassan II',
    description: 'Centre névralgique de la ville moderne',
    duration: '1h',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    ],
    fullDescription: 'Place Hassan II is the main square of modern Tétouan, serving as the central hub of the city. Surrounded by Spanish colonial architecture, cafes, and administrative buildings, this lively square is where locals gather to socialize. The plaza features beautiful gardens, fountains, and is an excellent spot for people-watching. In the evening, families stroll around while children play, creating a vibrant community atmosphere.',
    highlights: [
      'Spanish colonial architecture',
      'Central meeting point for locals',
      'Surrounding cafes and restaurants',
      'Beautiful fountain and gardens',
      'Great for people-watching',
    ],
    openingHours: 'Open 24/7, most activity 4 PM - 10 PM',
    bestTimeToVisit: 'Late afternoon and evening',
    accessibility: 'Fully accessible',
    coordinates: {
      latitude: 35.5744,
      longitude: -5.3671,
    },
    category: 'Public Square',
    rating: 4.3,
    reviews: 432,
    tags: ['Public Space', 'Photography', 'Cafes', 'Architecture'],
  },
  {
    icon: 'shopping',
    name: 'Souk Artisanal',
    description: 'Artisanat local, zellige, broderies, bijoux',
    duration: '2-3h',
    price: 'Variable',
    image: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&q=80',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80',
    ],
    fullDescription: 'The Artisan Souk of Tétouan is a treasure trove of traditional Moroccan crafts. Unlike tourist-heavy markets, this souk maintains its authentic character with local artisans still working in small workshops. You\'ll find exquisite zellige tilework, hand-woven textiles, traditional embroidery, leather goods, and intricate silver jewelry. The souk is an excellent place to observe craftsmen at work and purchase authentic souvenirs directly from the makers.',
    highlights: [
      'Authentic handmade crafts',
      'Watch artisans at work',
      'Traditional zellige and ceramics',
      'Hand-embroidered textiles',
      'Silver jewelry and leather goods',
    ],
    openingHours: 'Daily: 9:00 AM - 7:00 PM (Some shops close Fridays)',
    bestTimeToVisit: 'Morning hours for best selection',
    accessibility: 'Limited accessibility, narrow passages',
    coordinates: {
      latitude: 35.5695,
      longitude: -5.3710,
    },
    category: 'Shopping',
    rating: 4.6,
    reviews: 892,
    tags: ['Shopping', 'Crafts', 'Souvenirs', 'Traditional', 'Local'],
  },
  {
    icon: 'beach',
    name: 'Plage de Martil',
    description: 'Station balnéaire à 10 km de Tétouan',
    duration: 'Demi-journée',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    ],
    fullDescription: 'Martil Beach is a popular seaside resort located just 10 km from Tétouan. This long stretch of sandy beach offers a perfect escape from the city heat, especially during summer months. The beach is well-maintained with facilities including showers, changing rooms, and numerous beachfront cafes and restaurants. The calm Mediterranean waters are ideal for swimming, and the promenade is perfect for evening strolls. During summer, the beach comes alive with families and water sports enthusiasts.',
    highlights: [
      'Long sandy Mediterranean beach',
      'Clean waters ideal for swimming',
      'Beachfront cafes and restaurants',
      'Water sports activities available',
      'Family-friendly atmosphere',
    ],
    openingHours: 'Beach access 24/7 (Lifeguards: 10 AM - 6 PM in summer)',
    bestTimeToVisit: 'June to September for swimming',
    accessibility: 'Accessible, paved promenade',
    coordinates: {
      latitude: 35.6167,
      longitude: -5.2833,
    },
    category: 'Beach',
    rating: 4.2,
    reviews: 678,
    tags: ['Beach', 'Swimming', 'Family', 'Relaxation', 'Water Sports'],
  },
];


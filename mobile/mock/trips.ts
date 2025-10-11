export interface Trip {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'completed' | 'ongoing';
  image: string;
  backgroundColor: [string, string];
  budget: number;
  days: number;
}

export const MOCK_TRIPS: Trip[] = [
  {
    id: 1,
    destination: 'Tétouan',
    startDate: '3 Mai 2025',
    endDate: '5 Mai 2025',
    status: 'upcoming',
    image: '🏛️',
    backgroundColor: ['#C41E3A', '#8B0000'],
    budget: 850,
    days: 3,
  },
  {
    id: 2,
    destination: 'Tanger',
    startDate: '10 Avril 2025',
    endDate: '12 Avril 2025',
    status: 'completed',
    image: '🌊',
    backgroundColor: ['#1E40AF', '#3B82F6'],
    budget: 1200,
    days: 3,
  },
];


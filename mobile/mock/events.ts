export interface Event {
  id: string;
  name: string;
  type: string;
  city: string;
  date: string;
  description: string;
  price: string;
  icon: "music" | "trophy" | "ticket" | "users";
}

export const EVENTS: Event[] = [
  {
    id: "1",
    name: "Festival de la Médina",
    type: "Culture",
    city: "Tétouan",
    date: "15-18 Mars 2025",
    description: "Festival culturel dans la médina UNESCO de Tétouan avec artisanat, musique andalouse et gastronomie traditionnelle",
    price: "Gratuit",
    icon: "ticket",
  },
  {
    id: "2",
    name: "Festival de Musique du Rif",
    type: "Musique",
    city: "Chefchaouen",
    date: "10-12 Mai 2025",
    description: "Festival de musique traditionnelle et moderne dans la ville bleue",
    price: "À partir de 50 DH",
    icon: "music",
  },
  {
    id: "3",
    name: "Marathon de Tanger",
    type: "Sport",
    city: "Tanger",
    date: "25 Mai 2025",
    description: "Course à pied le long du détroit de Gibraltar avec vue sur l'Europe",
    price: "80 DH",
    icon: "trophy",
  },
  {
    id: "4",
    name: "Festival des Arts de Tanger",
    type: "Culture",
    city: "Tanger",
    date: "5-8 Juin 2025",
    description: "Exposition d'art contemporain et performances dans la kasbah",
    price: "Gratuit",
    icon: "ticket",
  },
  {
    id: "5",
    name: "Randonnée des Montagnes Bleues",
    type: "Nature",
    city: "Chefchaouen",
    date: "20-22 Juin 2025",
    description: "Randonnée guidée dans les montagnes du Rif avec vue sur Chefchaouen",
    price: "120 DH",
    icon: "users",
  },
  {
    id: "6",
    name: "Festival de la Gastronomie Andalouse",
    type: "Gastronomie",
    city: "Tétouan",
    date: "12-15 Septembre 2025",
    description: "Découverte de la cuisine andalouse traditionnelle et moderne",
    price: "À partir de 30 DH",
    icon: "users",
  },
];

export const CITIES = ["Toutes", "Tétouan", "Tanger", "Chefchaouen"];
export const EVENT_TYPES = ["Tous", "Culture", "Musique", "Sport", "Nature", "Gastronomie"];

// Destination management service for admin panel

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  activities: string[];
  bestTime: string;
  highlights: string[];
  category: 'beach' | 'cultural' | 'wildlife' | 'adventure' | 'mountain';
}

// Initial destinations data
const defaultDestinations: Destination[] = [
  {
    id: '1',
    name: 'Sigiriya Rock Fortress',
    location: 'Sigiriya, Central Province',
    description: 'Ancient rock fortress and UNESCO World Heritage Site with stunning views',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=500',
    rating: 4.8,
    reviews: 2341,
    activities: ['Hiking', 'Photography', 'History Tours'],
    bestTime: 'December to March',
    highlights: ['Ancient frescoes', 'Mirror wall', 'Lion Gate', 'Summit views'],
    category: 'cultural',
  },
  {
    id: '2',
    name: 'Mirissa Beach',
    location: 'Mirissa, Southern Province',
    description: 'Beautiful beach paradise known for whale watching and surfing',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
    rating: 4.7,
    reviews: 1876,
    activities: ['Whale Watching', 'Surfing', 'Beach Activities'],
    bestTime: 'November to April',
    highlights: ['Whale watching tours', 'Pristine beaches', 'Sunset views', 'Water sports'],
    category: 'beach',
  },
  {
    id: '3',
    name: 'Yala National Park',
    location: 'Yala, Southern Province',
    description: 'Famous wildlife sanctuary home to leopards and elephants',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500',
    rating: 4.6,
    reviews: 1532,
    activities: ['Safari', 'Wildlife Photography', 'Bird Watching'],
    bestTime: 'February to July',
    highlights: ['Leopard sightings', 'Elephant herds', 'Diverse wildlife', 'Scenic landscapes'],
    category: 'wildlife',
  },
  {
    id: '4',
    name: 'Ella',
    location: 'Ella, Uva Province',
    description: 'Scenic hill country town with tea plantations and hiking trails',
    image: 'https://images.unsplash.com/photo-1566636965834-b8b4ac7c7e1a?w=500',
    rating: 4.9,
    reviews: 2156,
    activities: ['Hiking', 'Tea Tours', 'Train Rides'],
    bestTime: 'January to March',
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", 'Tea plantations', 'Ravana Falls'],
    category: 'mountain',
  },
];

// Load destinations from localStorage or use defaults
const loadDestinations = (): Destination[] => {
  const stored = localStorage.getItem('destinations');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [...defaultDestinations];
    }
  }
  return [...defaultDestinations];
};

// Save destinations to localStorage
const saveDestinations = (destinations: Destination[]): void => {
  localStorage.setItem('destinations', JSON.stringify(destinations));
};

export const destinationService = {
  // Get all destinations
  getAll: (): Destination[] => {
    return loadDestinations();
  },

  // Get destination by ID
  getById: (id: string): Destination | undefined => {
    const destinations = loadDestinations();
    return destinations.find((dest) => dest.id === id);
  },

  // Create new destination
  create: (destination: Omit<Destination, 'id'>): Destination => {
    const destinations = loadDestinations();
    const newDestination: Destination = {
      ...destination,
      id: Date.now().toString(),
    };
    destinations.push(newDestination);
    saveDestinations(destinations);
    return newDestination;
  },

  // Update destination
  update: (id: string, updates: Partial<Destination>): Destination | null => {
    const destinations = loadDestinations();
    const index = destinations.findIndex((dest) => dest.id === id);
    
    if (index === -1) {
      return null;
    }

    destinations[index] = {
      ...destinations[index],
      ...updates,
      id, // Ensure ID doesn't change
    };
    
    saveDestinations(destinations);
    return destinations[index];
  },

  // Delete destination
  delete: (id: string): boolean => {
    const destinations = loadDestinations();
    const filtered = destinations.filter((dest) => dest.id !== id);
    
    if (filtered.length === destinations.length) {
      return false; // ID not found
    }
    
    saveDestinations(filtered);
    return true;
  },

  // Search destinations
  search: (query: string): Destination[] => {
    const destinations = loadDestinations();
    const lowerQuery = query.toLowerCase();
    return destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(lowerQuery) ||
        dest.location.toLowerCase().includes(lowerQuery) ||
        dest.description.toLowerCase().includes(lowerQuery)
    );
  },

  // Get destinations by category
  getByCategory: (category: Destination['category']): Destination[] => {
    const destinations = loadDestinations();
    return destinations.filter((dest) => dest.category === category);
  },
};

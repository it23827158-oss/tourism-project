// Tour guide management service for admin panel

export interface Guide {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  languages: string[];
  specialties: string[];
  experience: number; // years
  rating: number;
  reviews: number;
  bio: string;
  certifications: string[];
  availability: 'available' | 'busy' | 'unavailable';
  pricePerDay: number;
}

// Initial guides data
const defaultGuides: Guide[] = [
  {
    id: '1',
    name: 'Rohan Silva',
    email: 'rohan.silva@sltraveler.com',
    phone: '+94 77 123 4567',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    languages: ['English', 'Sinhala', 'Tamil'],
    specialties: ['Cultural Tours', 'Historical Sites', 'Photography Tours'],
    experience: 8,
    rating: 4.9,
    reviews: 234,
    bio: 'Experienced cultural guide with deep knowledge of Sri Lankan history and heritage sites.',
    certifications: ['Licensed Tour Guide', 'First Aid Certified', 'Wildlife Guide'],
    availability: 'available',
    pricePerDay: 80,
  },
  {
    id: '2',
    name: 'Chamara Fernando',
    email: 'chamara.fernando@sltraveler.com',
    phone: '+94 77 234 5678',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    languages: ['English', 'Sinhala', 'German'],
    specialties: ['Wildlife Safari', 'Nature Tours', 'Bird Watching'],
    experience: 12,
    rating: 4.8,
    reviews: 189,
    bio: 'Wildlife enthusiast specializing in safari tours and bird watching expeditions.',
    certifications: ['Wildlife Expert', 'Licensed Tour Guide', 'Conservation Specialist'],
    availability: 'available',
    pricePerDay: 95,
  },
  {
    id: '3',
    name: 'Nimal Perera',
    email: 'nimal.perera@sltraveler.com',
    phone: '+94 77 345 6789',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    languages: ['English', 'Sinhala', 'French'],
    specialties: ['Adventure Tours', 'Mountain Trekking', 'Water Sports'],
    experience: 6,
    rating: 4.7,
    reviews: 145,
    bio: 'Adventure guide passionate about extreme sports and mountain expeditions.',
    certifications: ['Mountain Guide', 'Scuba Instructor', 'Licensed Tour Guide'],
    availability: 'busy',
    pricePerDay: 75,
  },
];

// Load guides from localStorage or use defaults
const loadGuides = (): Guide[] => {
  const stored = localStorage.getItem('guides');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [...defaultGuides];
    }
  }
  return [...defaultGuides];
};

// Save guides to localStorage
const saveGuides = (guides: Guide[]): void => {
  localStorage.setItem('guides', JSON.stringify(guides));
};

export const guideService = {
  // Get all guides
  getAll: (): Guide[] => {
    return loadGuides();
  },

  // Get guide by ID
  getById: (id: string): Guide | undefined => {
    const guides = loadGuides();
    return guides.find((guide) => guide.id === id);
  },

  // Create new guide
  create: (guide: Omit<Guide, 'id'>): Guide => {
    const guides = loadGuides();
    const newGuide: Guide = {
      ...guide,
      id: Date.now().toString(),
    };
    guides.push(newGuide);
    saveGuides(guides);
    return newGuide;
  },

  // Update guide
  update: (id: string, updates: Partial<Guide>): Guide | null => {
    const guides = loadGuides();
    const index = guides.findIndex((guide) => guide.id === id);
    
    if (index === -1) {
      return null;
    }

    guides[index] = {
      ...guides[index],
      ...updates,
      id, // Ensure ID doesn't change
    };
    
    saveGuides(guides);
    return guides[index];
  },

  // Delete guide
  delete: (id: string): boolean => {
    const guides = loadGuides();
    const filtered = guides.filter((guide) => guide.id !== id);
    
    if (filtered.length === guides.length) {
      return false; // ID not found
    }
    
    saveGuides(filtered);
    return true;
  },

  // Search guides
  search: (query: string): Guide[] => {
    const guides = loadGuides();
    const lowerQuery = query.toLowerCase();
    return guides.filter(
      (guide) =>
        guide.name.toLowerCase().includes(lowerQuery) ||
        guide.specialties.some(s => s.toLowerCase().includes(lowerQuery)) ||
        guide.languages.some(l => l.toLowerCase().includes(lowerQuery))
    );
  },

  // Get guides by availability
  getByAvailability: (availability: Guide['availability']): Guide[] => {
    const guides = loadGuides();
    return guides.filter((guide) => guide.availability === availability);
  },

  // Get available guides
  getAvailable: (): Guide[] => {
    return guideService.getByAvailability('available');
  },
};

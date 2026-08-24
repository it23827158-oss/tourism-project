import { Star, MapPin, Languages, Award, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const guides = [
  {
    name: 'Chaminda Silva',
    location: 'Colombo',
    rating: 5.0,
    reviews: 234,
    experience: '12 years',
    languages: ['English', 'Sinhala', 'Tamil'],
    specialties: ['Cultural Tours', 'Wildlife', 'Photography'],
    price: 80,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
  },
  {
    name: 'Nimal Perera',
    location: 'Kandy',
    rating: 4.9,
    reviews: 187,
    experience: '8 years',
    languages: ['English', 'Sinhala', 'German'],
    specialties: ['Hill Country', 'Tea Tours', 'Adventure'],
    price: 75,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
  },
  {
    name: 'Kumari Fernando',
    location: 'Galle',
    rating: 4.8,
    reviews: 156,
    experience: '6 years',
    languages: ['English', 'Sinhala', 'French'],
    specialties: ['Beach Tours', 'Historical Sites', 'Food Tours'],
    price: 70,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
  },
  {
    name: 'Rohan Jayawardena',
    location: 'Ella',
    rating: 5.0,
    reviews: 198,
    experience: '10 years',
    languages: ['English', 'Sinhala', 'Spanish'],
    specialties: ['Hiking', 'Nature', 'Adventure Sports'],
    price: 85,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  },
  {
    name: 'Saman Dissanayake',
    location: 'Yala',
    rating: 4.9,
    reviews: 223,
    experience: '15 years',
    languages: ['English', 'Sinhala', 'Japanese'],
    specialties: ['Wildlife Safari', 'Bird Watching', 'Nature'],
    price: 90,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
  },
  {
    name: 'Dilini Rathnayake',
    location: 'Sigiriya',
    rating: 4.7,
    reviews: 142,
    experience: '7 years',
    languages: ['English', 'Sinhala', 'Chinese'],
    specialties: ['Historical Sites', 'Cultural Heritage', 'Art'],
    price: 75,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
  },
];

export default function TravelGuides() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            Expert Travel Guides
          </h1>
          <p className="text-xl text-white/90">
            Connect with certified local guides for an authentic Sri Lankan experience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <div key={index} className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-all p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl text-foreground mb-1">{guide.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{guide.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{guide.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({guide.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  <span>{guide.experience} experience</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <Languages className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{guide.languages.join(', ')}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-2xl text-primary">${guide.price}</span>
                  <span className="text-sm text-gray-500">/day</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button size="sm">Book Guide</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



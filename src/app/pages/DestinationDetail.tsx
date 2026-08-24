import { useParams, Link } from 'react-router';
import { MapPin, Star, Calendar, Clock, Users, Camera, Utensils, Hotel, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const destinationData: Record<string, any> = {
  sigiriya: {
    title: 'Sigiriya Rock Fortress',
    location: 'Central Province, Sri Lanka',
    rating: 4.8,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1663784025074-49e9e7f11f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    description: 'Sigiriya, also known as Lion Rock, is an ancient rock fortress located in the northern Matale District near the town of Dambulla. It is a UNESCO World Heritage site and one of the best-preserved examples of ancient urban planning.',
    highlights: [
      'Ancient frescoes of celestial maidens',
      'Mirror wall with ancient graffiti',
      'Royal gardens with advanced hydraulics',
      'Panoramic views from the summit',
      'Archaeological museum',
    ],
    bestTime: 'December to April (dry season)',
    duration: '3-4 hours',
    activities: ['Historical Tours', 'Photography', 'Hiking', 'Culture'],
    nearbyAttractions: [
      { name: 'Dambulla Cave Temple', distance: '20 km' },
      { name: 'Pidurangala Rock', distance: '2 km' },
      { name: 'Minneriya National Park', distance: '30 km' },
    ],
  },
  ella: {
    title: 'Ella Hill Country',
    location: 'Uva Province, Sri Lanka',
    rating: 4.9,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1759213111668-880a071ecf0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920',
    description: 'Ella is a small town in the Badulla District of Uva Province, Sri Lanka. Surrounded by the beautiful green mountains, Ella\'s climate is cool and pleasant, and the area is perfect for hiking and exploring tea plantations.',
    highlights: [
      'Nine Arch Bridge - architectural marvel',
      'Little Adam\'s Peak - scenic hike',
      'Ella Rock - challenging trek',
      'Ravana Falls - stunning waterfall',
      'Tea factory tours',
    ],
    bestTime: 'January to March (coolest weather)',
    duration: '2-3 days recommended',
    activities: ['Hiking', 'Train Rides', 'Tea Tasting', 'Photography'],
    nearbyAttractions: [
      { name: 'Lipton\'s Seat', distance: '25 km' },
      { name: 'Udawalawe National Park', distance: '45 km' },
      { name: 'Bambarakanda Falls', distance: '30 km' },
    ],
  },
};

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = destinationData[id || 'sigiriya'] || destinationData.sigiriya;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[500px]">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">{destination.title}</h1>
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{destination.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{destination.rating} ({destination.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-base text-foreground leading-relaxed">{destination.description}</p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Highlights</h2>
              <ul className="space-y-3">
                {destination.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-base text-foreground font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Best Time to Visit */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Best Time to Visit</h2>
              <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-lg font-bold text-foreground">{destination.bestTime}</p>
                    <p className="text-sm text-foreground/80 mt-1">
                      Plan your visit during these months for the best weather and experience
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Activities */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Popular Activities</h2>
              <div className="flex flex-wrap gap-3">
                {destination.activities.map((activity: string) => (
                  <Badge key={activity} variant="secondary" className="px-4 py-2 text-sm font-semibold">
                    {activity}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Nearby Attractions */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Nearby Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.nearbyAttractions.map((attraction: any, index: number) => (
                  <div key={index} className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-foreground">{attraction.name}</h3>
                        <p className="text-sm text-foreground/70 mt-1">{attraction.distance} away</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border-2 border-border rounded-2xl p-6 sticky top-24 space-y-6 shadow-lg">
              {/* Quick Info */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2.5 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Duration</p>
                      <p className="text-base font-bold text-foreground mt-1">{destination.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2.5 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Group Size</p>
                      <p className="text-base font-bold text-foreground mt-1">Any size</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2.5 rounded-lg">
                      <Camera className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Photography</p>
                      <p className="text-base font-bold text-foreground mt-1">Allowed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-border"></div>

              {/* Actions */}
              <div className="space-y-3">
                <Link to="/trip-planner" className="block">
                  <Button className="w-full gap-2 text-sm py-5 font-semibold">
                    Add to Trip Plan
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/bookings" className="block">
                  <Button variant="outline" className="w-full gap-2 text-sm py-5 font-semibold border-2">
                    <Hotel className="w-4 h-4" />
                    Book Accommodation
                  </Button>
                </Link>
                <Link to="/guides" className="block">
                  <Button variant="outline" className="w-full gap-2 text-sm py-5 font-semibold border-2">
                    <Users className="w-4 h-4" />
                    Find a Guide
                  </Button>
                </Link>
              </div>

              <div className="border-t-2 border-border"></div>

              {/* Services Available */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">Services Available</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                    <span className="font-medium">Guided tours</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-foreground">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-medium">Transport available</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-foreground">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-medium">Restaurants nearby</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-foreground">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-medium">Parking facilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


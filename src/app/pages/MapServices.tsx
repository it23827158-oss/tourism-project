import { MapPin, Hospital, Shield, UtensilsCrossed, Hotel, Fuel, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

const nearbyServices = [
  {
    category: 'Hospitals',
    icon: Hospital,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    services: [
      { name: 'Asiri Hospital Colombo', distance: '2.5 km', address: 'No. 21, Kirimandala Mawatha' },
      { name: 'Lanka Hospitals', distance: '3.8 km', address: '578 Elvitigala Mawatha' },
      { name: 'Nawaloka Hospital', distance: '4.2 km', address: '23 Deshamanya H.K. Dharmadasa Mawatha' },
    ],
  },
  {
    category: 'Police Stations',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    services: [
      { name: 'Kollupitiya Police Station', distance: '1.8 km', address: 'Ward Place, Colombo 07' },
      { name: 'Cinnamon Gardens Police', distance: '2.3 km', address: 'Horton Place, Colombo 07' },
      { name: 'Tourist Police Colombo', distance: '2.7 km', address: 'R.A. De Mel Mawatha, Colombo 03' },
    ],
  },
  {
    category: 'Restaurants',
    icon: UtensilsCrossed,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    services: [
      { name: 'Ministry of Crab', distance: '1.2 km', address: 'Old Dutch Hospital, Colombo 01' },
      { name: 'Nuga Gama', distance: '2.8 km', address: 'Cinnamon Grand, Colombo 03' },
      { name: 'Upali\'s', distance: '1.5 km', address: 'R.A. De Mel Mawatha, Colombo 03' },
    ],
  },
  {
    category: 'Hotels',
    icon: Hotel,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    services: [
      { name: 'Cinnamon Grand', distance: '2.1 km', address: '77 Galle Road, Colombo 03' },
      { name: 'Shangri-La Colombo', distance: '1.9 km', address: 'One Galle Face, Colombo 02' },
      { name: 'Kingsbury Hotel', distance: '2.5 km', address: '48 Janadhipathi Mawatha, Colombo 01' },
    ],
  },
  {
    category: 'Fuel Stations',
    icon: Fuel,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    services: [
      { name: 'Ceypetco Filling Station', distance: '0.8 km', address: 'Galle Road, Colombo 03' },
      { name: 'Indian Oil Station', distance: '1.5 km', address: 'Ward Place, Colombo 07' },
      { name: 'Laughs Fuel Station', distance: '2.2 km', address: 'Dharmapala Mawatha, Colombo 07' },
    ],
  },
];

export default function MapServices() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            Map & Nearby Services
          </h1>
          <p className="text-xl text-white/90">
            Find essential services and attractions near you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for services, attractions, or addresses..."
              className="pl-12 py-6 text-lg bg-card shadow-lg"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-xl text-foreground">Interactive Map View</p>
              <p className="text-sm text-gray-500 mt-2">Map integration would display here with markers for nearby services</p>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {nearbyServices.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-card rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h2 className="text-2xl text-foreground">{category.category}</h2>
                  <Badge className="ml-auto">{category.services.length} nearby</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      className="border border-border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-foreground">{service.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {service.distance}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-start gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
                        {service.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Contact */}
        <div className="mt-8 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl mb-2">Emergency Services</h3>
          <p className="text-white/90 mb-4">In case of emergency, dial these numbers:</p>
          <div className="flex justify-center gap-8 flex-wrap">
            <div>
              <p className="text-sm opacity-90">Police</p>
              <p className="text-2xl">119</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Ambulance</p>
              <p className="text-2xl">110</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Fire Service</p>
              <p className="text-2xl">111</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Tourist Police</p>
              <p className="text-2xl">1912</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



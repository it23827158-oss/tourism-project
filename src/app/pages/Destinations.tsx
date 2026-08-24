import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useTranslation } from '../context/TranslationContext';

const allDestinations = [
  {
    id: 'sigiriya',
    title: 'Sigiriya Rock Fortress',
    description: 'Ancient rock fortress and UNESCO World Heritage site with stunning frescoes and panoramic views.',
    image: 'https://images.unsplash.com/photo-1663784025074-49e9e7f11f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'Central Province',
    rating: 4.8,
    reviews: 2341,
    bestSeason: 'Dec - Apr',
    tags: ['Historical', 'UNESCO'],
    category: 'Historical',
    region: 'Central',
    budget: 'Budget',
  },
  {
    id: 'ella',
    title: 'Ella Hill Country',
    description: 'Picturesque hill country town famous for tea plantations, waterfalls, and the iconic Nine Arch Bridge.',
    image: 'https://images.unsplash.com/photo-1759213111668-880a071ecf0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'Uva Province',
    rating: 4.9,
    reviews: 1876,
    bestSeason: 'Jan - Mar',
    tags: ['Nature', 'Adventure'],
    category: 'Nature',
    region: 'Hill Country',
    budget: 'Mid-range',
  },
  {
    id: 'galle',
    title: 'Galle Fort',
    description: 'Colonial-era fort blending European architecture with South Asian traditions, overlooking the Indian Ocean.',
    image: 'https://images.unsplash.com/photo-1709926304766-ad3306a32fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'Southern Province',
    rating: 4.7,
    reviews: 1543,
    bestSeason: 'Nov - Apr',
    tags: ['Historical', 'Beach'],
    category: 'Beach',
    region: 'Southern',
    budget: 'Mid-range',
  },
  {
    id: 'yala',
    title: 'Yala National Park',
    description: 'Best national park for leopard sightings, home to diverse wildlife including elephants and sloth bears.',
    image: 'https://images.unsplash.com/photo-1705936981588-a4192f66fcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'Southern Province',
    rating: 4.6,
    reviews: 987,
    bestSeason: 'Feb - Jul',
    tags: ['Wildlife', 'Safari'],
    category: 'Wildlife',
    region: 'Southern',
    budget: 'Premium',
  },
  {
    id: 'kandy',
    title: 'Kandy Cultural Capital',
    description: 'Sacred city home to the Temple of the Tooth, vibrant cultural performances, and botanical gardens.',
    image: 'https://images.unsplash.com/photo-1694962951262-a5f84ad0da68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'Central Province',
    rating: 4.7,
    reviews: 1654,
    bestSeason: 'Year-round',
    tags: ['Cultural', 'Religious'],
    category: 'Cultural',
    region: 'Central',
    budget: 'Budget',
  },
  {
    id: 'nuwara-eliya',
    title: 'Nuwara Eliya',
    description: 'Misty hill station known as "Little England" with colonial architecture and sprawling tea estates.',
    image: 'https://images.unsplash.com/photo-1559038300-07cb5d6c3d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'Central Province',
    rating: 4.8,
    reviews: 1432,
    bestSeason: 'Apr - Sep',
    tags: ['Nature', 'Tea'],
    category: 'Nature',
    region: 'Hill Country',
    budget: 'Mid-range',
  },
  {
    id: 'mirissa',
    title: 'Mirissa Beach',
    description: 'Pristine beach perfect for whale watching, surfing, and enjoying stunning sunsets.',
    image: 'https://images.unsplash.com/photo-1589534345827-e619f9b2dd2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'Southern Province',
    rating: 4.6,
    reviews: 1234,
    bestSeason: 'Nov - Apr',
    tags: ['Beach', 'Water Sports'],
    category: 'Beach',
    region: 'Southern',
    budget: 'Budget',
  },
  {
    id: 'anuradhapura',
    title: 'Anuradhapura',
    description: 'Ancient capital with well-preserved ruins, sacred Bodhi tree, and massive dagobas.',
    image: 'https://images.unsplash.com/photo-1642866575552-9dcade23f139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    location: 'North Central Province',
    rating: 4.7,
    reviews: 987,
    bestSeason: 'Dec - Mar',
    tags: ['Historical', 'UNESCO'],
    category: 'Historical',
    region: 'North Central',
    budget: 'Budget',
  },
];

const categories = ['All', 'Historical', 'Nature', 'Beach', 'Wildlife', 'Cultural'];
const regions = ['All Regions', 'Central', 'Southern', 'Hill Country', 'North Central'];
const budgets = ['All Budgets', 'Budget', 'Mid-range', 'Premium'];
const seasons = ['All Seasons', 'Dec - Apr', 'Jan - Mar', 'Feb - Jul', 'Nov - Apr', 'Year-round'];

export default function Destinations() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedSeason, setSelectedSeason] = useState('All Seasons');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDestinations = allDestinations.filter((dest) => {
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All Regions' || dest.region === selectedRegion;
    const matchesBudget = selectedBudget === 'All Budgets' || dest.budget === selectedBudget;
    const matchesSeason = selectedSeason === 'All Seasons' || dest.bestSeason === selectedSeason;
    const matchesSearch = searchQuery === '' || 
      dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesRegion && matchesBudget && matchesSeason && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedRegion('All Regions');
    setSelectedBudget('All Budgets');
    setSelectedSeason('All Seasons');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedRegion !== 'All Regions' || 
    selectedBudget !== 'All Budgets' || selectedSeason !== 'All Seasons' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            {t.destinations.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t.home.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={t.destinations.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {t.common.filter}
              {hasActiveFilters && (
                <Badge className="ml-1 bg-primary text-white">Active</Badge>
              )}
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm text-foreground mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer ${
                          selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm text-foreground mb-2">Region</label>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <Badge
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`cursor-pointer ${
                          selectedRegion === region
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground hover:bg-gray-200'
                        }`}
                      >
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-foreground mb-2">Budget</label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((budget) => (
                      <Badge
                        key={budget}
                        onClick={() => setSelectedBudget(budget)}
                        className={`cursor-pointer ${
                          selectedBudget === budget
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground hover:bg-gray-200'
                        }`}
                      >
                        {budget}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-sm text-foreground mb-2">Best Season</label>
                  <div className="flex flex-wrap gap-2">
                    {seasons.map((season) => (
                      <Badge
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className={`cursor-pointer ${
                          selectedSeason === season
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground hover:bg-gray-200'
                        }`}
                      >
                        {season}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" onClick={resetFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="text-primary">{filteredDestinations.length}</span> of{' '}
            {allDestinations.length} destinations
          </p>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No destinations found matching your criteria</p>
            <Button onClick={resetFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}



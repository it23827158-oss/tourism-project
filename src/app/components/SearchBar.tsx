import { Search, MapPin, Calendar, DollarSign, Compass } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function SearchBar() {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm text-muted-foreground mb-2 font-medium">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Where to?"
              className="pl-10 bg-input border-border"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="relative">
          <label className="block text-sm text-muted-foreground mb-2 font-medium">Dates</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Select dates"
              className="pl-10 bg-input border-border"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="relative">
          <label className="block text-sm text-muted-foreground mb-2 font-medium">Budget</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Your budget"
              className="pl-10 bg-input border-border"
            />
          </div>
        </div>

        {/* Activities */}
        <div className="relative">
          <label className="block text-sm text-muted-foreground mb-2 font-medium">Activities</label>
          <div className="relative">
            <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="What interests you?"
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button size="lg" className="gap-2 px-12">
          <Search className="w-5 h-5" />
          Search Trips
        </Button>
      </div>
    </div>
  );
}

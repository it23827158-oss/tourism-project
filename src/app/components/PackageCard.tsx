import { Clock, Users, MapPin, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PackageCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  reviews: number;
  locations: string[];
  badge?: string;
}

export default function PackageCard({
  title,
  description,
  image,
  duration,
  groupSize,
  price,
  rating,
  reviews,
  locations,
  badge,
}: PackageCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {badge && (
          <Badge className="absolute top-4 left-4 bg-secondary text-white">
            {badge}
          </Badge>
        )}
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border px-3 py-2 rounded-lg">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-foreground font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl text-foreground font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{groupSize}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{locations.join(', ')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-sm text-muted-foreground">From</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl text-primary font-bold">${price}</span>
              <span className="text-sm text-muted-foreground">/person</span>
            </div>
          </div>
          <Button>View Details</Button>
        </div>
      </div>
    </div>
  );
}

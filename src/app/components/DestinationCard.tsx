import { Link } from 'react-router';
import { MapPin, Star, Calendar, Heart } from 'lucide-react';
import { Badge } from './ui/badge';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

interface DestinationCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  bestSeason?: string;
  tags?: string[];
  featured?: boolean;
}

export default function DestinationCard({
  id,
  title,
  description,
  image,
  location,
  rating,
  reviews,
  bestSeason,
  tags,
  featured,
}: DestinationCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useUser();
  const [isFav, setIsFav] = useState(isFavorite(id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFav) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
    setIsFav(!isFav);
  };

  return (
    <Link to={`/destinations/${id}`}>
      <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2 bg-card/90 backdrop-blur-sm border border-border rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Heart className={`w-5 h-5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'}`} />
          </button>
          {tags && tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground border border-border">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl text-foreground font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-foreground font-medium">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {description}
          </p>

          {bestSeason && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t border-border">
              <Calendar className="w-4 h-4" />
              <span>Best time: {bestSeason}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

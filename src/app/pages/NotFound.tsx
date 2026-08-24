import { Link } from 'react-router';
import { Home, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <MapPin className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
          <h1 className="text-9xl text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! It seems you've wandered off the beaten path. This destination doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/destinations">
            <Button size="lg" variant="outline" className="gap-2">
              <MapPin className="w-5 h-5" />
              Explore Destinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


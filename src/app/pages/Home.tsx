import { Link } from 'react-router';
import { ArrowRight, Shield, Award, Clock, Users, Star, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import { useTranslation } from '../context/TranslationContext';
import { heroService } from '../services/heroService';
import { useState, useEffect } from 'react';

const featuredDestinations = [
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
    featured: true,
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
  },
];

const popularPackages = [
  {
    title: 'Cultural Triangle Explorer',
    description: 'Explore ancient kingdoms, temples, and archaeological wonders of Sri Lanka\'s Cultural Triangle.',
    image: 'https://images.unsplash.com/photo-1642866575552-9dcade23f139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    duration: '7 Days',
    groupSize: 'Up to 12',
    price: 899,
    rating: 4.8,
    reviews: 234,
    locations: ['Sigiriya', 'Anuradhapura', 'Polonnaruwa'],
    badge: 'Best Value',
  },
  {
    title: 'Beach & Wildlife Combo',
    description: 'Perfect blend of pristine beaches and thrilling wildlife safaris in southern Sri Lanka.',
    image: 'https://images.unsplash.com/photo-1589534345827-e619f9b2dd2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    duration: '5 Days',
    groupSize: 'Up to 8',
    price: 749,
    rating: 4.7,
    reviews: 189,
    locations: ['Mirissa', 'Yala', 'Galle'],
    badge: 'Popular',
  },
  {
    title: 'Tea Country & Hill Stations',
    description: 'Journey through lush tea plantations, misty mountains, and charming colonial hill stations.',
    image: 'https://images.unsplash.com/photo-1559038300-07cb5d6c3d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    duration: '4 Days',
    groupSize: 'Up to 10',
    price: 599,
    rating: 4.9,
    reviews: 312,
    locations: ['Nuwara Eliya', 'Ella', 'Kandy'],
    badge: 'New',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Australia',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    text: 'Absolutely incredible experience! The guides were knowledgeable, accommodations were perfect, and we saw everything we wanted. Sri Lanka exceeded all expectations.',
  },
  {
    name: 'Marcus Chen',
    location: 'Singapore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    text: 'SL Traveler made our honeymoon unforgettable. From the tea plantations to the beaches, every moment was perfectly planned. Highly recommend!',
  },
  {
    name: 'Emma Williams',
    location: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 5,
    text: 'The wildlife safari was a dream come true! We saw leopards, elephants, and so much more. The entire team went above and beyond to make it special.',
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Licensed operators with comprehensive insurance coverage for your peace of mind.',
  },
  {
    icon: Award,
    title: 'Expert Guides',
    description: 'Local experts with deep knowledge of Sri Lanka\'s culture, history, and hidden gems.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to assist you throughout your journey.',
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Intimate group sizes for a personalized and authentic travel experience.',
  },
];

export default function Home() {
  const { t } = useTranslation();
  const [heroContent, setHeroContent] = useState(heroService.getHeroContent());

  useEffect(() => {
    // Listen for hero content updates
    const handleStorageChange = () => {
      setHeroContent(heroService.getHeroContent());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-card">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroContent.backgroundImage || "https://lakshmisharath.com/wp-content/uploads/2022/09/Kandy-toothrelictemple-dawn.jpg"}
            alt={heroContent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-semibold">
            {heroContent.subtitle}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl mx-auto leading-tight">
            {heroContent.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            {heroContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={heroContent.primaryButton.link}>
              <Button size="lg" className="gap-2 text-lg px-8">
                {heroContent.primaryButton.text}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to={heroContent.secondaryButton.link}>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-card/20 backdrop-blur-sm text-white border-white hover:bg-card hover:text-foreground">
                {heroContent.secondaryButton.text}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8 mb-20">
        <SearchBar />
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-foreground mb-4 font-bold">
              {t.home.popularDestinations}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.home.hero.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/destinations">
              <Button variant="outline" size="lg" className="gap-2">
                {t.home.viewAll}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tour Packages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-foreground font-bold mb-4">
              {t.home.popularDestinations}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.home.hero.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularPackages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/bookings">
              <Button size="lg" className="gap-2">
                Browse All Packages
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-foreground font-bold mb-4">
              {t.home.whyChooseUs}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.footer.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl text-foreground font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-foreground font-bold mb-4">
              What Travelers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real travelers who experienced Sri Lanka with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all"
              >
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <div>
                    <div className="text-foreground font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Create your perfect Sri Lankan journey with our expert trip planner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trip-planner">
              <Button size="lg" className="gap-2 bg-card text-foreground hover:bg-card/80 border border-border">
                Plan Your Trip
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/guides">
              <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/20">
                Find a Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

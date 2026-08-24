import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Star, MapPin, Users, ShoppingCart, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useUser } from '../context/UserContext';
import { bookingService, CartItem } from '../../services/bookingService';
import { useTranslation } from '../context/TranslationContext';

const hotels = [
  {
    id: 'hotel-1',
    name: 'Cinnamon Grand Colombo',
    location: 'Colombo',
    rating: 4.8,
    reviews: 1234,
    price: 180,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 'hotel-2',
    name: 'Heritance Kandalama',
    location: 'Dambulla',
    rating: 4.9,
    reviews: 856,
    price: 220,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
  },
  {
    id: 'hotel-3',
    name: 'Anantara Peace Haven',
    location: 'Tangalle',
    rating: 4.7,
    reviews: 643,
    price: 350,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500',
    amenities: ['WiFi', 'Beach', 'Spa', 'Restaurant'],
  },
];

const tourPackages = [
  {
    id: 'tour-1',
    name: 'Cultural Triangle Explorer',
    duration: '7 Days',
    price: 899,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1663784025074-49e9e7f11f62?w=500',
    includes: ['Accommodation', 'Transport', 'Guide', 'Breakfast'],
  },
  {
    id: 'tour-2',
    name: 'Beach & Wildlife Combo',
    duration: '5 Days',
    price: 749,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1589534345827-e619f9b2dd2b?w=500',
    includes: ['Accommodation', 'Safari', 'Meals', 'Transport'],
  },
  {
    id: 'tour-3',
    name: 'Tea Country Adventure',
    duration: '4 Days',
    price: 599,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1559038300-07cb5d6c3d27?w=500',
    includes: ['Accommodation', 'Tea Tours', 'Hiking', 'Meals'],
  },
];

const vehicles = [
  {
    id: 'vehicle-1',
    type: 'Luxury SUV',
    capacity: '4-6 passengers',
    price: 80,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500',
    features: ['AC', 'WiFi', 'English Driver'],
  },
  {
    id: 'vehicle-2',
    type: 'Van',
    capacity: '8-12 passengers',
    price: 120,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500',
    features: ['AC', 'WiFi', 'Luggage Space'],
  },
];

export default function Bookings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, addToCart, getCartItems, cartTotal } = useUser();
  const [cart, setCart] = useState<CartItem[]>(bookingService.getCart());
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setCart(bookingService.getCart());
  }, []);

  const handleAddToCart = (item: any, type: 'hotel' | 'tour' | 'vehicle') => {
    if (!isAuthenticated) {
      setMessage({ type: 'error', text: 'Please login to add items to cart' });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const cartItem: CartItem = {
      id: item.id,
      type,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    addToCart(cartItem);
    setCart(bookingService.getCart());
    setMessage({ type: 'success', text: `${item.name} added to cart!` });
    setTimeout(() => setMessage(null), 2000);
  };

  const handleRemoveFromCart = (itemId: string, itemType: string) => {
    bookingService.removeFromCart(itemId, itemType);
    setCart(bookingService.getCart());
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      setMessage({ type: 'error', text: 'Cart is empty' });
      return;
    }

    const result = await bookingService.createBooking(cart);
    if (result.success) {
      setMessage({ type: 'success', text: 'Booking confirmed! Redirecting to dashboard...' });
      bookingService.clearCart();
      setCart([]);
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            {t.bookings.title}
          </h1>
          <p className="text-xl text-white/90">
            {t.home.hero.subtitle}
          </p>
        </div>
      </div>

      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Alert className={message.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
            <CheckCircle className={`h-4 w-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`} />
            <AlertDescription className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
              {message.text}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="hotels" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="packages">Tour Packages</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
              </TabsList>

              {/* Hotels Tab */}
              <TabsContent value="hotels">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hotels.map((hotel) => (
                    <div key={hotel.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{hotel.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{hotel.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{hotel.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">{amenity}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-2xl text-primary">${hotel.price}</span>
                            <span className="text-sm text-muted-foreground">/night</span>
                          </div>
                          <Button size="sm" onClick={() => handleAddToCart(hotel, 'hotel')}>
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Packages Tab */}
              <TabsContent value="packages">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tourPackages.map((pkg) => (
                    <div key={pkg.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{pkg.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{pkg.duration}</p>
                        <div className="space-y-2 mb-4">
                          {pkg.includes.map((item) => (
                            <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-2xl text-primary">${pkg.price}</span>
                            <span className="text-sm text-muted-foreground">/person</span>
                          </div>
                          <Button size="sm" onClick={() => handleAddToCart(pkg, 'tour')}>
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Transport Tab */}
              <TabsContent value="transport">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all">
                      <img src={vehicle.image} alt={vehicle.type} className="w-full h-48 object-cover" />
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{vehicle.type}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                          <Users className="w-4 h-4" />
                          <span>{vehicle.capacity}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          {vehicle.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-2xl text-primary">${vehicle.price}</span>
                            <span className="text-sm text-muted-foreground">/day</span>
                          </div>
                          <Button size="sm" onClick={() => handleAddToCart(vehicle, 'vehicle')}>
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                Cart ({cart.length})
              </h2>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.type}`} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">{item.type}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id, item.type)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">${item.price}</span>
                          <div className="flex items-center gap-2 bg-muted rounded">
                            <button className="p-1 text-muted-foreground hover:text-foreground">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button className="p-1 text-muted-foreground hover:text-foreground">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>{t.bookings.total}:</span>
                      <span className="text-2xl text-primary">${cartTotal}</span>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      {t.bookings.checkout}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

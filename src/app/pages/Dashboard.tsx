import { useNavigate } from 'react-router';
import { Calendar, MapPin, Heart, Clock, User, Settings, LogOut, Edit2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUser } from '../context/UserContext';
import { bookingService } from '../../services/bookingService';
import { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

const savedTrips = [
  { id: 1, name: 'Summer Adventure 2026', destinations: 5, days: 7, status: 'Planning' },
  { id: 2, name: 'Cultural Heritage Tour', destinations: 4, days: 5, status: 'Saved' },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, getFavoriteIds } = useUser();
  const [bookings] = useState(bookingService.getBookings());
  const favoriteCount = getFavoriteIds().length;

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl text-white mb-1">Welcome back, {user.name}!</h1>
              <p className="text-white/90">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-card/10 backdrop-blur-sm border-card text-foreground hover:bg-card hover:text-primary"
                onClick={() => navigate('/dashboard/profile')}
              >
                <Edit2 className="w-5 h-5 mr-2" />
                {t.dashboard.editProfile}
              </Button>
              <Button variant="outline" className="bg-card/10 backdrop-blur-sm border-card text-foreground hover:bg-card hover:text-primary">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-red-500 hover:text-white" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                {t.nav.logout}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-white" />
                <div>
                  <p className="text-2xl text-white">{savedTrips.length}</p>
                  <p className="text-sm text-white/80">{t.dashboard.myTrips}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-white" />
                <div>
                  <p className="text-2xl text-white">{bookings.length}</p>
                  <p className="text-sm text-white/80">{t.dashboard.myBookings}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-white" />
                <div>
                  <p className="text-2xl text-white">{favoriteCount}</p>
                  <p className="text-sm text-white/80">Favorites</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-white" />
                <div>
                  <p className="text-2xl text-white">{savedTrips.reduce((sum, trip) => sum + trip.days, 0)}</p>
                  <p className="text-sm text-white/80">{t.destinations.days}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="bookings">{t.dashboard.myBookings}</TabsTrigger>
            <TabsTrigger value="trips">{t.dashboard.myTrips}</TabsTrigger>
            <TabsTrigger value="profile">{t.dashboard.profile}</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.dashboard.myBookings}</h2>
              {bookings.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">{t.bookings.emptyCart}</p>
                  <Button onClick={() => navigate('/bookings')}>{t.nav.bookings}</Button>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{booking.name}</h3>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Type: <span className="font-medium capitalize">{booking.type}</span>
                        </p>
                        <p className="text-sm text-gray-600">Date: {booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${booking.price}</p>
                        <p className="text-sm text-gray-600">Qty: {booking.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Trips Tab */}
          <TabsContent value="trips">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Trips</h2>
              {savedTrips.map((trip) => (
                <div key={trip.id} className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{trip.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📍 {trip.destinations} Destinations</span>
                        <span>📅 {trip.days} Days</span>
                      </div>
                    </div>
                    <Badge variant={trip.status === 'Planning' ? 'default' : 'secondary'}>{trip.status}</Badge>
                  </div>
                  <Button className="mt-4" variant="outline" onClick={() => navigate('/trip-planner')}>
                    View & Edit
                  </Button>
                </div>
              ))}
              <Button className="w-full" onClick={() => navigate('/trip-planner')}>
                Create New Trip
              </Button>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email Address</label>
                    <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone Number</label>
                    <p className="text-lg font-semibold text-gray-900">{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Country</label>
                    <p className="text-lg font-semibold text-gray-900">{user.country || 'Not provided'}</p>
                  </div>
                </div>
                <Button className="mt-6" onClick={() => navigate('/dashboard/profile')}>
                  <Edit2 className="w-5 h-5 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

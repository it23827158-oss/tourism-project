import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin, 
  TrendingUp, 
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  Star,
  UserCircle,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useUser } from '../context/UserContext';
import { destinationService, Destination } from '../../services/destinationService';
import { guideService, Guide } from '../../services/guideService';
import ImageUpload from '../components/ImageUpload';

interface Booking {
  id: string;
  userName: string;
  email: string;
  item: string;
  type: string;
  amount: number;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface UserData {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  bookings: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Destinations state
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Guides state
  const [guides, setGuides] = useState<Guide[]>([]);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [showDeleteGuideConfirm, setShowDeleteGuideConfirm] = useState<string | null>(null);

  // Load destinations and guides on mount
  useEffect(() => {
    setDestinations(destinationService.getAll());
    setGuides(guideService.getAll());
  }, []);

  // Mock data - in production, this would come from an API
  const [bookings] = useState<Booking[]>([
    {
      id: 'BK001',
      userName: 'John Doe',
      email: 'john@example.com',
      item: 'Cinnamon Grand Colombo',
      type: 'hotel',
      amount: 540,
      date: '2026-02-15',
      status: 'confirmed'
    },
    {
      id: 'BK002',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      item: 'Cultural Triangle Explorer',
      type: 'tour',
      amount: 899,
      date: '2026-02-20',
      status: 'pending'
    },
    {
      id: 'BK003',
      userName: 'Mike Johnson',
      email: 'mike@example.com',
      item: 'Toyota Hiace',
      type: 'transport',
      amount: 450,
      date: '2026-02-18',
      status: 'confirmed'
    },
  ]);

  const [users] = useState<UserData[]>([
    {
      id: 'U001',
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2026-01-15',
      bookings: 3,
      totalSpent: 1250,
      status: 'active'
    },
    {
      id: 'U002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2026-01-20',
      bookings: 2,
      totalSpent: 980,
      status: 'active'
    },
    {
      id: 'U003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      joinDate: '2026-02-01',
      bookings: 1,
      totalSpent: 450,
      status: 'active'
    },
  ]);

  const stats = {
    totalUsers: 156,
    totalBookings: 342,
    totalRevenue: 125480,
    pendingBookings: 23,
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Destination handlers
  const handleDeleteDestination = (id: string) => {
    if (destinationService.delete(id)) {
      setDestinations(destinationService.getAll());
      setShowDeleteConfirm(null);
    }
  };

  const handleEditDestination = (destination: Destination) => {
    setEditingDestination(destination);
    setShowDestinationModal(true);
  };

  const handleAddDestination = () => {
    setEditingDestination(null);
    setShowDestinationModal(true);
  };

  // Guide handlers
  const handleDeleteGuide = (id: string) => {
    if (guideService.delete(id)) {
      setGuides(guideService.getAll());
      setShowDeleteGuideConfirm(null);
    }
  };

  const handleEditGuide = (guide: Guide) => {
    setEditingGuide(guide);
    setShowGuideModal(true);
  };

  const handleAddGuide = () => {
    setEditingGuide(null);
    setShowGuideModal(true);
  };

  // Check if user is admin (in production, this should be checked on backend)
  if (!user || user.email !== 'admin@sltraveler.com') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You don't have permission to access the admin panel.</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="SL Traveler" className="h-8 w-auto" />
                <span className="text-xl font-bold text-primary">Admin Panel</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)] sticky top-16">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Bookings</span>
                {stats.pendingBookings > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {stats.pendingBookings}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Users</span>
              </button>

              <button
                onClick={() => setActiveTab('destinations')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'destinations'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Destinations</span>
              </button>

              <button
                onClick={() => setActiveTab('guides')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'guides'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <UserCircle className="w-5 h-5" />
                <span className="font-medium">Tour Guides</span>
              </button>

              <button
                onClick={() => navigate('/admin/hero-settings')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <Edit className="w-5 h-5" />
                <span className="font-medium">Hero Section</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-6">Dashboard Overview</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-10 h-10 text-blue-500" />
                    <Badge variant="secondary">+12%</Badge>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Users</h3>
                  <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-10 h-10 text-green-500" />
                    <Badge variant="secondary">+8%</Badge>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Bookings</h3>
                  <p className="text-3xl font-bold text-foreground">{stats.totalBookings}</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-10 h-10 text-yellow-500" />
                    <Badge variant="secondary">+15%</Badge>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</h3>
                  <p className="text-3xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <ShoppingBag className="w-10 h-10 text-orange-500" />
                    <Badge variant="destructive">{stats.pendingBookings}</Badge>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Pending Bookings</h3>
                  <p className="text-3xl font-bold text-foreground">{stats.pendingBookings}</p>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Recent Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Item</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-background">
                          <td className="py-3 px-4 text-sm">{booking.id}</td>
                          <td className="py-3 px-4 text-sm">{booking.userName}</td>
                          <td className="py-3 px-4 text-sm">{booking.item}</td>
                          <td className="py-3 px-4 text-sm font-semibold">${booking.amount}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                booking.status === 'confirmed'
                                  ? 'default'
                                  : booking.status === 'pending'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                            >
                              {booking.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Item</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-background">
                          <td className="py-3 px-4 text-sm font-medium">{booking.id}</td>
                          <td className="py-3 px-4 text-sm">{booking.userName}</td>
                          <td className="py-3 px-4 text-sm">{booking.email}</td>
                          <td className="py-3 px-4 text-sm">{booking.item}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{booking.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{booking.date}</td>
                          <td className="py-3 px-4 text-sm font-semibold">${booking.amount}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                booking.status === 'confirmed'
                                  ? 'default'
                                  : booking.status === 'pending'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                            >
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button>Add User</Button>
                </div>
              </div>

              <Card className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Join Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bookings</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-background">
                          <td className="py-3 px-4 text-sm font-medium">{user.id}</td>
                          <td className="py-3 px-4 text-sm">{user.name}</td>
                          <td className="py-3 px-4 text-sm">{user.email}</td>
                          <td className="py-3 px-4 text-sm">{user.joinDate}</td>
                          <td className="py-3 px-4 text-sm">{user.bookings}</td>
                          <td className="py-3 px-4 text-sm font-semibold">${user.totalSpent}</td>
                          <td className="py-3 px-4">
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Destinations Tab */}
          {activeTab === 'destinations' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">Destinations Management</h1>
                <Button onClick={handleAddDestination}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Destination
                </Button>
              </div>

              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destinations.map((destination) => (
                    <div key={destination.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                      <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{destination.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{destination.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{destination.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{destination.description}</p>
                        <div className="mb-3">
                          <Badge variant="outline">{destination.category}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleEditDestination(destination)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-red-600 hover:text-red-700"
                            onClick={() => setShowDeleteConfirm(destination.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {destinations.length === 0 && (
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground">No destinations yet. Add your first destination!</p>
                    <Button className="mt-4" onClick={handleAddDestination}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Destination
                    </Button>
                  </div>
                )}
              </Card>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <Card className="p-6 max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold text-foreground mb-4">Confirm Delete</h3>
                    <p className="text-muted-foreground mb-6">
                      Are you sure you want to delete this destination? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                      <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                        Cancel
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDeleteDestination(showDeleteConfirm)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Add/Edit Destination Modal */}
              {showDestinationModal && (
                <DestinationModal
                  destination={editingDestination}
                  onClose={() => {
                    setShowDestinationModal(false);
                    setEditingDestination(null);
                  }}
                  onSave={() => {
                    setDestinations(destinationService.getAll());
                    setShowDestinationModal(false);
                    setEditingDestination(null);
                  }}
                />
              )}
            </div>
          )}

          {/* Guides Tab */}
          {activeTab === 'guides' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">Tour Guides Management</h1>
                <Button onClick={handleAddGuide}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Guide
                </Button>
              </div>

              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guides.map((guide) => (
                    <div key={guide.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative">
                        <img src={guide.photo} alt={guide.name} className="w-full h-48 object-cover" />
                        <Badge 
                          className="absolute top-3 right-3"
                          variant={
                            guide.availability === 'available' 
                              ? 'default' 
                              : guide.availability === 'busy' 
                              ? 'secondary' 
                              : 'destructive'
                          }
                        >
                          {guide.availability}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{guide.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{guide.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{guide.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Phone className="w-4 h-4" />
                            <span>{guide.phone}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{guide.bio}</p>
                        
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Languages:</p>
                          <div className="flex flex-wrap gap-1">
                            {guide.languages.slice(0, 3).map((lang) => (
                              <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {guide.specialties.slice(0, 2).map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3 pt-3 border-t">
                          <span className="text-sm text-muted-foreground">Experience:</span>
                          <span className="font-semibold">{guide.experience} years</span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <span className="text-lg font-bold text-primary">${guide.pricePerDay}/day</span>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleEditGuide(guide)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-red-600 hover:text-red-700"
                            onClick={() => setShowDeleteGuideConfirm(guide.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {guides.length === 0 && (
                  <div className="text-center py-12">
                    <UserCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground">No guides yet. Add your first guide!</p>
                    <Button className="mt-4" onClick={handleAddGuide}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Guide
                    </Button>
                  </div>
                )}
              </Card>

              {/* Delete Confirmation Modal */}
              {showDeleteGuideConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <Card className="p-6 max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold text-foreground mb-4">Confirm Delete</h3>
                    <p className="text-muted-foreground mb-6">
                      Are you sure you want to delete this guide? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                      <Button variant="outline" onClick={() => setShowDeleteGuideConfirm(null)}>
                        Cancel
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDeleteGuide(showDeleteGuideConfirm)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Add/Edit Guide Modal */}
              {showGuideModal && (
                <GuideModal
                  guide={editingGuide}
                  onClose={() => {
                    setShowGuideModal(false);
                    setEditingGuide(null);
                  }}
                  onSave={() => {
                    setGuides(guideService.getAll());
                    setShowGuideModal(false);
                    setEditingGuide(null);
                  }}
                />
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>
              
              {/* Admin Profile Section */}
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Admin Profile</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="admin@sltraveler.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={user?.phone || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.country || 'Sri Lanka'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Profile Picture URL
                    </label>
                    <input
                      type="url"
                      defaultValue={user?.avatar || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-md font-semibold mb-3">Change Password</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit">Save Profile Changes</Button>
                    <Button type="button" variant="outline">Cancel</Button>
                  </div>
                </form>
              </Card>

              {/* General Settings Section */}
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      defaultValue="SL Traveler"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="info@sltraveler.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+94 11 234 5678"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Address
                    </label>
                    <textarea
                      defaultValue="123 Galle Road, Colombo 03, Sri Lanka"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button>Save General Settings</Button>
                </div>
              </Card>

              {/* System Settings Section */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email for new bookings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">SMS Alerts</p>
                      <p className="text-sm text-muted-foreground">Get SMS for urgent matters</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Auto-approve Bookings</p>
                      <p className="text-sm text-muted-foreground">Automatically approve new bookings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Currency
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="USD">USD - US Dollar</option>
                      <option value="LKR">LKR - Sri Lankan Rupee</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="Asia/Colombo">Asia/Colombo (GMT+5:30)</option>
                      <option value="UTC">UTC (GMT+0:00)</option>
                      <option value="America/New_York">America/New York (GMT-5:00)</option>
                    </select>
                  </div>

                  <Button>Save System Settings</Button>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Destination Modal Component
interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSave: () => void;
}

function DestinationModal({ destination, onClose, onSave }: DestinationModalProps) {
  const [formData, setFormData] = useState<Omit<Destination, 'id'>>({
    name: destination?.name || '',
    location: destination?.location || '',
    description: destination?.description || '',
    image: destination?.image || '',
    rating: destination?.rating || 4.5,
    reviews: destination?.reviews || 0,
    activities: destination?.activities || [],
    bestTime: destination?.bestTime || '',
    highlights: destination?.highlights || [],
    category: destination?.category || 'cultural',
  });
  const [activityInput, setActivityInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (destination) {
      // Update existing
      destinationService.update(destination.id, formData);
    } else {
      // Create new
      destinationService.create(formData);
    }
    
    onSave();
  };

  const addActivity = () => {
    if (activityInput.trim()) {
      setFormData({
        ...formData,
        activities: [...formData.activities, activityInput.trim()],
      });
      setActivityInput('');
    }
  };

  const removeActivity = (index: number) => {
    setFormData({
      ...formData,
      activities: formData.activities.filter((_, i) => i !== index),
    });
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput.trim()],
      });
      setHighlightInput('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="p-6 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-foreground">
            {destination ? 'Edit Destination' : 'Add New Destination'}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Sigiriya Rock Fortress"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Sigiriya, Central Province"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Brief description of the destination"
            />
          </div>

          <ImageUpload
            currentImage={formData.image}
            onImageChange={(url) => setFormData({ ...formData, image: url })}
            label="Destination Image *"
            aspectRatio="16/9"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Destination['category'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="cultural">Cultural</option>
                <option value="beach">Beach</option>
                <option value="wildlife">Wildlife</option>
                <option value="adventure">Adventure</option>
                <option value="mountain">Mountain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Reviews
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Best Time to Visit
            </label>
            <input
              type="text"
              value={formData.bestTime}
              onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., December to March"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Activities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={activityInput}
                onChange={(e) => setActivityInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add activity and press Enter"
              />
              <Button type="button" onClick={addActivity}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.activities.map((activity, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {activity}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeActivity(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Highlights
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add highlight and press Enter"
              />
              <Button type="button" onClick={addHighlight}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {highlight}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeHighlight(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {destination ? 'Update Destination' : 'Create Destination'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Guide Modal Component
interface GuideModalProps {
  guide: Guide | null;
  onClose: () => void;
  onSave: () => void;
}

function GuideModal({ guide, onClose, onSave }: GuideModalProps) {
  const [formData, setFormData] = useState<Omit<Guide, 'id'>>({
    name: guide?.name || '',
    email: guide?.email || '',
    phone: guide?.phone || '',
    photo: guide?.photo || '',
    languages: guide?.languages || [],
    specialties: guide?.specialties || [],
    experience: guide?.experience || 0,
    rating: guide?.rating || 4.5,
    reviews: guide?.reviews || 0,
    bio: guide?.bio || '',
    certifications: guide?.certifications || [],
    availability: guide?.availability || 'available',
    pricePerDay: guide?.pricePerDay || 50,
  });
  const [languageInput, setLanguageInput] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [certificationInput, setCertificationInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guide) {
      guideService.update(guide.id, formData);
    } else {
      guideService.create(formData);
    }
    
    onSave();
  };

  const addLanguage = () => {
    if (languageInput.trim()) {
      setFormData({
        ...formData,
        languages: [...formData.languages, languageInput.trim()],
      });
      setLanguageInput('');
    }
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index),
    });
  };

  const addSpecialty = () => {
    if (specialtyInput.trim()) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyInput.trim()],
      });
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (index: number) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index),
    });
  };

  const addCertification = () => {
    if (certificationInput.trim()) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certificationInput.trim()],
      });
      setCertificationInput('');
    }
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="p-6 max-w-3xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-foreground">
            {guide ? 'Edit Guide' : 'Add New Guide'}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Rohan Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="guide@sltraveler.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+94 77 123 4567"
              />
            </div>
          </div>

          <ImageUpload
            currentImage={formData.photo}
            onImageChange={(url) => setFormData({ ...formData, photo: url })}
            label="Guide Photo *"
            aspectRatio="1/1"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio *
            </label>
            <textarea
              required
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Brief description about the guide..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Experience (years)
              </label>
              <input
                type="number"
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Reviews
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value as Guide['availability'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price per Day ($)
              </label>
              <input
                type="number"
                min="0"
                value={formData.pricePerDay}
                onChange={(e) => setFormData({ ...formData, pricePerDay: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Languages
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add language and press Enter"
              />
              <Button type="button" onClick={addLanguage}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {language}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeLanguage(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Specialties
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add specialty and press Enter"
              />
              <Button type="button" onClick={addSpecialty}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {specialty}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeSpecialty(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Certifications
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add certification and press Enter"
              />
              <Button type="button" onClick={addCertification}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((certification, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {certification}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeCertification(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {guide ? 'Update Guide' : 'Create Guide'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}


import { useNavigate } from 'react-router';
import {
  BarChart3,
  Bell,
  CalendarRange,
  CheckCircle2,
  ChevronRight,
  Compass,
  DollarSign,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Menu,
  MessageSquareText,
  PackageOpen,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Star,
  TrendingUp,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { useUser } from '../context/UserContext';
import { destinationService, type Destination } from '../../services/destinationService';
import { guideService, type Guide } from '../../services/guideService';
import { siteSettingsService, type SiteSettings } from '../services/siteSettingsService';

type Section = 'overview' | 'bookings' | 'destinations' | 'guides' | 'settings';

const stats = [
  { label: 'Total bookings', value: '3,284', change: '+12.4%', icon: CalendarRange, tone: 'bg-sky-100 text-sky-700' },
  { label: 'Revenue', value: '$128.4K', change: '+8.1%', icon: DollarSign, tone: 'bg-emerald-100 text-emerald-700' },
  { label: 'Destinations', value: '46', change: '+5', icon: Compass, tone: 'bg-violet-100 text-violet-700' },
  { label: 'Active guides', value: '18', change: '+2', icon: Users, tone: 'bg-orange-100 text-orange-700' },
];

const bookings = [
  { id: 'BK-2048', customer: 'John Doe', destination: 'Sigiriya', date: '12 Sep 2026', amount: '$540', status: 'Confirmed' },
  { id: 'BK-2051', customer: 'Aisha Rahman', destination: 'Galle', date: '18 Sep 2026', amount: '$780', status: 'Pending' },
  { id: 'BK-2055', customer: 'Daniel Silva', destination: 'Ella', date: '22 Sep 2026', amount: '$920', status: 'Confirmed' },
  { id: 'BK-2062', customer: 'Emma Clark', destination: 'Kandy', date: '27 Sep 2026', amount: '$610', status: 'Review' },
];

const emptyDestinationForm = {
  name: '',
  location: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
  rating: 4.7,
  reviews: 0,
  activities: ['Sightseeing'],
  bestTime: '',
  highlights: ['Popular'],
  category: 'cultural' as const,
};

const emptyGuideForm = {
  name: '',
  email: '',
  phone: '',
  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
  languages: ['English'],
  specialties: ['Travel Guide'],
  experience: 1,
  rating: 4.8,
  reviews: 0,
  bio: '',
  certifications: ['Licensed'],
  availability: 'available' as const,
  pricePerDay: 50,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [showGuideForm, setShowGuideForm] = useState(false);
  const [destinationForm, setDestinationForm] = useState(emptyDestinationForm);
  const [guideForm, setGuideForm] = useState(emptyGuideForm);
  const [settings, setSettings] = useState<SiteSettings>(siteSettingsService.getSettings());

  useEffect(() => {
    setDestinations(destinationService.getAll());
    setGuides(guideService.getAll());
    setSettings(siteSettingsService.getSettings());
  }, []);

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, section: 'overview' as const },
    { label: 'Bookings', icon: CalendarRange, section: 'bookings' as const },
    { label: 'Destinations', icon: MapPinned, section: 'destinations' as const },
    { label: 'Guides', icon: Users, section: 'guides' as const },
    { label: 'Settings', icon: Settings, section: 'settings' as const },
  ];

  const quickActions = [
    { title: 'Add destination', desc: 'Publish a new travel spot', icon: Plus, action: () => { setActiveSection('destinations'); setShowDestinationForm(true); } },
    { title: 'Manage guides', desc: 'Update guide profiles', icon: Users, action: () => setActiveSection('guides') },
    { title: 'Review bookings', desc: 'Confirm pending orders', icon: MessageSquareText, action: () => setActiveSection('bookings') },
    { title: 'Site settings', desc: 'Update global content', icon: Settings, action: () => setActiveSection('settings') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    destinationService.create(destinationForm);
    setDestinations(destinationService.getAll());
    setDestinationForm(emptyDestinationForm);
    setShowDestinationForm(false);
    setActiveSection('destinations');
  };

  const handleSaveGuide = (e: React.FormEvent) => {
    e.preventDefault();
    guideService.create(guideForm);
    setGuides(guideService.getAll());
    setGuideForm(emptyGuideForm);
    setShowGuideForm(false);
    setActiveSection('guides');
  };

  const handleDeleteDestination = (id: string) => {
    destinationService.delete(id);
    setDestinations(destinationService.getAll());
  };

  const handleDeleteGuide = (id: string) => {
    guideService.delete(id);
    setGuides(guideService.getAll());
  };

  const handleSettingsSave = (event: React.FormEvent) => {
    event.preventDefault();
    const updated = siteSettingsService.updateSettings(settings);
    setSettings(updated);
    window.dispatchEvent(new Event('sltraveler-settings-updated'));
    setActiveSection('settings');
  };

  if (!user || user.email !== 'admin@sltraveler.com') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <ShieldCheck className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-foreground">Access denied</h2>
          <p className="mb-6 text-muted-foreground">You do not have permission to access the admin dashboard.</p>
          <Button onClick={() => navigate('/')}>Back to home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <aside className="hidden w-72 border-r border-border bg-card md:flex md:flex-col">
            <div className="flex items-center gap-3 border-b border-border px-6 py-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <PackageOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">SL Traveler</p>
                <h1 className="text-lg font-semibold">Admin Hub</h1>
              </div>
            </div>

            <nav className="flex-1 space-y-2 p-4">
              {navItems.map(({ label, icon: Icon, section }) => (
                <button
                  key={label}
                  onClick={() => setActiveSection(section)}
                  className={[
                    'flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition-colors',
                    activeSection === section ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  ].join(' ')}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {label}
                  </span>
                  {activeSection === section && <ChevronRight className="h-4 w-4" />}
                </button>
              ))}
            </nav>

            <div className="border-t border-border p-4">
              <div className="rounded-2xl bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {user.name?.charAt(0) || 'A'}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1">
          <header className="border-b border-border bg-card/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSidebarOpen((prev) => !prev)}
                >
                  {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Dashboard</p>
                  <h2 className="text-2xl font-bold text-foreground">Content overview</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-2 md:flex">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search content"
                    className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary" />
                </Button>

                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {activeSection === 'overview' && (
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, change, icon: Icon, tone }) => (
                  <Card key={label} className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="mt-3 text-3xl font-bold text-foreground">{value}</p>
                      </div>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-sm">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {change}
                      </span>
                      <span className="text-muted-foreground">vs last month</span>
                    </div>
                  </Card>
                ))}
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                <Card className="overflow-hidden p-0">
                  <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Recent bookings</h3>
                      <p className="text-sm text-muted-foreground">Latest customer reservations</p>
                    </div>
                    <Button variant="outline" size="sm">View all</Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left">
                      <thead className="bg-muted/50 text-sm text-muted-foreground">
                        <tr>
                          <th className="px-6 py-3 font-medium">Booking</th>
                          <th className="px-6 py-3 font-medium">Customer</th>
                          <th className="px-6 py-3 font-medium">Destination</th>
                          <th className="px-6 py-3 font-medium">Date</th>
                          <th className="px-6 py-3 font-medium">Amount</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="bg-card hover:bg-muted/20">
                            <td className="px-6 py-4 text-sm font-medium text-foreground">{booking.id}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{booking.customer}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{booking.destination}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{booking.date}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-foreground">{booking.amount}</td>
                            <td className="px-6 py-4">
                              <Badge
                                variant={
                                  booking.status === 'Confirmed'
                                    ? 'default'
                                    : booking.status === 'Pending'
                                      ? 'secondary'
                                      : 'outline'
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

                <div className="space-y-6">
                  <Card className="p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Quick actions</h3>
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                    <div className="space-y-3">
                      {quickActions.map(({ title, desc, icon: Icon, action }) => (
                        <button
                          key={title}
                          onClick={action}
                          className="flex w-full items-center gap-3 rounded-2xl border border-border p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/40"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{title}</p>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Monthly performance</h3>
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-4">
                      {[72, 88, 64, 95, 82].map((value, idx) => (
                        <div key={idx}>
                          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                            <span>{['Jan', 'Feb', 'Mar', 'Apr', 'May'][idx]}</span>
                            <span>{value}%</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-muted">
                            <div className="h-2.5 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
                <Card className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Top destinations</h3>
                    <Button variant="ghost" size="sm">Edit all</Button>
                  </div>
                  <div className="space-y-4">
                    {destinations.map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-3">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.reviews} reviews</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium text-foreground">{item.rating}</span>
                          </div>
                          <Badge variant="default">Live</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Content health</h3>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-sm text-emerald-700">Published pages</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">92%</p>
                    </div>
                    <div className="rounded-2xl bg-sky-50 p-4">
                      <p className="text-sm text-sky-700">SEO score</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">89/100</p>
                    </div>
                    <div className="rounded-2xl bg-violet-50 p-4">
                      <p className="text-sm text-violet-700">New leads</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">148</p>
                    </div>
                    <div className="rounded-2xl bg-orange-50 p-4">
                      <p className="text-sm text-orange-700">Pending drafts</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">6</p>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">Bookings</h2>
                <Button variant="outline">Export</Button>
              </div>

              <Card className="overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 text-sm text-muted-foreground">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Destination</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((item) => (
                      <tr key={item.id} className="border-t border-border">
                        <td className="px-6 py-4 text-sm font-medium">{item.id}</td>
                        <td className="px-6 py-4 text-sm">{item.customer}</td>
                        <td className="px-6 py-4 text-sm">{item.destination}</td>
                        <td className="px-6 py-4 text-sm">{item.date}</td>
                        <td className="px-6 py-4 text-sm font-semibold">{item.amount}</td>
                        <td className="px-6 py-4"><Badge>{item.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {activeSection === 'destinations' && (
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">Destination management</h2>
                <Button onClick={() => setShowDestinationForm(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add destination
                </Button>
              </div>

              {showDestinationForm && (
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Add new destination</h3>
                  <form onSubmit={handleSaveDestination} className="grid gap-4 md:grid-cols-2">
                    <input
                      value={destinationForm.name}
                      onChange={(e) => setDestinationForm({ ...destinationForm, name: e.target.value })}
                      placeholder="Destination name"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                      required
                    />
                    <input
                      value={destinationForm.location}
                      onChange={(e) => setDestinationForm({ ...destinationForm, location: e.target.value })}
                      placeholder="Location"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                      required
                    />
                    <input
                      value={destinationForm.bestTime}
                      onChange={(e) => setDestinationForm({ ...destinationForm, bestTime: e.target.value })}
                      placeholder="Best time"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 md:col-span-2"
                    />
                    <textarea
                      value={destinationForm.description}
                      onChange={(e) => setDestinationForm({ ...destinationForm, description: e.target.value })}
                      placeholder="Description"
                      className="min-h-[100px] rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 md:col-span-2"
                      required
                    />
                    <input
                      value={destinationForm.image}
                      onChange={(e) => setDestinationForm({ ...destinationForm, image: e.target.value })}
                      placeholder="Image URL"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 md:col-span-2"
                    />
                    <select
                      value={destinationForm.category}
                      onChange={(e) => setDestinationForm({ ...destinationForm, category: e.target.value as typeof destinationForm.category })}
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                    >
                      <option value="cultural">Cultural</option>
                      <option value="beach">Beach</option>
                      <option value="wildlife">Wildlife</option>
                      <option value="adventure">Adventure</option>
                      <option value="mountain">Mountain</option>
                    </select>
                    <input
                      type="number"
                      step="0.1"
                      value={destinationForm.rating}
                      onChange={(e) => setDestinationForm({ ...destinationForm, rating: Number(e.target.value) })}
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                    />

                    <div className="md:col-span-2 flex gap-3">
                      <Button type="submit">Save destination</Button>
                      <Button variant="outline" type="button" onClick={() => setShowDestinationForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </Card>
              )}

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {destinations.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                        <Badge variant="default">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-500">★ {item.rating}</span>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteDestination(item.id)}>
                          <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'guides' && (
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">Guide management</h2>
                <Button onClick={() => setShowGuideForm(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add guide
                </Button>
              </div>

              {showGuideForm && (
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Add new guide</h3>
                  <form onSubmit={handleSaveGuide} className="grid gap-4 md:grid-cols-2">
                    <input
                      value={guideForm.name}
                      onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })}
                      placeholder="Guide name"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                      required
                    />
                    <input
                      value={guideForm.email}
                      onChange={(e) => setGuideForm({ ...guideForm, email: e.target.value })}
                      placeholder="Email"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                      type="email"
                      required
                    />
                    <input
                      value={guideForm.phone}
                      onChange={(e) => setGuideForm({ ...guideForm, phone: e.target.value })}
                      placeholder="Phone"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                      required
                    />
                    <input
                      value={guideForm.pricePerDay}
                      onChange={(e) => setGuideForm({ ...guideForm, pricePerDay: Number(e.target.value) })}
                      placeholder="Price per day"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                      type="number"
                      required
                    />
                    <input
                      value={guideForm.photo}
                      onChange={(e) => setGuideForm({ ...guideForm, photo: e.target.value })}
                      placeholder="Photo URL"
                      className="rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 md:col-span-2"
                    />
                    <textarea
                      value={guideForm.bio}
                      onChange={(e) => setGuideForm({ ...guideForm, bio: e.target.value })}
                      placeholder="Bio"
                      className="min-h-[100px] rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 md:col-span-2"
                      required
                    />
                    <div className="md:col-span-2 flex gap-3">
                      <Button type="submit">Save guide</Button>
                      <Button variant="outline" type="button" onClick={() => setShowGuideForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </Card>
              )}

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {guides.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <img src={item.photo} alt={item.name} className="h-44 w-full object-cover" />
                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                        <Badge variant={item.availability === 'available' ? 'default' : 'secondary'}>{item.availability}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.email}</p>
                      <p className="text-sm text-muted-foreground">{item.specialties.join(', ')}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-500">★ {item.rating}</span>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteGuide(item.id)}>
                          <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
              <h2 className="text-3xl font-bold text-foreground">Site settings</h2>
              <Card className="p-6">
                <form onSubmit={handleSettingsSave} className="space-y-4">
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                  <textarea
                    className="min-h-[120px] w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.facebookUrl}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.twitterUrl}
                    onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none"
                    value={settings.youtubeUrl}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                  />
                  <Button type="submit">Save settings</Button>
                </form>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

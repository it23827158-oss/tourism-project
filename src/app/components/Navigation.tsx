import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, User, ShoppingCart, LogOut, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useUser } from '../context/UserContext';
import { useTranslation } from '../context/TranslationContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, getCartItems } = useUser();
  const { language, setLanguage, t } = useTranslation();
  const cartItems = getCartItems();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'si', name: 'Sinhala', flag: '🇱🇰' },
    { code: 'ta', name: 'Tamil', flag: '🇱🇰' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/destinations', label: t.nav.destinations },
    { path: '/trip-planner', label: t.nav.tripPlanner },
    { path: '/bookings', label: t.nav.bookings },
    { path: '/guides', label: t.nav.guides },
    { path: '/map', label: t.nav.map },
  ];

  const langMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };

    if (showLangMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLangMenu]);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowLangMenu(false);
  }, [location.pathname]);

  const handleLanguageChange = (code: string) => {
    setLanguage(code as any);
    setShowLangMenu(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/75 backdrop-blur-2xl shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <img src="/logo.png" alt="SL Traveler" className="h-14 w-auto drop-shadow-sm" />
            </div>
            <div className="hidden lg:block leading-tight">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Sri Lanka</p>
              <p className="text-sm font-semibold text-foreground">Traveler Collective</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 p-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-2 py-1.5">
            {/* Cart Icon */}
            <Link to="/bookings">
              <Button variant="ghost" size="sm" className="relative gap-2 rounded-full hover:bg-muted">
                <ShoppingCart className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 rounded-full hover:bg-muted"
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage?.flag ?? '🌐'}</span>
              </Button>
              
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-xl backdrop-blur z-50">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2.5 hover:bg-muted/70 flex items-center gap-2 transition-colors ${
                          language === lang.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isAuthenticated && user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full hover:bg-muted">
                    <User className="w-4 h-4" />
                    User
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 rounded-full border-border/70">
                  <LogOut className="w-4 h-4" />
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-full border-border/70">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="rounded-full">
                    {t.nav.signup}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-xl border border-border/70 p-2.5 bg-card/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/70">
            <div className="rounded-2xl border border-border/70 bg-card/90 p-3 shadow-lg backdrop-blur">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <Link to="/bookings" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full gap-2 rounded-xl">
                    <ShoppingCart className="w-4 h-4" />
                    {cartItems.length > 0 ? `${t.nav.bookings} (${cartItems.length})` : t.nav.bookings}
                  </Button>
                </Link>
                {isAuthenticated && user ? (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 rounded-xl">
                      <User className="w-4 h-4" />
                      User
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl">
                      {t.nav.login}
                    </Button>
                  </Link>
                )}
              </div>

              <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl transition-colors ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-border/70 space-y-3">
                {/* Mobile Language Selector */}
                <div className="px-1">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-3 py-2.5 rounded-xl border text-sm flex items-center gap-2 transition-colors ${
                          language === lang.code 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-card text-foreground border-border hover:border-primary/60'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {isAuthenticated && user ? (
                  <div className="px-1">
                    <Button variant="outline" className="w-full gap-2 rounded-xl" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                      {t.nav.logout}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 px-1">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full rounded-xl">
                        {t.nav.signup}
                      </Button>
                    </Link>
                    <Link to="/bookings" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl">
                        {t.nav.bookings}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

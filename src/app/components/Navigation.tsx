import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, User, ShoppingCart, LogOut, Palmtree, Globe } from 'lucide-react';
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

  const handleLanguageChange = (code: string) => {
    setLanguage(code as any);
    setShowLangMenu(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="SL Traveler" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/bookings">
              <Button variant="ghost" size="sm" className="relative gap-2">
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
                className="gap-2"
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage.flag}</span>
              </Button>
              
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 ${
                          language === lang.code ? 'bg-primary/5 text-primary' : 'text-gray-700'
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
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    User
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    {t.nav.signup}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/5 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-gray-200 space-y-2">
                {/* Mobile Language Selector */}
                <div className="px-4 pb-2">
                  <p className="text-xs text-gray-500 mb-2">Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-3 py-2 rounded-lg border text-sm flex items-center gap-2 ${
                          language === lang.code 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {isAuthenticated && user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full gap-2">
                        <User className="w-4 h-4" />
                        User
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                      {t.nav.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        {t.nav.login}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">
                        {t.nav.signup}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';
import { siteSettingsService, type SiteSettings } from '../services/siteSettingsService';

export default function Footer() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings>(siteSettingsService.getSettings());

  useEffect(() => {
    const updateSettings = () => setSettings(siteSettingsService.getSettings());

    window.addEventListener('sltraveler-settings-updated', updateSettings);
    window.addEventListener('storage', updateSettings);

    return () => {
      window.removeEventListener('sltraveler-settings-updated', updateSettings);
      window.removeEventListener('storage', updateSettings);
    };
  }, []);

  const socialLinks = [
    { href: settings.facebookUrl, label: 'Facebook', Icon: Facebook },
    { href: settings.instagramUrl, label: 'Instagram', Icon: Instagram },
    { href: settings.twitterUrl, label: 'X / Twitter', Icon: Twitter },
    { href: settings.youtubeUrl, label: 'YouTube', Icon: Youtube },
  ];

  return (
    <footer className="bg-card border-t border-border text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt={settings.companyName} className="h-16 w-auto mb-4" />
            <p className="text-sm text-gray-400">
              {t.footer.description}
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li><Link to="/destinations" className="text-sm hover:text-primary transition-colors">{t.nav.destinations}</Link></li>
              <li><Link to="/trip-planner" className="text-sm hover:text-primary transition-colors">{t.nav.tripPlanner}</Link></li>
              <li><Link to="/bookings" className="text-sm hover:text-primary transition-colors">{t.nav.bookings}</Link></li>
              <li><Link to="/guides" className="text-sm hover:text-primary transition-colors">{t.nav.guides}</Link></li>
              <li><Link to="/map" className="text-sm hover:text-primary transition-colors">{t.nav.map}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t.footer.support}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t.footer.support}</a></li>
              <li><Link to="/faq" className="text-sm hover:text-primary transition-colors">{t.footer.faq}</Link></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t.footer.terms}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 {settings.companyName}. {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}

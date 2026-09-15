export interface SiteSettings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
}

const STORAGE_KEY = 'sltraveler_site_settings';

const defaultSettings: SiteSettings = {
  companyName: 'SL Traveler',
  email: 'hello@sltraveler.lk',
  phone: '+94 11 234 5678',
  address: '123 Beach Road, Colombo 03, Sri Lanka',
  facebookUrl: 'https://facebook.com/your-page',
  instagramUrl: 'https://instagram.com/your-page',
  twitterUrl: 'https://x.com/your-page',
  youtubeUrl: 'https://youtube.com/@your-channel',
};

class SiteSettingsService {
  getSettings(): SiteSettings {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch (error) {
        console.error('Failed to parse site settings:', error);
      }
    }
    return defaultSettings;
  }

  updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  resetToDefault(): SiteSettings {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
}

export const siteSettingsService = new SiteSettingsService();

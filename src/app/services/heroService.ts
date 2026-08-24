export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
  updatedAt: string;
}

const STORAGE_KEY = 'hero_content';

const defaultHeroContent: HeroContent = {
  id: '1',
  title: 'Discover the Pearl of the Indian Ocean',
  subtitle: 'Welcome to Sri Lanka',
  description: 'Experience pristine beaches, ancient temples, lush tea plantations, and wildlife adventures. Your perfect Sri Lankan journey starts here.',
  primaryButton: {
    text: 'Explore Destinations',
    link: '/destinations'
  },
  secondaryButton: {
    text: 'Plan Your Trip',
    link: '/trip-planner'
  },
  backgroundImage: 'https://lakshmisharath.com/wp-content/uploads/2022/09/Kandy-toothrelictemple-dawn.jpg',
  updatedAt: new Date().toISOString()
};

class HeroService {
  getHeroContent(): HeroContent {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse hero content:', e);
      }
    }
    return defaultHeroContent;
  }

  updateHeroContent(content: Partial<HeroContent>): HeroContent {
    const current = this.getHeroContent();
    const updated: HeroContent = {
      ...current,
      ...content,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  resetToDefault(): HeroContent {
    const reset = {
      ...defaultHeroContent,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
    return reset;
  }
}

export const heroService = new HeroService();

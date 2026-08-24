# Translation System Guide

## Overview
The translation system is now fully set up with 8 languages:
- 🇬🇧 English (en)
- 🇱🇰 Sinhala (si)
- 🇱🇰 Tamil (ta)
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇨🇳 Chinese (zh)
- 🇯🇵 Japanese (ja)

## How to Use Translations in Components

### 1. Import the useTranslation hook
```tsx
import { useTranslation } from '../context/TranslationContext';
```

### 2. Use the hook in your component
```tsx
export default function MyComponent() {
  const { t, language, setLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t.home.hero.title}</h1>
      <p>{t.home.hero.subtitle}</p>
      <button>{t.common.save}</button>
    </div>
  );
}
```

## Translation Structure

All translations are organized by section:

### Navigation
```tsx
t.nav.home
t.nav.destinations
t.nav.tripPlanner
t.nav.bookings
t.nav.guides
t.nav.map
t.nav.login
t.nav.signup
t.nav.logout
t.nav.dashboard
```

### Home Page
```tsx
t.home.hero.title
t.home.hero.subtitle
t.home.hero.searchPlaceholder
t.home.hero.searchButton
t.home.popularDestinations
t.home.whyChooseUs
t.home.viewAll
```

### Destinations
```tsx
t.destinations.title
t.destinations.allDestinations
t.destinations.search
t.destinations.bookNow
t.destinations.learnMore
t.destinations.from
t.destinations.perPerson
t.destinations.duration
t.destinations.days
t.destinations.rating
```

### Bookings
```tsx
t.bookings.title
t.bookings.yourCart
t.bookings.totalItems
t.bookings.subtotal
t.bookings.tax
t.bookings.total
t.bookings.checkout
t.bookings.emptyCart
t.bookings.startExploring
t.bookings.removeFromCart
t.bookings.bookingConfirmed
t.bookings.bookingPending
t.bookings.bookingCancelled
```

### Trip Planner
```tsx
t.tripPlanner.title
t.tripPlanner.step1
t.tripPlanner.step2
t.tripPlanner.step3
t.tripPlanner.selectDestination
t.tripPlanner.startDate
t.tripPlanner.endDate
t.tripPlanner.numberOfTravelers
t.tripPlanner.adults
t.tripPlanner.children
t.tripPlanner.next
t.tripPlanner.previous
t.tripPlanner.createTrip
t.tripPlanner.activities
t.tripPlanner.accommodation
t.tripPlanner.budget
t.tripPlanner.specialRequests
```

### Dashboard
```tsx
t.dashboard.title
t.dashboard.profile
t.dashboard.myBookings
t.dashboard.myTrips
t.dashboard.editProfile
t.dashboard.updateProfile
t.dashboard.name
t.dashboard.email
t.dashboard.phone
t.dashboard.country
```

### Auth
```tsx
t.auth.loginTitle
t.auth.loginSubtitle
t.auth.registerTitle
t.auth.registerSubtitle
t.auth.emailPlaceholder
t.auth.passwordPlaceholder
t.auth.namePlaceholder
t.auth.rememberMe
t.auth.forgotPassword
t.auth.noAccount
t.auth.haveAccount
t.auth.signIn
t.auth.signUp
```

### Footer
```tsx
t.footer.about
t.footer.description
t.footer.quickLinks
t.footer.support
t.footer.contact
t.footer.faq
t.footer.terms
t.footer.privacy
t.footer.allRightsReserved
```

### Common
```tsx
t.common.loading
t.common.error
t.common.success
t.common.cancel
t.common.save
t.common.delete
t.common.edit
t.common.add
t.common.remove
t.common.close
t.common.confirm
t.common.search
t.common.filter
t.common.sortBy
t.common.showMore
t.common.showLess
```

## Examples

### Example 1: Home Page Hero Section
```tsx
import { useTranslation } from '../context/TranslationContext';

export default function Hero() {
  const { t } = useTranslation();
  
  return (
    <section className="hero">
      <h1>{t.home.hero.title}</h1>
      <p>{t.home.hero.subtitle}</p>
      <input 
        type="text" 
        placeholder={t.home.hero.searchPlaceholder}
      />
      <button>{t.home.hero.searchButton}</button>
    </section>
  );
}
```

### Example 2: Destination Card
```tsx
import { useTranslation } from '../context/TranslationContext';

export default function DestinationCard({ destination }) {
  const { t } = useTranslation();
  
  return (
    <div className="card">
      <h3>{destination.name}</h3>
      <p>{t.destinations.from} ${destination.price} {t.destinations.perPerson}</p>
      <p>{t.destinations.duration}: {destination.duration} {t.destinations.days}</p>
      <button>{t.destinations.bookNow}</button>
    </div>
  );
}
```

### Example 3: Form Buttons
```tsx
import { useTranslation } from '../context/TranslationContext';

export default function BookingForm() {
  const { t } = useTranslation();
  
  return (
    <form>
      {/* Form fields */}
      <button type="button">{t.common.cancel}</button>
      <button type="submit">{t.common.save}</button>
    </form>
  );
}
```

## Adding New Translations

1. Add the new key to `/src/translations/en.ts`:
```tsx
export const en = {
  // ... existing translations
  myNewSection: {
    title: 'My Title',
    description: 'My Description',
  },
};
```

2. Add the same structure to all other language files (si.ts, ta.ts, es.ts, fr.ts, de.ts, zh.ts, ja.ts)

3. Use in your component:
```tsx
const { t } = useTranslation();
return <h1>{t.myNewSection.title}</h1>;
```

## Language Selection

Users can change language via:
- Desktop: Globe icon dropdown in navigation bar
- Mobile: Language grid in mobile menu
- Programmatically: `setLanguage('es')` to switch to Spanish

The selected language is saved to localStorage and persists across sessions.

## Current Status
✅ Translation context created and integrated
✅ 8 language dictionaries with full translations
✅ Navigation component fully translated
✅ Language selector in navbar (desktop & mobile)
✅ Language preference persists in localStorage

## Next Steps
To translate other components:
1. Import `useTranslation` hook
2. Replace hardcoded strings with `t.section.key`
3. Test with different languages using the language selector

Example components to translate:
- Home.tsx
- Destinations.tsx
- Bookings.tsx
- TripPlanner.tsx
- Dashboard.tsx
- Login.tsx
- Register.tsx
- Footer.tsx

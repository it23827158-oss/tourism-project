// Booking and Cart Management Service

export interface Booking {
  id: string;
  type: 'hotel' | 'tour' | 'vehicle' | 'guide';
  name: string;
  date: string;
  price: number;
  quantity: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  details?: Record<string, any>;
}

export interface CartItem {
  id: string;
  type: 'hotel' | 'tour' | 'vehicle' | 'guide';
  name: string;
  price: number;
  quantity: number;
  startDate?: string;
  endDate?: string;
  details?: Record<string, any>;
}

// In-memory storage
let bookings: Booking[] = [];
let cart: CartItem[] = [];
let favorites: Record<string, boolean> = {};

export const bookingService = {
  // Add item to cart
  addToCart: (item: CartItem): void => {
    const existingItem = cart.find((c) => c.id === item.id && c.type === item.type);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  // Remove from cart
  removeFromCart: (itemId: string, itemType: string): void => {
    cart = cart.filter((c) => !(c.id === itemId && c.type === itemType));
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  // Get cart items
  getCart: (): CartItem[] => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
    return cart;
  },

  // Clear cart
  clearCart: (): void => {
    cart = [];
    localStorage.removeItem('cart');
  },

  // Get cart total
  getCartTotal: (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // Create booking from cart
  createBooking: async (items: CartItem[]): Promise<{ success: boolean; bookingIds: string[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookingIds: string[] = [];

        items.forEach((item) => {
          const booking: Booking = {
            id: `BOOKING-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: item.type,
            name: item.name,
            date: item.startDate || new Date().toISOString().split('T')[0],
            price: item.price,
            quantity: item.quantity,
            status: 'confirmed',
            details: item.details,
          };
          bookings.push(booking);
          bookingIds.push(booking.id);
        });

        localStorage.setItem('bookings', JSON.stringify(bookings));
        resolve({ success: true, bookingIds });
      }, 1000);
    });
  },

  // Get all bookings for current user
  getBookings: (): Booking[] => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      bookings = JSON.parse(savedBookings);
    }
    return bookings;
  },

  // Get single booking
  getBooking: (bookingId: string): Booking | undefined => {
    return bookings.find((b) => b.id === bookingId);
  },

  // Cancel booking
  cancelBooking: (bookingId: string): boolean => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking && booking.status === 'confirmed') {
      booking.status = 'cancelled';
      localStorage.setItem('bookings', JSON.stringify(bookings));
      return true;
    }
    return false;
  },

  // Add to favorites
  addToFavorites: (id: string): void => {
    favorites[id] = true;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },

  // Remove from favorites
  removeFromFavorites: (id: string): void => {
    delete favorites[id];
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },

  // Check if item is in favorites
  isFavorite: (id: string): boolean => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      favorites = JSON.parse(savedFavorites);
    }
    return !!favorites[id];
  },

  // Get all favorites
  getFavorites: (): string[] => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      favorites = JSON.parse(savedFavorites);
    }
    return Object.keys(favorites).filter((key) => favorites[key]);
  },
};

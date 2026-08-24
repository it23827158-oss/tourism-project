// User Context for global state management

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authService } from '../../services/authService';
import { bookingService } from '../../services/bookingService';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  country?: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (user: User) => Promise<boolean>;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getFavoriteIds: () => string[];
  addToCart: (item: any) => void;
  getCartItems: () => any[];
  cartTotal: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(bookingService.getCart());

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.register(email, password, name);
      if (result.success && result.user) {
        setUser(result.user);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    bookingService.clearCart();
    setCartItems([]);
  };

  const updateProfile = async (updatedUser: User): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.updateProfile(updatedUser);
      if (result.success && result.user) {
        setUser(result.user);
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (id: string) => {
    bookingService.addToFavorites(id);
  };

  const removeFromFavorites = (id: string) => {
    bookingService.removeFromFavorites(id);
  };

  const isFavorite = (id: string): boolean => {
    return bookingService.isFavorite(id);
  };

  const getFavoriteIds = (): string[] => {
    return bookingService.getFavorites();
  };

  const addToCart = (item: any) => {
    bookingService.addToCart(item);
    setCartItems(bookingService.getCart());
  };

  const getCartItems = (): any[] => {
    return bookingService.getCart();
  };

  const cartTotal = bookingService.getCartTotal();

  const value: UserContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteIds,
    addToCart,
    getCartItems,
    cartTotal,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

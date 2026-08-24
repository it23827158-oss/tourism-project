// Simple in-memory auth service (Replace with actual backend API calls)

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  country?: string;
  avatar?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Simulated users database
const usersDatabase: Record<string, { password: string; user: User }> = {
  'test@example.com': {
    password: 'password123',
    user: {
      id: '1',
      email: 'test@example.com',
      name: 'John Traveler',
      phone: '+94701234567',
      country: 'United States',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
  },
  'admin@sltraveler.com': {
    password: 'admin123',
    user: {
      id: 'admin',
      email: 'admin@sltraveler.com',
      name: 'Admin User',
      phone: '+94701234567',
      country: 'Sri Lanka',
    },
  },
};

export const authService = {
  // Register new user
  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (usersDatabase[email]) {
          resolve({
            success: false,
            message: 'Email already registered. Please login instead.',
          });
        } else {
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
          };

          usersDatabase[email] = {
            password,
            user: newUser,
          };

          const token = btoa(JSON.stringify({ id: newUser.id, email }));
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(newUser));

          resolve({
            success: true,
            message: 'Registration successful!',
            user: newUser,
            token,
          });
        }
      }, 800);
    });
  },

  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = usersDatabase[email];

        if (!userData) {
          resolve({
            success: false,
            message: 'Email not found. Please register first.',
          });
          return;
        }

        if (userData.password !== password) {
          resolve({
            success: false,
            message: 'Invalid password. Please try again.',
          });
          return;
        }

        const token = btoa(JSON.stringify({ id: userData.user.id, email }));
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData.user));

        resolve({
          success: true,
          message: 'Login successful!',
          user: userData.user,
          token,
        });
      }, 800);
    });
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Update user profile
  updateProfile: async (user: User): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = usersDatabase[user.email];
        if (userData) {
          userData.user = { ...userData.user, ...user };
          localStorage.setItem('user', JSON.stringify(userData.user));

          resolve({
            success: true,
            message: 'Profile updated successfully!',
            user: userData.user,
          });
        }
      }, 500);
    });
  },
};

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegistrationResponse {
  message: string;
  userId: string;
}

// Redux store types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  registrationData: RegistrationResponse | null;
}

export interface RootState {
  auth: AuthState;
  cart: any;
  wishlist: any;
  products: any;
}

export interface AppDispatch {
  (action: any): any;
}

// Component props
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

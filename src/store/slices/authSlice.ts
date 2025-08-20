import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { 
  AuthState, 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse, 
  User 
} from '../../types';

// Define a new interface for the successful OTP request payload
interface RequestOTPPayload {
  message: string;
  email: string;
  tempUser: RegisterCredentials;
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const requestRegisterOTP = createAsyncThunk(
  'auth/requestRegisterOTP',
  async (userData: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; email: string }>('/auth/request-register-otp', userData);
      // Store the email and the full user data in local storage
      localStorage.setItem('tempEmail', userData.email);
      // We will now return the full user data along with the response
      return { message: response.data.message, email: userData.email, tempUser: userData };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'OTP request failed');
    }
  }
);

export const verifyRegisterOTP = createAsyncThunk(
  'auth/verifyRegisterOTP',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/verify-register-otp', { email, otp });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user');
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; email: string }>('/auth/request-password-reset', { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Password reset request failed');
    }
  }
);

export const verifyPasswordResetOTP = createAsyncThunk(
  'auth/verifyPasswordResetOTP',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string }>('/auth/verify-reset-otp', { email, otp });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string }>('/auth/reset-password', { email, newPassword });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Password reset failed');
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
  registrationData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Request Register OTP
      .addCase(requestRegisterOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRegisterOTP.fulfilled, (state, action: PayloadAction<RequestOTPPayload>) => {
        state.isLoading = false;
        // Store the full temporary user data for resend functionality
        state.registrationData = action.payload;
      })
      .addCase(requestRegisterOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Verify Register OTP
      .addCase(verifyRegisterOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyRegisterOTP.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // Clear the temporary registration data after successful verification
        state.registrationData = null;
      })
      .addCase(verifyRegisterOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get current user
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      // Request Password Reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Verify Password Reset OTP
      .addCase(verifyPasswordResetOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyPasswordResetOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyPasswordResetOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

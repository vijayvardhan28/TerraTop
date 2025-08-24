// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';
// import { RootState } from '../../types';
// import toast from 'react-hot-toast';

// export interface WishlistItem {
//   _id: string;
//   product: any;
// }

// export interface WishlistState {
//   items: WishlistItem[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: WishlistState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };

// export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { rejectWithValue }) => {
//   try {
//     const response = await api.get('/wishlist');
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
//   }
// });

// export const addToWishlist = createAsyncThunk(
//   'wishlist/addToWishlist',
//   async (productId: string, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/wishlist/add', { productId });
//       toast.success('Added to wishlist!');
//       return response.data;
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to add to wishlist');
//       return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
//     }
//   }
// );

// export const removeFromWishlist = createAsyncThunk(
//   'wishlist/removeFromWishlist',
//   async (productId: string, { rejectWithValue }) => {
//     try {
//       await api.delete(`/wishlist/remove/${productId}`);
//       toast.success('Removed from wishlist!');
//       return productId;
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
//       return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch wishlist
//       .addCase(fetchWishlist.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
      
//       // Add to wishlist
//       .addCase(addToWishlist.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<WishlistItem>) => {
//         state.isLoading = false;
//         state.items.push(action.payload);
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
      
//       // Remove from wishlist
//       .addCase(removeFromWishlist.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<string>) => {
//         state.isLoading = false;
//         state.items = state.items.filter(item => item.product._id !== action.payload);
//       })
//       .addCase(removeFromWishlist.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const selectWishlistItems = (state: RootState) => state.wishlist.items;
// export const selectWishlistItemCount = (state: RootState) => state.wishlist.items.length;
// export const selectIsProductInWishlist = (state: RootState, productId: string) => 
//   state.wishlist.items.some(item => item.product._id === productId);

// export default wishlistSlice.reducer;
// (Kept as you provided; works with ProductCard & ProductDetail updates)
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';
// import { RootState } from '../../types';
// import toast from 'react-hot-toast';

// export interface WishlistItem {
//   _id: string;
//   product: any;
// }

// export interface WishlistState {
//   items: WishlistItem[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: WishlistState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };

// export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { rejectWithValue }) => {
//   try {
//     const response = await api.get('/wishlist');
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
//   }
// });

// export const addToWishlist = createAsyncThunk(
//   'wishlist/addToWishlist',
//   async (productId: string, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/wishlist/add', { productId });
//       toast.success('Added to wishlist!');
//       return response.data;
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to add to wishlist');
//       return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
//     }
//   }
// );

// export const removeFromWishlist = createAsyncThunk(
//   'wishlist/removeFromWishlist',
//   async (productId: string, { rejectWithValue }) => {
//     try {
//       await api.delete(`/wishlist/remove/${productId}`);
//       toast.success('Removed from wishlist!');
//       return productId;
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
//       return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
//     }
//   }
// );

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch wishlist
//       .addCase(fetchWishlist.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchWishlist.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
      
//       // Add to wishlist
//       .addCase(addToWishlist.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<WishlistItem>) => {
//         state.isLoading = false;
//         state.items.push(action.payload);
//       })
//       .addCase(addToWishlist.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
      
//       // Remove from wishlist
//       .addCase(removeFromWishlist.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<string>) => {
//         state.isLoading = false;
//         state.items = state.items.filter(item => (item.product?._id || item._id) !== action.payload);
//       })
//       .addCase(removeFromWishlist.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const selectWishlistItems = (state: RootState) => state.wishlist.items;
// export const selectWishlistItemCount = (state: RootState) => state.wishlist.items.length;
// export const selectIsProductInWishlist = (state: RootState, productId: string) => 
//   state.wishlist.items.some(item => (item.product?._id || item._id) === productId);

// export default wishlistSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { RootState } from '../../types';
import toast from 'react-hot-toast';

export interface WishlistItem {
  _id: string;
  product: any;
}

export interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/wishlist');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
  }
});

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      // The backend now returns the full updated wishlist
      const response = await api.post('/wishlist/add', { productId });
      toast.success('Added to wishlist!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
      return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      // The backend now returns the full updated wishlist
      const response = await api.delete(`/wishlist/remove/${productId}`);
      toast.success('Removed from wishlist!');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        // You could optionally add a placeholder here for faster UI feedback
      })
      // UPDATED: Now expects the full list and replaces the state
      .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        // You could optionally filter the item here for faster UI feedback
      })
      // UPDATED: Now expects the full list and replaces the state
      .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<WishlistItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistItemCount = (state: RootState) => state.wishlist.items.length;
export const selectIsProductInWishlist = (state: RootState, productId: string) => 
  state.wishlist.items.some(item => (item.product?._id || item._id) === productId);

export default wishlistSlice.reducer;
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';
// import { RootState } from '../../types';

// export interface CartItem {
//   _id: string;
//   product?: any;
//   terrakit?: any;
//   quantity: number;
// }

// export interface CartState {
//   items: CartItem[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };

// export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
//   try {
//     const response = await api.get('/cart');
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
//   }
// });

// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async (payload: { productId?: string; terrakitId?: string; quantity?: number }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/cart/add', payload);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
//     }
//   }
// );

// export const removeFromCart = createAsyncThunk(
//   'cart/removeFromCart',
//   async (itemId: string, { rejectWithValue }) => {
//     try {
//       await api.delete(`/cart/remove/${itemId}`);
//       return itemId;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
//     }
//   }
// );

// export const updateCartQuantity = createAsyncThunk(
//   'cart/updateCartQuantity',
//   async (payload: { itemId: string; quantity: number }, { rejectWithValue }) => {
//     try {
//       await api.put(`/cart/update/${payload.itemId}`, { quantity: payload.quantity });
//       return payload;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to update cart quantity');
//     }
//   }
// );

// export const clearCart = createAsyncThunk(
//   'cart/clearCart',
//   async (_, { rejectWithValue }) => {
//     try {
//       await api.delete('/cart/clear');
//       return [];
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(addToCart.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
//         state.items = state.items.filter(item => item._id !== action.payload);
//       })
//       .addCase(updateCartQuantity.fulfilled, (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
//         const item = state.items.find(i => i._id === action.payload.itemId);
//         if (item) item.quantity = action.payload.quantity;
//       })
//       .addCase(clearCart.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(clearCart.fulfilled, (state) => {
//         state.isLoading = false;
//         state.items = [];
//       })
//       .addCase(clearCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const selectCartCount = (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// export const selectCartTotal = (state: RootState) => 
//   state.cart.items.reduce((total, item) => {
//     const price = item.product?.price || item.terrakit?.totalPrice || 0;
//     return total + (price * item.quantity);
//   }, 0);

// export default cartSlice.reducer;
// // import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// // import api from '../../services/api';
// // import { RootState } from '../store';

// // // Interface for a single item in the cart
// // interface CartItem {
// //   _id: string;
// //   terrakit: {
// //     _id: string;
// //     name: string; // Assuming a name for the kit
// //     price: number;
// //   };
// //   quantity: number;
// // }

// // // Interface for the cart state
// // interface CartState {
// //   items: CartItem[];
// //   status: 'idle' | 'loading' | 'succeeded' | 'failed';
// //   error: string | null;
// // }

// // // Initial state for the cart
// // const initialState: CartState = {
// //   items: [],
// //   status: 'idle',
// //   error: null,
// // };

// // // Async thunk to fetch the user's cart
// // export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
// //   try {
// //     const response = await api.get('/cart');
// //     return response.data.items;
// //   } catch (error: any) {
// //     return rejectWithValue(error.response.data.message || 'Failed to fetch cart');
// //   }
// // });

// // // Async thunk to add an item to the cart
// // export const addToCart = createAsyncThunk(
// //   'cart/addToCart',
// //   async ({ terrakitId, quantity }: { terrakitId: string; quantity: number }, { rejectWithValue }) => {
// //     try {
// //       const response = await api.post('/cart/add', { terrakitId, quantity });
// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response.data.message || 'Failed to add item to cart');
// //     }
// //   }
// // );

// // // Async thunk to remove an item from the cart
// // export const removeFromCart = createAsyncThunk(
// //   'cart/removeFromCart',
// //   async (terrakitId: string, { rejectWithValue }) => {
// //     try {
// //       await api.delete(`/cart/remove/${terrakitId}`);
// //       return terrakitId;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response.data.message || 'Failed to remove item from cart');
// //     }
// //   }
// // );


// // // The cart slice
// // const cartSlice = createSlice({
// //   name: 'cart',
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       // Reducers for fetchCart
// //       .addCase(fetchCart.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
// //         state.status = 'succeeded';
// //         state.items = action.payload;
// //       })
// //       .addCase(fetchCart.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload as string;
// //       })
// //       // Reducers for addToCart
// //       .addCase(addToCart.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
// //         state.status = 'succeeded';
// //         const existingItemIndex = state.items.findIndex(
// //           (item) => item.terrakit._id === action.payload.terrakit._id
// //         );
// //         if (existingItemIndex !== -1) {
// //           state.items[existingItemIndex].quantity += action.payload.quantity;
// //         } else {
// //           state.items.push(action.payload);
// //         }
// //       })
// //       .addCase(addToCart.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload as string;
// //       })
// //       // Reducers for removeFromCart
// //       .addCase(removeFromCart.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
// //         state.status = 'succeeded';
// //         state.items = state.items.filter((item) => item.terrakit._id !== action.payload);
// //       })
// //       .addCase(removeFromCart.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload as string;
// //       });
// //   },
// // });

// // export const selectCartItems = (state: RootState) => state.cart.items;
// // export const selectCartTotalItems = (state: RootState) => 
// //   state.cart.items.reduce((total, item) => total + item.quantity, 0);

// // export default cartSlice.reducer;


// (No functional changes required for your request; keeping as-is)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { RootState } from '../../types';

export interface CartItem {
  _id: string;
  product?: any;
  terrakit?: any;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload: { productId?: string; terrakitId?: string; quantity?: number }, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart/add', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/remove/${itemId}`);
      return itemId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async (payload: { itemId: string; quantity: number }, { rejectWithValue }) => {
    try {
      await api.put(`/cart/update/${payload.itemId}`, { quantity: payload.quantity });
      return payload;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart quantity');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/cart/clear');
      return [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(updateCartQuantity.fulfilled, (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
        const item = state.items.find(i => i._id === action.payload.itemId);
        if (item) item.quantity = action.payload.quantity;
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCartCount = (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;

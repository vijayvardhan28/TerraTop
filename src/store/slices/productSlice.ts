// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '../../services/api';

// // Define the Product type
// export interface Product {
//     _id: string;
//     name: string;
//     description: string;
//     price: number;
//     originalPrice?: number;
//     category: string;
//     images: string[];
//     inStock: boolean;
//     stockQuantity: number;
//     isDiscounted: boolean;
//     discountPercentage: number;
//     isTopSelling: boolean;
//     isNewlyLaunched: boolean;
//     ratings: {
//         average: number;
//         count: number;
//     };
//     specifications: Record<string, string>;
// }

// // Define the state shape
// export interface ProductsState {
//     products: Product[];
//     currentProduct: Product | null;
//     isLoading: boolean;
//     error: string | null;
// }

// const initialState: ProductsState = {
//     products: [],
//     currentProduct: null,
//     isLoading: false,
//     error: null,
// };

// // Async thunk to fetch a single product by its ID
// export const fetchProductById = createAsyncThunk(
//     'products/fetchProductById',
//     async (productId: string, { rejectWithValue }) => {
//         try {
//             const response = await api.get<Product>(`/products/${productId}`);
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
//         }
//     }
// );

// const productsSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Fetch single product
//             .addCase(fetchProductById.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//                 state.currentProduct = null;
//             })
//             .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
//                 state.isLoading = false;
//                 state.currentProduct = action.payload;
//             })
//             .addCase(fetchProductById.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export default productsSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Product {
  id?: string;    // some APIs return id, others _id
  _id?: string;
  name: string;
  price: number;
  // add any other fields as needed by your UI
}

interface FetchProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  total: number;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  total: number;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  total: 0,
};

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  Record<string, any> | undefined,
  { rejectValue: string }
>(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get<FetchProductsResponse>('/products', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<FetchProductsResponse>) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error occurred';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error occurred';
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;

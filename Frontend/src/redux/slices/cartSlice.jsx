import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthToken = () =>
  localStorage.getItem("userToken") || localStorage.getItem("token");

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart`,
        {
          params: { userId, guestId },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data?.data || { products: [], totalPrice: 0 };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, size, quantity, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/addto-cart`,
        { productId, size, quantity, color, guestId, userId },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { guestId, userId, productId, size, color, quantity },
    { rejectWithValue }
  ) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/cart/changeQuantity`,
        { guestId, userId, productId, size, color, quantity },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (
    { guestId, userId, productId, size, color },
    { rejectWithValue }
  ) => {
    try {
      const token = getAuthToken();
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/deleteCart`,
        {
          data: { guestId, userId, productId, size, color },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, userId }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/merge`,
        { guestId, userId },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { products: [], totalPrice: 0 },
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || { products: [], totalPrice: 0 };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.cart = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.cart = action.payload;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.cart = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

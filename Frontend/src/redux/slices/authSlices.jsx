import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userFromLocalStorage = localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : null;

const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromLocalStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("guestId", `guest_${new Date().getTime()}`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken") || localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        logout : (state)=>{
            state.user = null
            state.guestId = `guest_${new Date().getTime()}`
            localStorage.removeItem("userInfo")
            localStorage.removeItem("userToken")
            localStorage.removeItem("token")
            localStorage.setItem("guestId",state.guestId)
        },

        generateNewwGuestId:(state)=>{
            state.guestId = `guest_${new Date().getTime()}`
            localStorage.setItem("guestId",state.guestId)
        }
    },
    extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;   // ✅ user data from backend
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed"; // ✅ safer fallback
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;   // ✅ user data from backend
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed"; // ✅ safer fallback
    })
    .addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update profile";
    });
}

})

export const {generateNewwGuestId,logout} = authSlice.actions;

export default authSlice.reducer
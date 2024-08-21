import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "../initialState";

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ isAuthenticated: boolean; token: string | null }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
    },
  },
});

export default authSlice
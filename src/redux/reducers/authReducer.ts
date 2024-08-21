import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import initialState from '../initialState';
import authSlice from '../actions/authActions';

export const { setAuth, logout } = authSlice.actions;

export const checkAuthToken = (): AppThunk => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const isTokenValid = true;
      if (isTokenValid) {
        dispatch(setAuth({ isAuthenticated: true, token }));
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.error('Token kontrolünde hata:', error);
    dispatch(logout());
  }
};

export default authSlice.reducer;

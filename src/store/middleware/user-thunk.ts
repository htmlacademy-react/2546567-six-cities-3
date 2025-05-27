import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthPayload, AuthResponse } from '../slices/user-slice';
import { API } from '../../services/api';
import { saveToken } from '../../services/token';

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get<AuthResponse>('/login');
      return data;
    } catch (err) {
      return rejectWithValue('Failed to load login');
    }
  }
);

export const tryAuth = createAsyncThunk(
  'login/tryAuth',
  async (payload: AuthPayload, { rejectWithValue }) => {
    try {
      const { data } = await API.post<AuthResponse>('/login', payload);
      saveToken(data.token);
      return data;
    } catch (err) {
      return rejectWithValue('Failed to try auth');
    }
  }
);

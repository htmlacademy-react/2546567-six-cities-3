import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../utils/type';
import { AuthorizationStatus, RequestStatus } from '../../components/const';
import { API } from '../../services.ts/api';
import { AUTH_TOKEN_KEY } from '../../services.ts/token';

type AuthResponse = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
};

type UserState = {
  info: User | null;
  requestStatus: RequestStatus;
  authorizationStatus: AuthorizationStatus;
  authData: AuthResponse | null;
  loading: RequestStatus;
};

export type AuthPayload = {
  email: string;
  password: string;
};

const initialState: UserState = {
  info: null,
  requestStatus: RequestStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  authData: null,
  loading: RequestStatus.Idle,
};

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
    // Указываем payload с типом
    try {
      const { data } = await API.post<AuthResponse>('/login', payload);
      return data;
    } catch (err) {
      return rejectWithValue('Failed to try auth');
    }
  }
);

// хранилище
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = RequestStatus.Loading;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = RequestStatus.Success;

        state.authData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loading = RequestStatus.Failed;
      })
      .addCase(tryAuth.pending, (state) => {
        state.loading = RequestStatus.Loading;
      })
      .addCase(
        tryAuth.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = RequestStatus.Success;
          localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token);
          state.authData = action.payload;
          state.authorizationStatus = AuthorizationStatus.Auth;
        }
      )
      .addCase(tryAuth.rejected, (state) => {
        state.loading = RequestStatus.Failed;
      }),
});

export const { setAuthorizationStatus } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus } from '../../components/const';
import { UserInfo } from '../../utils/type';
import { fetchLogin, tryAuth } from '../middleware/user-thunk';
import { AUTH_TOKEN_KEY } from '../../services/token';

export type AuthResponse = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type UserState = {
  info: UserInfo | null;
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

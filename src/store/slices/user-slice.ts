import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus } from '../../utils/const';
import { UserInfo } from '../../utils/type';
import { fetchLogin, tryAuth } from '../middleware/user-thunk';
import { saveToken } from '../../services/token';

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
  tryAuthLoading: RequestStatus;
  isAuthCheckCompleted: boolean;
  error: string | null;
};

export type AuthPayload = {
  email: string;
  password: string;
  token?: string;
};

export const INITIAL_USER_STATE: UserState = {
  info: null,
  requestStatus: RequestStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown,
  authData: null,
  loading: RequestStatus.Idle,
  tryAuthLoading: RequestStatus.Idle,
  isAuthCheckCompleted: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_STATE,
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
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = RequestStatus.Success;
          saveToken(action.payload.token);
          state.authData = action.payload;
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.isAuthCheckCompleted = true;
        }
      )
      .addCase(fetchLogin.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loading = RequestStatus.Failed;
      })
      .addCase(tryAuth.pending, (state) => {
        state.error = null;
        state.tryAuthLoading = RequestStatus.Loading;
        state.isAuthCheckCompleted = false;
      })
      .addCase(
        tryAuth.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.tryAuthLoading = RequestStatus.Success;
          saveToken(action.payload.token);
          state.authData = action.payload;
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.isAuthCheckCompleted = true;
        }
      )
      .addCase(tryAuth.rejected, (state) => {
        state.tryAuthLoading = RequestStatus.Failed;
        state.isAuthCheckCompleted = true;
        state.error = 'ошибка при попытке авторизации';
      }),
});

export const { setAuthorizationStatus } = userSlice.actions;

export default userSlice.reducer;

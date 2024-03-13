import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DecodedToken {
  firstName: string;
  lastName: string;
  email: string;
  sub: number;
}

export interface AuthState {
  authStatus: 'idle' | 'authenticated' | 'unauthenticated';
  userInfo: DecodedToken | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  authStatus: 'idle',
  userInfo: null,
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.authStatus = 'authenticated';
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.authStatus = 'unauthenticated';
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setUserInfo: (state, action: PayloadAction<DecodedToken>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {
  login: loginAction,
  updateTokens,
  logout,
  setUserInfo,
} = userSlice.actions;

export default userSlice.reducer;

import { UserProfileFragment } from '@/__generated__/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  authStatus: 'idle' | 'authenticated' | 'unauthenticated';
  userInfo: UserProfileFragment | null;
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
    updateTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.authStatus = 'unauthenticated';
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setUserInfo: (state, action: PayloadAction<UserProfileFragment>) => {
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

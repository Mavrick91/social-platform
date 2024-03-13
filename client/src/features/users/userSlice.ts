import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  firstName: string;
  lastName: string;
  email: string;
  sub: number;
}

interface UserState {
  userInfo: DecodedToken | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  userInfo: null,
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = jwtDecode<DecodedToken>(action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    updateTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.newRefreshToken);
    },
    logout: (state) => {
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    },
  },
});

export const { login: loginAction, updateTokens, logout } = userSlice.actions;

export default userSlice.reducer;

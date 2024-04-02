import { AuthState } from '@/features/users/userSlice.ts';
import { RootState } from '@/store';

export function selectAuthState(state: RootState): AuthState {
  return state.user;
}

export const selectIsAuthenticated = (state: RootState) =>
  state.user.authStatus === 'authenticated';

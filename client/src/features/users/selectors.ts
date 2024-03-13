import { RootState } from '@/store';
import { AuthState, DecodedToken } from '@/features/users/userSlice.ts';

export function selectAuthState(state: RootState): AuthState {
  return state.user;
}

export const selectIsAuthenticated = (state: RootState) =>
  state.user.authStatus === 'authenticated';

export function selectAuthenticatedUser(state: RootState): DecodedToken {
  const authState = selectAuthState(state);
  if (selectIsAuthenticated(state)) {
    if (authState.userInfo) {
      return authState.userInfo;
    } else {
      throw new Error('User info is null');
    }
  }

  throw new Error('User is not authenticated');
}

import { UserProfileFragment } from '@/__generated__/graphql';
import { AuthState } from '@/features/users/userSlice.ts';
import { RootState } from '@/store';

export function selectAuthState(state: RootState): AuthState {
  return state.user;
}

export const selectIsAuthenticated = (state: RootState) =>
  state.user.authStatus === 'authenticated';

export function selectAuthenticatedUser(state: RootState): UserProfileFragment {
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

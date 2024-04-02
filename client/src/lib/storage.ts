import { User } from '@/__generated__/graphql';

export function saveTokens(accessToken: string, refreshToken: string): void {
  window.localStorage.setItem('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);
}

export function saveUser(user: User): void {
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function getTokens(): {
  accessToken: string;
  refreshToken: string;
} | null {
  const accessToken = window.localStorage.getItem('accessToken');
  const refreshToken = window.localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

export function getUser(): User {
  const user = window.localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function updateAccessToken(accessToken: string): void {
  window.localStorage.setItem('accessToken', accessToken);
}

export function clearStorage(): void {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
  window.localStorage.removeItem('user');
}

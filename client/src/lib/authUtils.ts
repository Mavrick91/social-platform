import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  const decoded: { exp: number } = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

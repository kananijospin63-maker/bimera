import { User } from '../types';

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem('bimera_user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('bimera_token');
}

export function setStoredAuth(token: string, user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bimera_token', token);
  localStorage.setItem('bimera_user', JSON.stringify(user));
  document.cookie = `bimera_token=${token}; path=/; max-age=604800; SameSite=Lax`;
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('bimera_token');
  localStorage.removeItem('bimera_user');
  document.cookie = 'bimera_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

import { authStore } from '@/stores/auth.store'

export function getAccessToken(): string | null {
  return authStore.getState().tokens?.accessToken ?? null
}

export function getRefreshToken(): string | null {
  return authStore.getState().tokens?.refreshToken ?? null
}

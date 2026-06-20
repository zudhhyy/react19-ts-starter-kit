import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { type AuthSession, type AuthTokens, type AuthUser } from '@/types/auth'

interface AuthState {
  user: AuthUser | null
  tokens: AuthTokens | null
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      setSession: ({ user, tokens }) => set({ user, tokens }),
      clearSession: () => set({ user: null, tokens: null }),
    }),
    {
      name: 'auth-session',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const authStore = {
  getState: useAuthStore.getState,
}

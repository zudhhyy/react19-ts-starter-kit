import { redirect } from '@tanstack/react-router'
import { authStore } from '@/stores/auth.store'

export function requireAuth(): void {
  const hasSession = Boolean(authStore.getState().tokens?.accessToken)
  if (!hasSession) {
    throw redirect({ to: '/login' })
  }
}

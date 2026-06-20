import { createFileRoute, redirect } from '@tanstack/react-router'
import { authStore } from '@/stores/auth.store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const hasSession = Boolean(authStore.getState().tokens?.accessToken)
    throw redirect({ to: hasSession ? '/dashboard' : '/login' })
  },
  component: () => null,
})

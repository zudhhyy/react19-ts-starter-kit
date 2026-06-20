import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/login-form'
import { authStore } from '@/stores/auth.store'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const hasSession = Boolean(authStore.getState().tokens?.accessToken)
    if (hasSession) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: LoginPage,
})

function LoginPage(): React.JSX.Element {
  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <LoginForm />
    </div>
  )
}

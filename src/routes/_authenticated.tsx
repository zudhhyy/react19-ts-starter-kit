import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '@/components/shared/app-shell'
import { requireAuth } from '@/features/auth/auth-guard'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    requireAuth()
  },
  component: AppShell,
})

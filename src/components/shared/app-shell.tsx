import * as React from 'react'
import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/shared/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useUiPreferencesStore } from '@/stores/ui-preferences.store'

export function AppShell(): React.JSX.Element {
  const navigate = useNavigate()
  const { userName, logout, isLoggingOut } = useAuth()
  const theme = useUiPreferencesStore((state) => state.theme)
  const setTheme = useUiPreferencesStore((state) => state.setTheme)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="font-semibold"
              onClick={() => void navigate({ to: '/dashboard' })}
            >
              React Boilerplate
            </button>
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/dashboard" className="[&.active]:font-semibold">
                Dashboard
              </Link>
              <Link to="/users" className="[&.active]:font-semibold">
                Users
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
            <span className="text-sm text-muted-foreground">{userName ?? 'Guest'}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                void logout()
              }}
              disabled={isLoggingOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
}

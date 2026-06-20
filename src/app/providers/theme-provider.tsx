import { useEffect } from 'react'
import * as React from 'react'
import { useUiPreferencesStore } from '@/stores/ui-preferences.store'

export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const theme = useUiPreferencesStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark')

    if (theme === 'dark') {
      root.classList.add('dark')
      return
    }

    if (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark')
    }
  }, [theme])

  return <>{children}</>
}

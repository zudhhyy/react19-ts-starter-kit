import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UiPreferencesState {
  theme: 'light' | 'dark' | 'system'
  density: 'comfortable' | 'compact'
  setTheme: (theme: UiPreferencesState['theme']) => void
  setDensity: (density: UiPreferencesState['density']) => void
}

export const useUiPreferencesStore = create<UiPreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',
      density: 'comfortable',
      setTheme: (theme) => set({ theme }),
      setDensity: (density) => set({ density }),
    }),
    {
      name: 'ui-preferences',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

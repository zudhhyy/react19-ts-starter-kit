import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { type ReactElement, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuth } from '@/hooks/use-auth'
import { useAuthStore } from '@/stores/auth.store'

const { loginMock, logoutMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
  logoutMock: vi.fn(),
}))

const mockNavigate = vi.fn()

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<object>('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/features/auth/auth.api', () => ({
  authApi: {
    login: loginMock,
    logout: logoutMock,
  },
}))

function createWrapper(): ({ children }: { children: ReactNode }) => ReactElement {
  const client = new QueryClient()

  return ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

describe('useAuth', () => {
  beforeEach(() => {
    const state = useAuthStore.getState()

    localStorage.clear()
    state.clearSession()
    mockNavigate.mockReset()
    loginMock.mockReset()
    logoutMock.mockReset()
  })

  it('logs in and stores session', async () => {
    loginMock.mockResolvedValue({
      user: { id: 'u1', email: 'demo@mail.com', fullName: 'Demo', role: 'admin' },
      tokens: { accessToken: 'token', refreshToken: 'refresh' },
    })

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() })

    await result.current.login({
      email: 'demo@mail.com',
      password: 'password123',
    })

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true)
    })
    expect(useAuthStore.getState().user?.email).toBe('demo@mail.com')
    expect(mockNavigate).toHaveBeenCalled()
  })
})

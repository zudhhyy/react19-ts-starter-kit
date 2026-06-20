import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { authApi } from '@/features/auth/auth.api'
import { type LoginSchema } from '@/features/auth/auth.schema'
import { useAuthStore } from '@/stores/auth.store'

export function useAuth(): {
  isAuthenticated: boolean
  userName: string | null
  login: (payload: LoginSchema) => Promise<void>
  logout: () => Promise<void>
  isLoggingIn: boolean
  isLoggingOut: boolean
} {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)
  const tokens = useAuthStore((state) => state.tokens)

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginSchema) => authApi.login(payload),
    onSuccess: async (session) => {
      setSession(session)
      await queryClient.invalidateQueries({ queryKey: ['auth', 'session'] })
      await navigate({ to: '/dashboard' })
      toast.success('Login successful')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => authApi.logout(),
    onSettled: async () => {
      clearSession()
      queryClient.clear()
      await navigate({ to: '/login' })
      toast.info('You have been logged out')
    },
  })

  return {
    isAuthenticated: Boolean(tokens?.accessToken),
    userName: user?.fullName ?? null,
    login: async (payload) => {
      await loginMutation.mutateAsync(payload)
    },
    logout: async () => {
      await logoutMutation.mutateAsync()
    },
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  }
}

import { env } from '@/app/config/env'
import { apiClient } from '@/lib/api/api-client'
import { type AuthSession, type AuthUser } from '@/types/auth'
import { type LoginSchema } from '@/features/auth/auth.schema'

function createMockSession(email: string): AuthSession {
  return {
    user: {
      id: 'user_001',
      email,
      fullName: 'Template User',
      role: 'admin',
    },
    tokens: {
      accessToken: crypto.randomUUID(),
      refreshToken: crypto.randomUUID(),
    },
  }
}

export const authApi = {
  async login(payload: LoginSchema): Promise<AuthSession> {
    if (env.appEnv === 'mock') {
      await new Promise((resolve) => setTimeout(resolve, 400))
      return createMockSession(payload.email)
    }

    const response = await apiClient.post<AuthSession>('/auth/login', payload)
    return response.data
  },

  async me(): Promise<AuthUser> {
    const response = await apiClient.get<AuthUser>('/auth/me')
    return response.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },
}

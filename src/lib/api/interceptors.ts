import { type AxiosError, type AxiosResponse } from 'axios'
import { apiClient } from '@/lib/api/api-client'
import { getAccessToken, getRefreshToken } from '@/lib/api/auth-token'
import { authStore } from '@/stores/auth.store'
import { type RetryableRequestConfig } from '@/lib/api/types'

let refreshRequest: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  if (refreshRequest) {
    return refreshRequest
  }

  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    return null
  }

  refreshRequest = apiClient
    .post<{ accessToken: string }>('/auth/refresh', { refreshToken })
    .then((response) => response.data.accessToken)
    .catch(() => null)
    .finally(() => {
      refreshRequest = null
    })

  return refreshRequest
}

export function setupInterceptors(): void {
  apiClient.interceptors.request.use((config) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const config = error.config as RetryableRequestConfig | undefined

      if (!config) {
        return Promise.reject(error)
      }

      const unauthorized = error.response?.status === 401
      const shouldRetry = unauthorized && !config._retry

      if (shouldRetry) {
        config._retry = true
        const nextAccessToken = await refreshAccessToken()

        if (nextAccessToken) {
          const current = authStore.getState()
          if (current.tokens && current.user) {
            authStore
              .getState()
              .setSession({
                user: current.user,
                tokens: { ...current.tokens, accessToken: nextAccessToken },
              })
          }

          config.headers.Authorization = `Bearer ${nextAccessToken}`
          return apiClient(config)
        }

        authStore.getState().clearSession()
      }

      return Promise.reject(error)
    },
  )
}

import { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

export interface ApiErrorPayload {
  message?: string
  code?: string
}

export type ApiError = AxiosError<ApiErrorPayload>

export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

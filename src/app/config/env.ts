const requiredEnv = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
}

export const env = {
  apiUrl: requiredEnv.VITE_API_URL,
  appEnv: requiredEnv.VITE_APP_ENV,
} as const

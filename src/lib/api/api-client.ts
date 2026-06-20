import axios from 'axios'
import { env } from '@/app/config/env'

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

import { apiClient } from '@/lib/api/api-client'
import { type User } from '@/types/user'

const demoUsers: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', status: 'active' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com', role: 'editor', status: 'invited' },
  { id: 'u3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer', status: 'disabled' },
]

export const usersApi = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>('/users')
      return response.data
    } catch {
      return demoUsers
    }
  },
}

import { useQuery } from '@tanstack/react-query'
import { usersApi } from '@/features/users/users.api'

export function useUsersQuery() {
  return useQuery({
    queryKey: ['users', 'list'],
    queryFn: () => usersApi.getUsers(),
  })
}

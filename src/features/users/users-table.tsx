import * as React from 'react'
import { DataTable } from '@/components/shared/data-table/data-table'
import { QueryState } from '@/components/shared/query/query-state'
import { usersColumns } from '@/features/users/users-columns'
import { useUsersQuery } from '@/features/users/use-users-query'

export function UsersTable(): React.JSX.Element {
  const { data, isLoading, isError, error, refetch } = useUsersQuery()

  if (isLoading || isError) {
    return (
      <QueryState
        isLoading={isLoading}
        isError={isError}
        errorMessage={error instanceof Error ? error.message : 'Failed to load users'}
        onRetry={() => {
          void refetch()
        }}
      />
    )
  }

  return <DataTable data={data ?? []} columns={usersColumns} filterKey="name" />
}

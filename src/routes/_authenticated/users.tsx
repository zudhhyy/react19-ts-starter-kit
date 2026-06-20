import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { UsersTable } from '@/features/users/users-table'
import { Modal } from '@/components/shared/ui/modal'
import { Button } from '@/components/shared/ui/button'

export const Route = createFileRoute('/_authenticated/users')({
  component: UsersPage,
})

function UsersPage(): React.JSX.Element {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Modal
          title="Create user"
          description="Modal pattern example ready to integrate with your API mutation."
          trigger={<Button type="button">New user</Button>}
        >
          <p className="text-sm text-muted-foreground">
            Put your create-user form here and submit with React Hook Form + TanStack Query mutation.
          </p>
        </Modal>
      </div>
      <p className="text-sm text-muted-foreground">TanStack Table with sorting, filtering, and pagination.</p>
      <UsersTable />
    </section>
  )
}

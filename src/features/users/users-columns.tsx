import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { AppDropdown } from '@/components/shared/ui/dropdown'
import { Button } from '@/components/shared/ui/button'
import { type User } from '@/types/user'

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'status', header: 'Status' },
  {
    id: 'actions',
    cell: () => (
      <AppDropdown
        items={[
          { label: 'View profile', onSelect: () => undefined },
          { label: 'Deactivate user', onSelect: () => undefined },
        ]}
      />
    ),
  },
]

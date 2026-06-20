import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DashboardOverview } from '@/features/dashboard/dashboard-overview'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage(): React.JSX.Element {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Production-ready starter page with reusable patterns.</p>
      </div>
      <DashboardOverview />
    </section>
  )
}

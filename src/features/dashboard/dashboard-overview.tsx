import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shared/ui/card'

export function DashboardOverview(): React.JSX.Element {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
          <CardDescription>Example KPI card</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">128</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Live health indicator</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">24</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Status</CardTitle>
          <CardDescription>Service health at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-emerald-600">Healthy</p>
        </CardContent>
      </Card>
    </div>
  )
}

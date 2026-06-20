import * as React from 'react'
import { Button } from '@/components/shared/ui/button'

interface QueryStateProps {
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  onRetry?: () => void
}

export function QueryState({
  isLoading,
  isError,
  errorMessage,
  onRetry,
}: QueryStateProps): React.JSX.Element | null {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading data...</p>
  }

  if (isError) {
    return (
      <div className="space-y-2 rounded-md border border-destructive/30 bg-destructive/5 p-3">
        <p className="text-sm text-destructive">{errorMessage ?? 'Something went wrong.'}</p>
        {onRetry ? (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </div>
    )
  }

  return null
}

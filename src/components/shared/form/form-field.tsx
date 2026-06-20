import * as React from 'react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { Label } from '@/components/shared/ui/label'

interface FormFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>
  name: FieldPath<TFormValues>
  label: string
  render: (field: {
    name: string
    value: unknown
    onChange: (...event: unknown[]) => void
    onBlur: () => void
    disabled?: boolean
  }) => React.ReactNode
}

export function FormField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  render,
}: FormFieldProps<TFormValues>): React.JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{label}</Label>
          {render(field)}
          {fieldState.error ? <p className="text-sm text-destructive">{fieldState.error.message}</p> : null}
        </div>
      )}
    />
  )
}

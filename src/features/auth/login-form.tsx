import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormField } from '@/components/shared/form/form-field'
import { Button } from '@/components/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { Input } from '@/components/shared/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { type LoginSchema, loginSchema } from '@/features/auth/auth.schema'

export function LoginForm(): React.JSX.Element {
  const { login, isLoggingIn } = useAuth()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use your account credentials to access protected routes.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            void form.handleSubmit((values) => {
              void login(values)
            })(event)
          }}
        >
          <FormField
            control={form.control}
            name="email"
            label="Email"
            render={(field) => (
              <Input
                id={field.name}
                type="email"
                autoComplete="email"
                value={String(field.value)}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            render={(field) => (
              <Input
                id={field.name}
                type="password"
                autoComplete="current-password"
                value={String(field.value)}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled}
              />
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

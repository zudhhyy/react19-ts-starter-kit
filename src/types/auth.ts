export type UserRole = 'admin' | 'member'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: UserRole
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthSession {
  user: AuthUser
  tokens: AuthTokens
}

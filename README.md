# react19-ts-starter-kit

Production-ready React 19 + TypeScript frontend starter focused on scalability, maintainability, and clean developer experience.

## Stack

- React 19
- TypeScript (strict)
- Vite + pnpm
- TanStack Router (type-safe file-based routing)
- TanStack Query
- Zustand
- React Hook Form + Zod
- Axios
- Tailwind CSS + shadcn/ui patterns + Radix UI
- TanStack Table
- Vitest + React Testing Library
- ESLint + Prettier + Husky + lint-staged

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create your local environment file:

```bash
cp .env.example .env
```

3. Start development server:

```bash
pnpm dev
```

## Environment Variables

Defined in `.env`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=mock
```

- `VITE_API_URL`: API base URL used by Axios client.
- `VITE_APP_ENV`: runtime environment (`development`, `staging`, `production`, `mock`).

## Available Commands

- `pnpm dev` - generate routes and run Vite dev server
- `pnpm build` - generate routes, type-check, and build production assets
- `pnpm lint` - run ESLint with zero warnings policy
- `pnpm type-check` - run TypeScript project type-checking
- `pnpm test` - run Vitest with coverage
- `pnpm test:watch` - run Vitest in watch mode
- `pnpm preview` - preview production build

## Folder Structure

```txt
src/
  app/
    config/        # app-level config (env)
    providers/     # provider composition
    router/        # router setup
  features/
    auth/          # auth domain (schema/api/guard/form)
    dashboard/     # dashboard domain
    users/         # users domain
  components/
    shared/        # reusable UI and shared components
  hooks/           # reusable hooks
  lib/
    api/           # axios client + interceptors
    query-client.ts
    utils.ts
  stores/          # global Zustand stores
  types/           # domain types
  utils/           # small utility helpers
```

## Architecture Overview

### App Layer

- `app/providers` composes theme, query, router, and toasts.
- `app/router` owns router creation and type registration.
- `routes` handles route boundaries and guards.

### Feature Layer

- Each domain keeps its own API/query/schema/UI logic in `features/*`.
- Shared cross-feature primitives stay in `components/shared`, `lib`, `hooks`, and `stores`.

### State Strategy

- **Server state**: TanStack Query (`lib/query-client.ts`) with production defaults.
- **Client global state**: Zustand only for truly global concerns (`auth`, `ui-preferences`).
- **Local state**: component-level state by default.

### API Strategy

- `lib/api/api-client.ts`: central Axios instance.
- `lib/api/interceptors.ts`: request token injection, 401 handling, refresh-token-ready retry flow.
- Auth token source is centralized through `stores/auth.store.ts`.

### Auth Flow

- Login page with React Hook Form + Zod.
- Auth session persisted in Zustand (`persist` middleware).
- Protected routes via `features/auth/auth-guard.ts`.
- Logout action clears session and query cache.
- Refresh flow structure is implemented in Axios response interceptor.

### Table Pattern

- Generic `DataTable` wrapper in `components/shared/data-table`.
- Supports sorting, filtering, pagination.
- `features/users/users-columns.tsx` demonstrates typed column configuration.

## Coding Conventions

- TypeScript everywhere; avoid `any`.
- Prefer composition over inheritance.
- Keep feature logic close to feature UI.
- Keep reusable code in shared layers only after real reuse appears.
- Use async/await and explicit error boundaries.
- Keep comments minimal and only for non-obvious logic.

## Testing

- `src/components/shared/ui/button.test.tsx`: component test example.
- `src/hooks/use-auth.test.tsx`: hook test example.

## Git Hooks

- `pre-commit`: run `lint-staged`
- `pre-push`: run `pnpm type-check && pnpm test`

Run this once in a git repo after clone:

```bash
pnpm prepare
```

## CI

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pull requests:

1. install dependencies
2. lint
3. type-check
4. test
5. build

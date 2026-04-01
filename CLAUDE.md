# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
ng serve                    # Dev server
ng build                    # Development build
ng build --configuration=production  # Production build
ng test                     # Run unit tests (Karma + Jasmine)
ng lint                     # ESLint
npm run format              # Prettier format
npm run format-check        # Check formatting without writing
```

To run a single test file, pass the `--include` flag:

```bash
ng test --include='src/app/tasks/**/*.spec.ts'
```

## Architecture Overview

**Angular 21** with standalone components and **zoneless change detection** (`provideZonelessChangeDetection()`). All components use the standalone pattern — no NgModules.

### Routing

Two top-level layouts:

- `AuthLayoutComponent` — public routes (login, event signup)
- `DashboardLayoutComponent` — protected `/app/*` routes, gated by `authGuard` / `authChildGuard`

All feature routes are **lazy-loaded** via `loadChildren`. The `tryAuthGuard` allows optional auth (used for the games route).

### State Management

Uses `@ngrx/signals` with three reusable composable features in `src/app/shared/signal-stores/`:

- **`withCrudEntities<T>`** — generic CRUD: `loadAll`, `loadAllPaged`, `loadOne`, `create`, `update`, `remove`, `upsert`. Manages loading states, query strings, and entity collections via `@ngrx/signals/entities`.
- **`withUi<T>`** — UI state (filters, search, sort). `updateUiState()` optionally triggers HTTP reload.
- **`withCreateEditEntityState<T>`** — modal open/close + selected entity for create/edit drawers.

Each feature module composes these into a single signal store (e.g., `TasksSignalStore`, `EventsSignalStore`). Async operations use `rxMethod<T>()` for reactive HTTP calls.

`AuthSignalStore` is special — it manages the current user, JWT token, permissions, and computed route visibility.

### HTTP & Auth

- `AuthInterceptor` injects Bearer tokens on all requests
- Two API base URLs from `environment`: `apiUrl` (main) and `moneyAppApiUrl` (money feature)
- Token stored via `AuthStorageService`

### UI Library

**ng-zorro-antd** (Ant Design) is the primary component library. **Bootstrap 5** provides CSS utilities. Icons come from **FontAwesome**. Charts use **@swimlane/ngx-charts**.

### Mobile

`isMobile` constant (screen < 900px) gates layout differences. `MobileDisplayService` coordinates header title, create button visibility, and footer buttons across components.

### Permissions

`Permissions` enum drives role-based access. Route guards and computed signals on `AuthSignalStore` filter available routes and features per user.

### Feature Modules

| Module          | Path                 | Notes                              |
| --------------- | -------------------- | ---------------------------------- |
| `auth`          | `/app/auth`          | Login, password change             |
| `users`         | `/app/users`         | User admin                         |
| `tasks`         | `/app/tasks`         | Tasks, tags, families              |
| `events`        | `/app/events`        | Events + participants              |
| `goals`         | `/app/goals`         | Goal tracking                      |
| `dashboard`     | `/app/dashboard`     | Main dashboard                     |
| `backups`       | `/app/backups`       | Backups, targets, schedules        |
| `file-explorer` | `/app/file-explorer` | File/directory browser             |
| `gaming`        | `/app/gaming`        | Sessions + device mgmt (WebSocket) |
| `money`         | `/app/money`         | Financial tracking                 |
| `logging`       | `/app/logging`       | Event logs                         |
| `event-signup`  | `/events`            | Public, no auth required           |

### Conventions

- Component selectors: `app-` prefix, kebab-case
- Directive selectors: `app` prefix, camelCase
- Model files include factory functions (e.g., `createTask()`, `createEvent()`)
- Strict TypeScript (`strict`, `noImplicitOverride`, `noImplicitReturns`)
- Pre-commit hook via Husky runs lint/format checks

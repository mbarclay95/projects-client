# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
ng serve                    # Dev server
ng build                    # Development build
ng build --configuration=production  # Production build
ng test --watch=false       # Run unit tests (Vitest + jsdom)
ng lint                     # ESLint
npm run format              # Prettier format
npm run format-check        # Check formatting without writing
```

To run a single test file, pass the `--include` flag:

```bash
ng test --watch=false --include='src/app/draft/**/*.spec.ts'
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

**ng-zorro-antd** (Ant Design) is the primary component library. **Bootstrap 5** provides CSS utilities. Icons come from **FontAwesome**. There is no charting library — `@swimlane/ngx-charts` was a dependency for a long time without a single import, and has been removed.

### Dependencies

`npm ci` runs **without** `--legacy-peer-deps`. Keep it that way — if an install starts
failing on peer resolution, fix the offending package rather than reaching for the flag,
because it silently masks every subsequent conflict too.

**`ngx-socket-io` is pinned to an exact version, deliberately — do not add a caret.**
4.11.0+ requires Angular 22, so a caret range resolves to a version this project cannot
satisfy, and the failure only appears on a clean install, not an incremental one.

### Mobile

`isMobile` constant (screen < 900px) gates layout differences. `MobileDisplayService` coordinates header title, create button visibility, and footer buttons across components.

### Permissions

`Permissions` enum drives role-based access. Route guards and computed signals on `AuthSignalStore` filter available routes and features per user.

### Feature Modules

| Module          | Path                 | Notes                                                                                                                                                                                                                                                                                                                                     |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auth`          | `/app/auth`          | Login, password change                                                                                                                                                                                                                                                                                                                    |
| `users`         | `/app/users`         | User admin                                                                                                                                                                                                                                                                                                                                |
| `tasks`         | `/app/tasks`         | `My Family`; `UserGroup` shared, `UserGroupsSignalStore` in `shared/services/user-groups-signal-store.ts`, `TagsSignalStore` shared and scoped — one list per `TagScope`, `taskTags` here; owns `TaskPointColorsService` and the task-point pipes, which the user-groups modal reaches back for                                           |
| `user-groups`   | `/app/user-groups`   | Admin user-groups table with a Scope column; `CreateEditUserGroupModalComponent`, shared with Tasks for `My Family`, driven by `USER_GROUP_SCOPE_LABELS`                                                                                                                                                                                  |
| `events`        | `/app/events`        | Events + participants                                                                                                                                                                                                                                                                                                                     |
| `goals`         | `/app/goals`         | Goal tracking                                                                                                                                                                                                                                                                                                                             |
| `grocery`       | `/app/grocery`       | The master list — `GroceryItemsSignalStore`; filtering (search + tags) runs client-side over the loaded list through `filterGroceryItems`; an empty state for a user with no grocery group; each item carries a `GroceryItemUnit` (`none`/`weight`/`count`) and an optional `defaultQuantity`, rendered through `formatGroceryItemAmount` |
| `dashboard`     | `/app/dashboard`     | Main dashboard                                                                                                                                                                                                                                                                                                                            |
| `backups`       | `/app/backups`       | Backups, targets, schedules                                                                                                                                                                                                                                                                                                               |
| `file-explorer` | `/app/file-explorer` | File/directory browser                                                                                                                                                                                                                                                                                                                    |
| `gaming`        | `/app/gaming`        | Sessions + device mgmt (WebSocket)                                                                                                                                                                                                                                                                                                        |
| `money`         | `/app/money`         | Financial tracking                                                                                                                                                                                                                                                                                                                        |
| `logging`       | `/app/logging`       | Event logs                                                                                                                                                                                                                                                                                                                                |
| `event-signup`  | `/events`            | Public, no auth required                                                                                                                                                                                                                                                                                                                  |

Inside Tasks, the UI still says Family on purpose — the task owner radio and
the `My Family` tab are unchanged. `CreateEditUserGroupModalComponent`'s own
copy (`Create Family`, `Family Name:`, `Family Members:`) is now driven by
`USER_GROUP_SCOPE_LABELS` (`shared/models/user-group.model.ts`), a
`UserGroupScope → string` map; the tasks scope's label is `Family`, so the My
Family tab reads byte-for-byte the same as before while the admin
`/app/user-groups` page's modal follows whichever scope is selected. The scope
radio the admin page adds is create-only — scope is immutable — and rendered
only when `model.id === 0`.

`createUserGroup()` deliberately defaults all six task-shaped fields
regardless of scope, so a non-tasks group's payload can omit them and the
`UserGroup` interface's fields stay required. The one place that default
would otherwise show through is the admin table's Task Strategy cell, which is
gated on `group.scope === 'tasks'` for that reason.

`TagsSignalStore` (`shared/services/tags-signal-store.ts`) now serves two
scopes — `TagScope` is `'tasks' | 'grocery'`, `tagsByScope` carries a list per
scope, and `taskTags` and `groceryTags` are the computed each feature reads.

`withCrudEntities`'s `update()` surfaces a failed save the way `create()`
always has — an `error.error.message` toast plus a `setLoadingOne()` reset —
rather than only logging it, so a rejected edit (a duplicate grocery item name,
for instance) leaves the modal's buttons usable instead of stuck disabled.

### Testing

Runner is **Vitest in jsdom** via the `@angular/build:unit-test` builder (`runner: "vitest"`,
no `browsers` key). There is deliberately **no browser** in the loop — CI installs no
Chromium, and any test that needs a real browser to pass does not belong here. Config
lives in `angular.json`; `src/test-setup.ts` stubs `window.matchMedia` (jsdom has none,
and `isMobile` in `app.component.ts` reads it at module scope), and `src/test-providers.ts`
supplies `provideZonelessChangeDetection()`.

**The app is zoneless, so there is no `zone.js/testing`.** `fakeAsync`/`tick` do not work.
Use `vi.useFakeTimers()` with `await vi.advanceTimersByTimeAsync(ms)` instead — see
`draft.service.spec.ts` for the pattern against an rxjs polling stream.

**Do not write a test per file.** This repo previously carried 126 spec files, 123 of which
were untouched `ng generate` boilerplate — a single `should create` asserting the component
is truthy. They were deleted. They caught nothing, cost a full browser toolchain in CI, and
one had been asserting against deleted starter markup for months without anyone noticing.
**Never add a `should create` test, and never add a spec file just because a component was
created.** Angular's schematics generate these by default; delete the spec unless you are
about to put a real assertion in it.

A new spec is justified when there is **logic worth breaking** — branching, ordering,
caching, state transitions, time-dependent behavior, non-obvious edge cases. The surviving
tests are the shape to copy:

- `draft-cache.service.spec.ts` — localStorage round-trip, per-draft isolation, stale-identity detection
- `draft.service.spec.ts` — polls every 2s while `in_progress`, stops when the status leaves it
- `team-pool.component.spec.ts` — pick guards (not your turn / already taken), calling the method directly

Note the last one: it tests a **component method**, never the rendered DOM. Prefer that. If
behavior is worth testing, it is nearly always reachable without a fixture — and pulling
logic out of the template into a method or a service is the right response to "this is hard
to test". Rendering assertions are a last resort, and template-only changes get no test at all.

Testing a component does mean providing everything it injects — see `team-pool.component.spec.ts`,
which mocks `NzModalService` and `NzImageService` purely to let construction succeed.

### Conventions

- Component selectors: `app-` prefix, kebab-case
- Directive selectors: `app` prefix, camelCase
- Model files include factory functions (e.g., `createTask()`, `createEvent()`)
- Strict TypeScript (`strict`, `noImplicitOverride`, `noImplicitReturns`)
- Pre-commit hook via Husky runs lint/format checks
- **New code uses signal-based `input()` / `output()`, never the `@Input()` / `@Output()`
  decorators.** This app is zoneless, and decorator-based inputs read as plain fields
  (`this.draft`) rather than signals, so nothing downstream reacts to them reliably —
  see `DefaultModalSignalComponent` (`src/app/shared/components/default-modal-signal/`)
  for the pattern to follow. This especially rules out an **input setter**
  (`@Input() set x(v) { ... derive other state ... }` with a paired getter) for
  deriving state from an incoming value — that's exactly what `input()` plus
  `computed()` (or `linkedSignal()` for state that also needs local mutation, e.g.
  drag-reorder before a save) replaces. Existing decorator-based components are not
  retrofitted on sight; convert a component when you're already touching it for
  other reasons, not as a drive-by change.

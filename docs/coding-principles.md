# Coding Principles

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Document architecture and quality standards as they are decided.

Decisions behind these standards are recorded in [`decisions/`](./decisions/README.md).

## Architecture

Monorepo layout (pnpm workspaces):

```text
apps/
  api/         Node + TS Express API
    src/
      entities/           DB-row shapes (Product, Cart, CartItem, Entity base)
      models/             data-access classes (ProductModel, CartModel...)
      persistence/
        in-memory/        swappable store (in-memory now, real DB later)
      services/           business logic (cart rules, totals, validation)
      routes/             thin HTTP layer (calls services)
  web/         React + Vite + TS SPA (view/props types live here)
packages/
  api-types/   ONLY REST request/response types (+ error shape when added)
```

- **Backend layering (top → bottom):** `routes/` → `services/` → `models/` → `persistence/`, with `models/` returning `entities/`. See [ADR 0013](./decisions/0013-backend-layering.md).
  - **entities/** — pure DB-row shapes, data only; map 1:1 to future DB tables.
  - **models/** — ActiveRecord/ORM-style data-access classes (`findAll`/`findById`/`save`/`delete`); the class the rest of the app works with. Naming: entity `Product` → model `ProductModel`.
  - **persistence/** — store **ports** (`ProductStore`, …) + adapters. Default adapter is in-memory (`Map*Store`) via `createPersistence()`. A real DB adapter swaps in there only.
  - **services/** — business logic; cart methods take `cartId` (DB-ready). Validation and totals live here.
  - **routes/** — thin HTTP layer. Resolve current cart via `resolveCurrentCartId(req)` (hardcoded `'1'` now; cookie later), call services, map to `api-types` DTOs. See [ADR 0004](./decisions/0004-server-framework.md) and [ADR 0009](./decisions/0009-api-design-conventions.md).
- **Seed-on-boot (prototype hack):** `createModels()` seeds 10 products + cart `'1'` into the in-memory store when the app starts (and when tests call `createModels()`). Not a DB migration — replace when a real adapter lands.
- **Type boundary:** share **only** REST request/response types via `packages/api-types`. Frontend view/props types and backend domain entities stay local and separate, even when similar, and are **mapped at the boundary** — routes/controllers on the backend, the API client on the frontend. See [ADR 0002](./decisions/0002-type-boundary.md).
- **Rendering:** client-side rendered SPA, no SSR. See [ADR 0001](./decisions/0001-stack-and-rendering.md).

## Frontend architecture

Standing rules for `apps/web`; full rationale in [ADR 0011](./decisions/0011-frontend-state-management.md).

```text
apps/web/src/
  shared/
    api/            http client, ApiError parsing, base URL (VITE_API_BASE_URL)
    types/          cross-page view-model types
    ui/             shared presentational primitives
  pages/
    products/
      api/          product API calls
      controller/   thunk-style controller (dispatch, api) - sole dispatcher
      state/        reducer + Context provider (useReducer)
      components/   presentational
      ProductListPage.tsx
    cart/
      api/          cart API calls
      controller/   thunk-style controller (dispatch, api) - sole dispatcher
      state/        reducer + Context provider (useReducer)
      components/   presentational
      CartPage.tsx
  app/              router + app shell (thin, removable for MPA)
  main.tsx
```

- **Routing & isolation:** SPA with `react-router`; each page is a self-contained module under `pages/` so it can later be promoted to its own Vite entry (MPA) or SSR-rendered.
- **State container:** React Context + `useReducer`, one provider per page. No Redux, no external store. State lives in the reducer; the provider exposes `{ state, controller }` (not raw `dispatch`) and mounts at the page root, so each page/request gets its own instance (no singleton).
- **Unidirectional flow:** View → Controller → Reducer (via `useReducer`) → state through Context → View.
- **UI boundary:** the View never calls `dispatch`/context actions directly — it only calls controller methods. The **controller is the sole dispatcher**.
- **Controller:** thunk-style `(dispatch, api)` functions, no React imports; own the DTO→view-model mapping via a pure mapper (per [ADR 0002](./decisions/0002-type-boundary.md)). State holds data only; currency/price is formatted in the view (`Intl.NumberFormat`).
- **Cart updates:** pessimistic — mark the line `pending`, call the API, then dispatch the authoritative `CartResponse`.
- **Testing standard:** reducers unit-tested as pure functions (action → next state); controllers unit-tested with a fake `dispatch` + fake `api`, asserting the actions dispatched — both without React or network.

## Strong typing

- `strict: true` in a root base `tsconfig`, extended per workspace. Also enable `noUncheckedIndexedAccess`.
- **Ban `any`** — enforced via ESLint (`@typescript-eslint/no-explicit-any`). Prefer precise types and inference.
- **Hello phase:** plain TypeScript types in `packages/api-types` (no runtime validation yet).
- **Planned (backlog P5-3):** runtime validation at the HTTP boundary with **Zod**; derive TypeScript types from schemas (`z.infer`) so api-types has one source of truth.
- See [ADR 0005](./decisions/0005-repository-and-build-tooling.md).

## Testing

- **Vitest** across FE and BE; **supertest** for Express endpoints. See [ADR 0006](./decisions/0006-testing-strategy.md).
- **Unit-test** domain logic (highest value): cart calculations and add/increment/remove rules, validation.
- **Integration-test** API endpoints via supertest: happy paths plus structured 4xx error cases.
- **Component-test** key frontend behavior: rendering, add/remove, error surfacing.
- Rationale over raw coverage: prioritize the domain logic and the validation/error boundary.

## Error Handling

- Define the structured 4xx error shape **once** in `packages/api-types` (a single `ApiError` type; plain TS in P3-2, Zod schema in P5-3); the API returns it for validation failures and unknown resources.
- Detailed API conventions (status codes, response envelope) are decided in **ADR 0009** (P3-1). Validation-specific error rules and frontend error-surfacing are decided in **ADR 0010** (P4-1) and implemented in P4-4; the standing requirement is that the frontend **surfaces API errors meaningfully — no silent failures**.

## Other

- **Package manager:** pnpm workspaces. **Module system:** ESM. **Runtime:** Node 22 LTS. See [ADR 0005](./decisions/0005-repository-and-build-tooling.md).
- **Styling:** CSS Modules (scoped, no runtime). See [ADR 0007](./decisions/0007-styling.md).
- **Cross-origin access:** Express CORS with a config/env-driven origin allowlist. See [ADR 0008](./decisions/0008-cors-access-policy.md).

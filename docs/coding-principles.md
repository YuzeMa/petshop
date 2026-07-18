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
  - **persistence/in-memory/** — the store the models talk to; an in-memory `Map` isolated behind an interface so a real DB adapter can replace it with minimal change.
  - **services/** — business logic (cart calculations, add/increment/remove rules, validation).
  - **routes/** — thin HTTP layer (routing, request/response plumbing only). See [ADR 0004](./decisions/0004-server-framework.md).
- **Type boundary:** share **only** REST request/response types via `packages/api-types`. Frontend view/props types and backend domain entities stay local and separate, even when similar, and are **mapped at the boundary** — routes/controllers on the backend, the API client on the frontend. See [ADR 0002](./decisions/0002-type-boundary.md).
- **Rendering:** client-side rendered SPA, no SSR. See [ADR 0001](./decisions/0001-stack-and-rendering.md).

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

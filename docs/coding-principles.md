# Coding Principles

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Document architecture and quality standards as they are decided.

Decisions behind these standards are recorded in [`decisions/`](./decisions/README.md).

## Architecture

Monorepo layout (pnpm workspaces):

```text
apps/
  api/         Node + TS Express API (domain entities live here)
  web/         React + Vite + TS SPA (view/props types live here)
packages/
  contracts/   ONLY REST request/response DTOs + error shape (Zod schemas + inferred types)
```

- **Layer responsibilities (backend):** Express controllers are a thin HTTP layer (routing, request/response plumbing). Domain logic (cart calculations, add/increment/remove rules) lives in a separate domain layer. See [ADR 0004](./decisions/0004-server-framework.md).
- **Type boundary:** share **only** the REST contract via `packages/contracts`. Frontend view/props types and backend domain entities stay local and separate, even when similar, and are **mapped at the boundary** — controllers on the backend, the API client on the frontend. See [ADR 0002](./decisions/0002-type-boundary.md).
- **Rendering:** client-side rendered SPA, no SSR. See [ADR 0001](./decisions/0001-stack-and-rendering.md).

## Strong typing

- `strict: true` in a root base `tsconfig`, extended per workspace. Also enable `noUncheckedIndexedAccess`.
- **Ban `any`** (enforced via ESLint). Prefer precise types and inference.
- Runtime validation at the HTTP boundary with **Zod**; derive TypeScript types from the schemas (`z.infer`) so the contract has one source of truth.
- See [ADR 0005](./decisions/0005-repository-and-build-tooling.md).

## Testing

- **Vitest** across FE and BE; **supertest** for Express endpoints. See [ADR 0006](./decisions/0006-testing-strategy.md).
- **Unit-test** domain logic (highest value): cart calculations and add/increment/remove rules, validation.
- **Integration-test** API endpoints via supertest: happy paths plus structured 4xx error cases.
- **Component-test** key frontend behavior: rendering, add/remove, error surfacing.
- Rationale over raw coverage: prioritize the domain logic and the validation/error boundary.

## Error Handling

- Define the structured 4xx error shape **once** in `packages/contracts` (a single `ApiError` type/schema); the API returns it for validation failures and unknown resources.
- Detailed API conventions (status codes, response envelope) and the frontend error-surfacing mechanism are decided in a later feature phase; the standing requirement is that the frontend **surfaces API errors meaningfully — no silent failures**.

## Other

- **Package manager:** pnpm workspaces. **Module system:** ESM. **Runtime:** Node 22 LTS. See [ADR 0005](./decisions/0005-repository-and-build-tooling.md).
- **Styling:** CSS Modules (scoped, no runtime). See [ADR 0007](./decisions/0007-styling.md).
- **Cross-origin access:** Express CORS with a config/env-driven origin allowlist. See [ADR 0008](./decisions/0008-cors-access-policy.md).

# Backlog

> **Context tier:** L2 | **Index:** [INDEX.md](./INDEX.md)
> **Purpose:** Track prioritized work items as they are identified.

Phases are defined in [`roadmap.md`](./roadmap.md).

## Now

Phase 2 — Init hello-world (FE first, in progress).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P2-1 | pnpm workspaces setup | Done | Root `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.nvmrc` |
| P2-2 | Shared tooling | In progress | Vitest in `apps/web` done; ESLint + Prettier at repo root remaining |
| P2-4 | `apps/web` hello | In progress | Static hello page done; API client + fetch deferred until BE exists |
| P2-6 | Root README | Done | Install, dev, build, test instructions |

## Next

Phase 2 — remaining scaffolding.

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P2-2a | ESLint + Prettier at repo root | Planned | Ban `any`, shared lint/format (remaining P2-2) |
| P2-3 | `apps/api` hello | Planned | Express + TS health/hello endpoint, CORS allowlist |
| P2-5 | `packages/contracts` skeleton | Planned | Build setup + sample shared type |
| P2-7 | FE↔BE connectivity smoke test | Planned | Prove the SPA reaches the API |

## Later

Phase 3+ — Feature increments (each its own plan).

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P3-1 | API design conventions ADR | Planned | Resource paths, status codes, response envelope |
| P3-2 | Contracts DTOs + `ApiError` | Planned | Product, cart, structured error shapes |
| P3-3 | Product/cart endpoints + validation | Planned | Zod validation, structured 4xx errors |
| P3-4 | FE product list & cart view | Planned | API client, add/remove, totals |
| P3-5 | FE error-handling + state management | Planned | Surface errors (no silent failures); FE state ADR |
| P3-6 | Per-feature tests | Planned | Unit + integration + component |

## Done

Phase 1 — High-level architecture design.

| ID | Item | Status | Notes |
|----|------|--------|-------|
| P1-1 | ADRs 0001–0008 | Done | Stack/rendering, type boundary, REST vs GraphQL, server framework, tooling, testing, styling, CORS |
| P1-2 | Update coding-principles.md | Done | Architecture, strong typing, testing, error handling |
| P1-3 | Update context.md | Done | Background, goals, non-goals, cart-scoping assumption |
| P1-4 | Update roadmap.md + backlog.md | Done | Phase breakdown recorded |
